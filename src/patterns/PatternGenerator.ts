export type PatternType = 'wave' | 'pulse' | 'escalate' | 'random' | 'steady';

export interface PatternConfig {
  type: PatternType;
  duration: number;
  intensity: number;
}

export class PatternGenerator {
  generatePattern(config: PatternConfig): number[] {
    const { type, duration, intensity } = config;
    const steps = Math.floor(duration / 100);

    switch (type) {
      case 'wave':
        return this.generateWave(steps, intensity);
      case 'pulse':
        return this.generatePulse(steps, intensity);
      case 'escalate':
        return this.generateEscalate(steps, intensity);
      case 'random':
        return this.generateRandom(steps, intensity);
      case 'steady':
      default:
        return this.generateSteady(steps, intensity);
    }
  }

  private generateWave(steps: number, max: number): number[] {
    return Array.from({ length: steps }, (_, i) => 
      Math.floor(Math.sin(i / steps * Math.PI * 2) * max / 2 + max / 2)
    );
  }

  private generatePulse(steps: number, intensity: number): number[] {
    return Array.from({ length: steps }, (_, i) => 
      i % 4 < 2 ? intensity : 0
    );
  }

  private generateEscalate(steps: number, max: number): number[] {
    return Array.from({ length: steps }, (_, i) => 
      Math.floor((i / steps) * max)
    );
  }

  private generateRandom(steps: number, max: number): number[] {
    return Array.from({ length: steps }, () => 
      Math.floor(Math.random() * max)
    );
  }

  private generateSteady(steps: number, intensity: number): number[] {
    return Array.from({ length: steps }, () => intensity);
  }
}
