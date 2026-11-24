'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer, provider } = require('../server');

test('API enforces consent, validates inputs and separates assessment from shopping', async t => {
  const calls = [];
  const server = createServer({
    async assess(input) { calls.push('assess'); return { score: 80, explanation: 'Fits.', summary: 'Dress', category: 'dress' }; },
    async search(category, budget) { calls.push(['search', category, budget]); return [{ id: 0 }]; },
    async scoreOffers(input, candidates) { calls.push('score'); return candidates; }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (url, body) => fetch(base + url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  const input = { items: [{ description: 'Dress', photo: null }], occasion: 'Formal dinner', consent: false };
  assert.equal((await post('/api/assess', input)).status, 400);
  assert.deepEqual(calls, []);
  input.consent = true;
  const response = await post('/api/assess', input);
  assert.equal((await response.json()).score, 80);
  assert.deepEqual(calls, ['assess']);
  const shop = { items: ['Dress'], occasion: 'Formal dinner', assessment: 'Dress', category: 'dress', budget: 20, consent: true };
  assert.equal((await post('/api/shop', { ...shop, budget: -1 })).status, 400);
  assert.equal((await post('/api/shop', { ...shop, category: 'personal event details' })).status, 400);
  assert.equal((await post('/api/shop', shop)).status, 200);
  assert.deepEqual(calls, ['assess', ['search', 'dress', 20], 'score']);
});

test('shopping filters unpriced, over-budget and inconsistent offers, and scores at the 80 boundary', async t => {
  const originalFetch = global.fetch;
  const previousOpenAI = process.env.OPENAI_API_KEY;
  const previousSerp = process.env.SERPAPI_API_KEY;
  process.env.OPENAI_API_KEY = 'test-key';
  process.env.SERPAPI_API_KEY = 'test-key';
  t.after(() => {
    global.fetch = originalFetch;
    if (previousOpenAI === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousOpenAI;
    if (previousSerp === undefined) delete process.env.SERPAPI_API_KEY;
    else process.env.SERPAPI_API_KEY = previousSerp;
  });
  const requests = [];
  global.fetch = async (url, options) => {
    requests.push({ url: String(url), options });
    if (String(url).startsWith('https://serpapi.com/')) {
      const offer = (title, price, extracted_price) => ({
        title, price, extracted_price, source: 'Store', product_link: 'https://example.com/product'
      });
      return Response.json({ shopping_results: [
        offer('A', '$20.00', 20), offer('B', '$19.00', 19), offer('C', '$21.00', 21),
        offer('D', '$10.00', 9), offer('E', '$10.00/mo', 10)
      ] });
    }
    return Response.json({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify({
      offers: [{ id: 0, score: 80, reason: 'Substitute this.' }, { id: 1, score: 79, reason: 'Too casual.' }]
    }) }] }] });
  };
  const candidates = await provider.search('dress', 20);
  assert.deepEqual(candidates.map(item => item.title), ['A', 'B']);
  const result = await provider.scoreOffers({ occasion: 'Private event', items: ['Dress'], assessment: 'Summary' }, candidates);
  assert.deepEqual(result.map(item => [item.title, item.score]), [['A', 80]]);
  const query = new URL(requests[0].url);
  assert.equal(query.searchParams.get('q'), 'dress');
  assert.equal(query.searchParams.has('occasion'), false);
  assert.equal(JSON.parse(requests[1].options.body).store, false);
});
