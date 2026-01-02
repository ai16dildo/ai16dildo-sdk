import { EventEmitter } from '../events/EventEmitter';
import { PatternGenerator, PatternType } from '../patterns/PatternGenerator';

export interface AIResponse {
  intensity: number;
  pattern: PatternType;
  duration: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export class AIEngine extends EventEmitter {
  private patternGenerator: PatternGenerator;
  private apiEndpoint: string;

  constructor(apiEndpoint?: string) {
    super();
    this.patternGenerator = new PatternGenerator();
    this.apiEndpoint = apiEndpoint || 'https://api.ai16dildo.com/v1/analyze';
  }

  async analyzeInput(input: string): Promise<AIResponse> {
    const sentiment = this.analyzeSentiment(input);
    const intensity = this.calculateIntensity(sentiment, input);
    const pattern = this.selectPattern(sentiment);
    
    this.emit('analysis', { input, sentiment, intensity, pattern });

    return {
      intensity,
      pattern,
      duration: 3000,
      sentiment
    };
  }

  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positive = ['yes', 'good', 'more', 'faster', 'harder', 'love'];
    const negative = ['no', 'stop', 'less', 'slower', 'wait'];
    
    const lower = text.toLowerCase();
    
    if (positive.some(w => lower.includes(w))) return 'positive';
    if (negative.some(w => lower.includes(w))) return 'negative';
    return 'neutral';
  }

  private calculateIntensity(sentiment: string, text: string): number {
    const baseIntensity = sentiment === 'positive' ? 70 : sentiment === 'negative' ? 30 : 50;
    const exclamations = (text.match(/!/g) || []).length;
    return Math.min(100, baseIntensity + exclamations * 10);
  }

  private selectPattern(sentiment: string): PatternType {
    switch (sentiment) {
      case 'positive': return 'escalate';
      case 'negative': return 'wave';
      default: return 'steady';
    }
  }

  generatePatternData(response: AIResponse): number[] {
    return this.patternGenerator.generatePattern({
      type: response.pattern,
      duration: response.duration,
      intensity: response.intensity
    });
  }
}
