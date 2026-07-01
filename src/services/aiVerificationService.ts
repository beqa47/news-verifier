import type { NewsArticle } from './newsService';

export interface AiClaimCheck {
  text: string;
  status: string;
  reasoning: string;
}

export interface AiSource {
  title: string;
  url: string;
}

export interface LegalContextItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  summary: string;
}

export interface AiVerificationResult {
  verdict: string;
  confidence: number;
  summary: string;
  claims: AiClaimCheck[];
  legalConsiderations: string[];
  questionsToVerify: string[];
  sourcesUsed: AiSource[];
  model: string;
  legalContext: LegalContextItem[];
  disclaimer: string;
  cached?: boolean;
}

export class AiVerificationService {
  private static cache = new Map<string, AiVerificationResult>();

  private static getCacheKey(story: NewsArticle, relatedStories: NewsArticle[]) {
    return JSON.stringify({
      story: story.originalUrl || story.id || story.headline,
      related: relatedStories.map((related) => related.originalUrl || related.id || related.headline),
    });
  }

  static getCachedVerification(
    story: NewsArticle,
    relatedStories: NewsArticle[]
  ): AiVerificationResult | null {
    return this.cache.get(this.getCacheKey(story, relatedStories)) || null;
  }

  static async verifyStory(
    story: NewsArticle,
    relatedStories: NewsArticle[]
  ): Promise<AiVerificationResult> {
    const cacheKey = this.getCacheKey(story, relatedStories);
    const cached = this.cache.get(cacheKey);
    if (cached) return { ...cached, cached: true };

    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story, relatedStories }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'AI verification failed.');
    }

    const result = payload as AiVerificationResult;
    this.cache.set(cacheKey, result);
    return result;
  }
}
