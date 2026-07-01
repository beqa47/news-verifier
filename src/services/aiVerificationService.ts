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
      policy: 'confidence-v2',
      story: story.originalUrl || story.id || story.headline,
      related: relatedStories.map((related) => related.originalUrl || related.id || related.headline),
    });
  }

  private static normalizeVerdict(confidence: number) {
    if (confidence >= 80) return 'მტკიცებულებები საკმარისია';
    if (confidence >= 60) return 'მტკიცებულებები ნაწილობრივ საკმარისია';
    return 'მეტი მტკიცებულებაა საჭირო';
  }

  private static normalizeResult(result: AiVerificationResult): AiVerificationResult {
    const confidence = Math.max(0, Math.min(100, Number(result.confidence) || 0));

    return {
      ...result,
      confidence,
      verdict: this.normalizeVerdict(confidence),
    };
  }

  static getCachedVerification(
    story: NewsArticle,
    relatedStories: NewsArticle[]
  ): AiVerificationResult | null {
    const cached = this.cache.get(this.getCacheKey(story, relatedStories));
    return cached ? this.normalizeResult(cached) : null;
  }

  static async verifyStory(
    story: NewsArticle,
    relatedStories: NewsArticle[]
  ): Promise<AiVerificationResult> {
    const cacheKey = this.getCacheKey(story, relatedStories);
    const cached = this.cache.get(cacheKey);
    if (cached) return { ...this.normalizeResult(cached), cached: true };

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

    const result = this.normalizeResult(payload as AiVerificationResult);
    this.cache.set(cacheKey, result);
    return result;
  }
}
