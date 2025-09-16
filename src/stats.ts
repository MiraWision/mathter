import { StatsResult, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

/**
 * Statistical calculation utilities
 * 
 * Provides methods for calculating various statistical measures
 * including central tendency, dispersion, and correlation.
 * 
 * @example
 * ```typescript
 * // Basic statistics
 * Stats.mean([1, 2, 3, 4, 5]); // → 3
 * Stats.median([1, 2, 3, 4, 5]); // → 3
 * Stats.stdDev([1, 2, 3, 4, 5]); // → 1.58...
 * 
 * // All statistics at once
 * Stats.all([1, 2, 3, 4, 5]); // → { mean: 3, median: 3, mode: [1,2,3,4,5], ... }
 * ```
 */
export class Stats {
  /**
   * Calculate mean (average) of an array
   * 
   * @param arr - Array of numbers
   * @returns Mean of the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.mean([1, 2, 3, 4, 5]); // → 3
   * Stats.mean([10, 20, 30]); // → 20
   * ```
   */
  public static mean(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }

  /**
   * Calculate median of an array
   * 
   * @param arr - Array of numbers
   * @returns Median of the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.median([1, 2, 3, 4, 5]); // → 3
   * Stats.median([1, 2, 3, 4]); // → 2.5
   * ```
   */
  public static median(arr: number[]): number {
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
   * 
   * @param arr - Array of numbers
   * @returns Mode(s) of the array (single number or array of numbers)
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.mode([1, 2, 2, 3]); // → 2
   * Stats.mode([1, 2, 3, 4]); // → [1, 2, 3, 4] (all values are modes)
   * ```
   */
  public static mode(arr: number[]): number | number[] {
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
   * 
   * @param arr - Array of numbers
   * @returns Range (max - min) of the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.range([1, 2, 3, 4, 5]); // → 4
   * Stats.range([10, 5, 15, 8]); // → 10
   * ```
   */
  public static range(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return max - min;
  }

  /**
   * Calculate standard deviation of an array
   * 
   * @param arr - Array of numbers
   * @returns Population standard deviation
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.stdDev([1, 2, 3, 4, 5]); // → 1.58...
   * Stats.stdDev([10, 20, 30]); // → 8.16...
   * ```
   */
  public static stdDev(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.mean(arr);
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  }

  /**
   * Calculate variance of an array
   * 
   * @param arr - Array of numbers
   * @returns Population variance
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.variance([1, 2, 3, 4, 5]); // → 2
   * Stats.variance([10, 20, 30]); // → 66.67...
   * ```
   */
  public static variance(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    if (arr.length === 1) return 0;

    const mean = Stats.mean(arr);
    return arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
  }

  /**
   * Calculate sum of an array
   * 
   * @param arr - Array of numbers
   * @returns Sum of all numbers in the array
   * @throws {MathterError} When input is not an array
   * 
   * @example
   * ```typescript
   * Stats.sum([1, 2, 3, 4, 5]); // → 15
   * Stats.sum([10, 20, 30]); // → 60
   * ```
   */
  public static sum(arr: number[]): number {
    if (!Array.isArray(arr)) {
      throw new MathterError('Input must be an array', 'INVALID_INPUT');
    }

    return arr.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Calculate product of an array
   * 
   * @param arr - Array of numbers
   * @returns Product of all numbers in the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.product([1, 2, 3, 4, 5]); // → 120
   * Stats.product([2, 3, 4]); // → 24
   * ```
   */
  public static product(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return arr.reduce((acc, val) => acc * val, 1);
  }

  /**
   * Find minimum value in an array
   * 
   * @param arr - Array of numbers
   * @returns Minimum value in the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.min([1, 2, 3, 4, 5]); // → 1
   * Stats.min([10, 5, 15, 8]); // → 5
   * ```
   */
  public static min(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return Math.min(...arr);
  }

  /**
   * Find maximum value in an array
   * 
   * @param arr - Array of numbers
   * @returns Maximum value in the array
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.max([1, 2, 3, 4, 5]); // → 5
   * Stats.max([10, 5, 15, 8]); // → 15
   * ```
   */
  public static max(arr: number[]): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    return Math.max(...arr);
  }

  /**
   * Calculate quartiles of an array
   * 
   * @param arr - Array of numbers
   * @returns Object containing Q1, Q2 (median), and Q3 quartiles
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.quartiles([1, 2, 3, 4, 5, 6, 7, 8, 9]); // → { q1: 2.5, q2: 5, q3: 7.5 }
   * ```
   */
  public static quartiles(arr: number[]): { q1: number; q2: number; q3: number } {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;

    const q2 = Stats.median(sorted);

    let q1: number;
    let q3: number;

    if (n % 2 === 0) {
      q1 = Stats.median(sorted.slice(0, n / 2));
      q3 = Stats.median(sorted.slice(n / 2));
    } else {
      q1 = Stats.median(sorted.slice(0, Math.floor(n / 2)));
      q3 = Stats.median(sorted.slice(Math.floor(n / 2) + 1));
    }

    return { q1, q2, q3 };
  }

  /**
   * Calculate correlation coefficient between two arrays
   * 
   * @param x - First array of numbers
   * @param y - Second array of numbers
   * @returns Pearson correlation coefficient (-1 to 1)
   * @throws {MathterError} When arrays are invalid or have different lengths
   * 
   * @example
   * ```typescript
   * Stats.correlation([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]); // → 1 (perfect positive correlation)
   * Stats.correlation([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]); // → -1 (perfect negative correlation)
   * ```
   */
  public static correlation(x: number[], y: number[]): number {
    if (!Array.isArray(x) || !Array.isArray(y)) {
      throw new MathterError('Both inputs must be arrays', 'INVALID_INPUT');
    }

    if (x.length !== y.length || x.length === 0) {
      throw new MathterError('Arrays must have the same non-zero length', 'INVALID_LENGTH');
    }

    const n = x.length;
    const meanX = Stats.mean(x);
    const meanY = Stats.mean(y);

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
   * Calculate z-score for a value
   * 
   * @param value - Value to calculate z-score for
   * @param mean - Mean of the distribution
   * @param stdDev - Standard deviation of the distribution
   * @returns Z-score (standard score)
   * @throws {MathterError} When standard deviation is zero
   * 
   * @example
   * ```typescript
   * Stats.zScore(85, 80, 5); // → 1
   * Stats.zScore(70, 80, 5); // → -2
   * ```
   */
  public static zScore(value: number, mean: number, stdDev: number): number {
    if (stdDev === 0) {
      throw new MathterError('Standard deviation cannot be zero', 'ZERO_STDDEV');
    }
    return (value - mean) / stdDev;
  }

  /**
   * Calculate percentile rank of a value in an array
   * 
   * @param arr - Array of numbers
   * @param value - Value to find percentile rank for
   * @returns Percentile rank (0-100)
   * @throws {MathterError} When input is not a non-empty array
   * 
   * @example
   * ```typescript
   * Stats.percentileRank([1, 2, 3, 4, 5], 3); // → 40
   * Stats.percentileRank([1, 2, 3, 4, 5], 5); // → 80
   * ```
   */
  public static percentileRank(arr: number[], value: number): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new MathterError('Input must be a non-empty array', 'INVALID_INPUT');
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const count = sorted.filter(x => x < value).length;
    return (count / sorted.length) * 100;
  }

  /**
   * Calculate percentile value at given rank
   * 
   * @param arr - Array of numbers
   * @param rank - Percentile rank (0-100)
   * @returns Value at the given percentile
   * @throws {MathterError} When input is invalid or rank is out of range
   * 
   * @example
   * ```typescript
   * Stats.percentile([1, 2, 3, 4, 5], 50); // → 3 (median)
   * Stats.percentile([1, 2, 3, 4, 5], 100); // → 5 (maximum)
   * ```
   */
  public static percentile(arr: number[], rank: number): number {
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
export const mean = Stats.mean;
export const median = Stats.median;
export const mode = Stats.mode;
export const range = Stats.range;
export const stdDev = Stats.stdDev;
export const variance = Stats.variance;
export const sum = Stats.sum;
export const product = Stats.product;
export const min = Stats.min;
export const max = Stats.max;
export const correlation = Stats.correlation;
export const quartiles = Stats.quartiles;
export const percentileRank = Stats.percentileRank;
export const zScore = Stats.zScore;
export const percentile = Stats.percentile;
