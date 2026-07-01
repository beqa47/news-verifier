# AI Verification Setup

The app now includes an AI-assisted verification path:

- Browser UI calls `src/services/aiVerificationService.ts`
- The server endpoint `api/verify.js` calls OpenAI
- The legal context starter set lives in `api/legalKnowledge.js`

Configure these environment variables in Vercel or your local server environment:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.5
```

Do not expose `OPENAI_API_KEY` in Vite frontend environment variables. The key must stay server-side.

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
