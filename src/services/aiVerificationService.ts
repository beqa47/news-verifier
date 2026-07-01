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
}

export class AiVerificationService {
  static async verifyStory(
    story: NewsArticle,
    relatedStories: NewsArticle[]
  ): Promise<AiVerificationResult> {
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

    return payload as AiVerificationResult;
  }
}
