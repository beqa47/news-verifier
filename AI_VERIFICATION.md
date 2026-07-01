# AI Verification Setup

The app includes an AI-assisted verification path:

- Browser UI calls `src/services/aiVerificationService.ts`
- The server endpoint `api/verify.js` calls OpenAI
- The legal context starter set lives in `api/legalKnowledge.js`
- Verification responses are cached server-side for 6 hours to reduce repeated token usage

Configure these environment variables in Vercel or your local server environment:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.4-mini
```

Do not expose `OPENAI_API_KEY` in Vite frontend environment variables. The key must stay server-side.

## Cost Control

The default model is `gpt-5.4-mini` so the first version can stay cheaper and faster. The endpoint caches the same story/topic verification result for 6 hours, so repeated users checking the same article should reuse the result instead of calling the model every time.

For more control in production, add persistent storage such as Vercel KV, Supabase, or a database table keyed by article URL and model.

## Legal Knowledge

This implementation does not train a model from scratch. It uses retrieval-style context: the AI receives selected Georgian constitutional/legal principles with official source links and compares them against the two news perspectives.

The current legal context is a starter set linked to the official Constitution of Georgia on Matsne:

https://matsne.gov.ge/en/document/view/30346

For production use, expand this into a curated legal knowledge base with:

- article-level excerpts from the Constitution of Georgia
- relevant current Georgian laws from official sources
- source URLs and last-reviewed dates
- embeddings or search-based retrieval
- human legal review for high-impact conclusions

The AI output is not legal advice and should be treated as a triage aid.
