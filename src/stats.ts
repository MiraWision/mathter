import { StatsResult, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

export class Stats {
  /**
   * Calculate mean (average) of an array
   */
  static Mean(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }

  /**
   * Calculate median of an array
   */
  static Median(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }

  /**
   * Calculate mode of an array
   */
  static Mode(arr: number[]): number | number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const frequency: Record<number, number> = {};
    
    for (const num of arr) {
      frequency[num] = (frequency[num] || 0) + 1;
    }

    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[parseInt(key)] === maxFreq)
      .map(key => parseInt(key));

    return modes.length === 1 ? modes[0] : modes;
  }

  /**
   * Calculate range of an array
   */
  static Range(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return max - min;
  }

  /**
   * Calculate standard deviation of an array
   */
  static StdDev(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.Mean(arr);
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  }

  /**
   * Calculate sample standard deviation of an array
   */
  static SampleStdDev(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.Mean(arr);
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (arr.length - 1);
    return Math.sqrt(variance);
  }

  /**
   * Calculate variance of an array
   */
  static Variance(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.Mean(arr);
    return arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
  }

  /**
   * Calculate sample variance of an array
   */
  static SampleVariance(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.Mean(arr);
    return arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (arr.length - 1);
  }

  /**
   * Calculate sum of an array
   */
  static Sum(arr: number[]): number {
    if (!Array.isArray(arr)) {
      throw new MathterError('Input must be an array', 'INVALID_INPUT');
    }

    return arr.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Calculate product of an array
   */
  static Product(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return arr.reduce((acc, val) => acc * val, 1);
  }

  /**
   * Find minimum value in an array
   */
  static Min(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return Math.min(...arr);
  }

  /**
   * Find maximum value in an array
   */
  static Max(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return Math.max(...arr);
  }

  /**
   * Calculate quartiles of an array
   */
  static Quartiles(arr: number[]): { q1: number; q2: number; q3: number } {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;

    const q2 = Stats.Median(sorted);

    let q1: number;
    let q3: number;

    if (n % 2 === 0) {
      q1 = Stats.Median(sorted.slice(0, n / 2));
      q3 = Stats.Median(sorted.slice(n / 2));
    } else {
      q1 = Stats.Median(sorted.slice(0, Math.floor(n / 2)));
      q3 = Stats.Median(sorted.slice(Math.floor(n / 2) + 1));
    }

    return { q1, q2, q3 };
  }

  /**
   * Calculate interquartile range (IQR)
   */
  static IQR(arr: number[]): number {
    const quartiles = Stats.Quartiles(arr);
    return quartiles.q3 - quartiles.q1;
  }

  /**
   * Calculate correlation coefficient between two arrays
   */
  static Correlation(x: number[], y: number[]): number {
    if (!Array.isArray(x) || !Array.isArray(y)) {
      throw new MathterError('Both inputs must be arrays', 'INVALID_INPUT');
    }

    if (x.length !== y.length || x.length === 0) {
      throw new MathterError('Arrays must have the same non-zero length', 'INVALID_LENGTH');
    }

    const n = x.length;
    const meanX = Stats.Mean(x);
    const meanY = Stats.Mean(y);

    let numerator = 0;
    let sumXSquared = 0;
    let sumYSquared = 0;

    for (let i = 0; i < n; i++) {
      const diffX = x[i] - meanX;
      const diffY = y[i] - meanY;
      numerator += diffX * diffY;
      sumXSquared += diffX * diffX;
      sumYSquared += diffY * diffY;
    }

    const denominator = Math.sqrt(sumXSquared * sumYSquared);
    
    if (denominator === 0) return 0;
    
    return numerator / denominator;
  }

  /**
   * Calculate all basic statistics for an array
   */
  static All(arr: number[]): StatsResult {
    return {
      mean: Stats.Mean(arr),
      median: Stats.Median(arr),
      mode: Stats.Mode(arr),
      range: Stats.Range(arr),
      standardDeviation: Stats.StdDev(arr),
      variance: Stats.Variance(arr)
    };
  }

  /**
   * Calculate z-score for a value
   */
  static ZScore(value: number, mean: number, stdDev: number): number {
    if (stdDev === 0) {
      throw new MathterError('Standard deviation cannot be zero', 'ZERO_STDDEV');
    }
    return (value - mean) / stdDev;
  }

  /**
   * Calculate percentile rank of a value in an array
   */
  static PercentileRank(arr: number[], value: number): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const count = sorted.filter(x => x < value).length;
    return (count / sorted.length) * 100;
  }

  /**
   * Calculate percentile value at given rank
   */
  static Percentile(arr: number[], rank: number): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (rank < 0 || rank > 100) {
      throw new MathterError('Rank must be between 0 and 100', 'INVALID_RANK');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const index = (rank / 100) * (sorted.length - 1);
    
    if (isInteger(index)) {
      return sorted[index];
    } else {
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }
  }
}

// Convenience functions for direct import
export const mean = Stats.Mean;
export const median = Stats.Median;
export const mode = Stats.Mode;
export const range = Stats.Range;
export const stdDev = Stats.StdDev;
export const variance = Stats.Variance;
export const sum = Stats.Sum;
export const min = Stats.Min;
export const max = Stats.Max;
