import { selectLegalContext } from './legalKnowledge.js';

const DEFAULT_MODEL = 'gpt-5.4-mini';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const verificationCache = globalThis.__verificationCache || new Map();
globalThis.__verificationCache = verificationCache;

function normalizeStory(story) {
  return {
    headline: String(story?.headline || '').slice(0, 500),
    summary: String(story?.summary || '').slice(0, 2000),
    source: String(story?.source || '').slice(0, 120),
    category: story?.category === 'opposition' ? 'opposition' : 'establishment',
    topic: String(story?.topic || '').slice(0, 120),
    originalUrl: String(story?.originalUrl || story?.sourceUrl || '').slice(0, 500),
  };
}

function getCacheKey(model, primary, opposing) {
  return JSON.stringify({
    model,
    primary: {
      headline: primary.headline,
      originalUrl: primary.originalUrl,
      topic: primary.topic,
    },
    opposing: opposing.map((story) => ({
      headline: story.headline,
      originalUrl: story.originalUrl,
      topic: story.topic,
    })),
  });
}

function getCachedResult(cacheKey) {
  const cached = verificationCache.get(cacheKey);
  if (!cached) return null;

  if (Date.now() - cached.createdAt > CACHE_TTL_MS) {
    verificationCache.delete(cacheKey);
    return null;
  }

  return cached.result;
}

function setCachedResult(cacheKey, result) {
  verificationCache.set(cacheKey, {
    createdAt: Date.now(),
    result,
  });
}

function extractResponseText(payload) {
  if (typeof payload.output_text === 'string') return payload.output_text;

  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) {
        parts.push(content.text);
      }
    }
  }
  return parts.join('\n');
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('AI response did not contain JSON.');
    return JSON.parse(match[0]);
  }
}

function validateResult(result) {
  return {
    verdict: String(result.verdict || 'needs_more_evidence').slice(0, 80),
    confidence: Math.max(0, Math.min(100, Number(result.confidence) || 0)),
    summary: String(result.summary || '').slice(0, 1000),
    claims: Array.isArray(result.claims)
      ? result.claims.slice(0, 6).map((claim) => ({
          text: String(claim.text || '').slice(0, 500),
          status: String(claim.status || 'unclear').slice(0, 80),
          reasoning: String(claim.reasoning || '').slice(0, 700),
        }))
      : [],
    legalConsiderations: Array.isArray(result.legalConsiderations)
      ? result.legalConsiderations.slice(0, 5).map(String)
      : [],
    questionsToVerify: Array.isArray(result.questionsToVerify)
      ? result.questionsToVerify.slice(0, 5).map(String)
      : [],
    sourcesUsed: Array.isArray(result.sourcesUsed)
      ? result.sourcesUsed.slice(0, 8).map((source) => ({
          title: String(source.title || '').slice(0, 160),
          url: String(source.url || '').slice(0, 500),
        }))
      : [],
  };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Use POST.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({
      error: 'OPENAI_API_KEY is not configured on the server.',
    });
  }

  try {
    const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const primary = normalizeStory(request.body?.story);
    const opposing = Array.isArray(request.body?.relatedStories)
      ? request.body.relatedStories.slice(0, 3).map(normalizeStory)
      : [];
    const legalContext = selectLegalContext([primary, ...opposing]);
    const cacheKey = getCacheKey(model, primary, opposing);
    const cachedResult = getCachedResult(cacheKey);

    if (cachedResult) {
      response.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
      return response.status(200).json({
        ...cachedResult,
        cached: true,
      });
    }

    const prompt = {
      primary,
      opposing,
      legalContext,
      outputSchema: {
        verdict: 'supported | disputed | misleading | needs_more_evidence',
        confidence: 'number from 0 to 100',
        summary: 'short balanced explanation',
        claims: [{ text: 'claim', status: 'supported | disputed | unclear', reasoning: 'why' }],
        legalConsiderations: ['relevant Georgian legal or constitutional principle'],
        questionsToVerify: ['specific follow-up evidence needed'],
        sourcesUsed: [{ title: 'source title', url: 'source URL' }],
      },
    };

    const aiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: 'system',
            content:
              'You are an AI news verification assistant for Georgian public-interest reporting. Compare establishment and opposition coverage. Use the provided Georgian legal context only as context, not as legal advice. Do not invent facts, statutes, quotes, or source content. If evidence is insufficient, say so. Return only valid JSON matching the requested schema.',
          },
          {
            role: 'user',
            content: JSON.stringify(prompt),
          },
        ],
      }),
    });

    const payload = await aiResponse.json();
    if (!aiResponse.ok) {
      return response.status(aiResponse.status).json({
        error: payload.error?.message || 'OpenAI request failed.',
      });
    }

    const result = {
      ...validateResult(parseJson(extractResponseText(payload))),
      model,
      legalContext,
      cached: false,
      disclaimer:
        'AI analysis can miss context and is not legal advice. Verify important claims with primary sources and qualified legal review.',
    };

    setCachedResult(cacheKey, result);
    response.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'Verification failed.',
    });
  }
}
