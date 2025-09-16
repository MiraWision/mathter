import { MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

/**
 * Combinatorics utilities for counting and generating arrangements
 * 
 * Provides methods for calculating factorials, permutations, combinations,
 * and generating all possible arrangements of elements.
 * 
 * @example
 * ```typescript
 * // Calculate factorial
 * Combinatorics.factorial(5); // → 120
 * 
 * // Calculate permutations count
 * Combinatorics.permutationsCount(5, 3); // → 60
 * 
 * // Generate permutations
 * Combinatorics.permutations(['a', 'b', 'c'], 2); // → [['a', 'b'], ['a', 'c'], ['b', 'a'], ...]
 * 
 * // Calculate combinations count
 * Combinatorics.combinationsCount(5, 3); // → 10
 * 
 * // Generate combinations
 * Combinatorics.combinations(['a', 'b', 'c'], 2); // → [['a', 'b'], ['a', 'c'], ['b', 'c']]
 * ```
 */
export class Combinatorics {
  /**
   * Calculate factorial of n
   * 
   * @param n - Non-negative integer
   * @returns Factorial of n (n!)
   * @throws {MathterError} When n is negative or too large (>170)
   * 
   * @example
   * ```typescript
   * Combinatorics.factorial(5); // → 120
   * Combinatorics.factorial(0); // → 1
   * ```
   */
  public static factorial(n: number): number {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Number must be a non-negative integer', 'INVALID_INPUT');
    }

    if (n > 170) {
      throw new MathterError('Number too large for factorial calculation', 'NUMBER_TOO_LARGE');
    }

    if (n === 0 || n === 1) return 1;

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return result;
  }

  /**
   * Calculate permutations count P(n) or P(n, r)
   * P(n) = n! (all permutations of n elements)
   * P(n, r) = n! / (n - r)! (permutations of r elements from n)
   * 
   * @param n - Total number of elements
   * @param r - Optional number of elements to arrange (if not provided, uses all n elements)
   * @returns Count of permutations
   * @throws {MathterError} When n or r are negative, or r > n
   * 
   * @example
   * ```typescript
   * Combinatorics.permutationsCount(5); // → 120 (5!)
   * Combinatorics.permutationsCount(5, 3); // → 60 (P(5,3))
   * ```
   */
  public static permutationsCount(n: number, r?: number): number {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('n must be a non-negative integer', 'INVALID_INPUT');
    }

    if (r !== undefined) {
      if (!isInteger(r) || r < 0) {
        throw new MathterError('r must be a non-negative integer', 'INVALID_INPUT');
      }

      if (r > n) {
        throw new MathterError('r cannot be greater than n', 'INVALID_RANGE');
      }

      return Combinatorics.factorial(n) / Combinatorics.factorial(n - r);
    } else {
      return Combinatorics.factorial(n);
    }
  }

  /**
   * Calculate combinations count C(n, r)
   * C(n, r) = n! / (r! * (n - r)!)
   * 
   * @param n - Total number of elements
   * @param r - Number of elements to choose
   * @returns Count of combinations
   * @throws {MathterError} When n or r are negative, or r > n
   * 
   * @example
   * ```typescript
   * Combinatorics.combinationsCount(5, 3); // → 10 (C(5,3))
   * Combinatorics.combinationsCount(4, 2); // → 6 (C(4,2))
   * ```
   */
  public static combinationsCount(n: number, r: number): number {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('n must be a non-negative integer', 'INVALID_INPUT');
    }

    if (!isInteger(r) || r < 0) {
      throw new MathterError('r must be a non-negative integer', 'INVALID_INPUT');
    }

    if (r > n) {
      throw new MathterError('r cannot be greater than n', 'INVALID_RANGE');
    }

    if (r === 0 || r === n) {
      return 1;
    }

    // Use the property C(n, r) = C(n, n-r) to minimize calculations
    const k = Math.min(r, n - r);
    let numerator = 1;
    let denominator = 1;

    for (let i = 0; i < k; i++) {
      numerator *= (n - i);
      denominator *= (i + 1);
    }

    return numerator / denominator;
  }

  /**
   * Generate all permutations of an array
   * 
   * @param arr - Array of elements to permute
   * @param r - Optional number of elements to arrange (if not provided, uses all elements)
   * @returns Array of all possible permutations
   * @throws {MathterError} When input is not an array or r is invalid
   * 
   * @example
   * ```typescript
   * Combinatorics.permutations(['a', 'b', 'c']); // → [['a','b','c'], ['a','c','b'], ...]
   * Combinatorics.permutations(['a', 'b', 'c'], 2); // → [['a','b'], ['a','c'], ['b','a'], ...]
   * ```
   */
  public static permutations<T>(arr: T[], r?: number): T[][] {
    if (!Array.isArray(arr)) {
      throw new MathterError('Input must be an array', 'INVALID_INPUT');
    }

    if (r !== undefined) {
      if (!isInteger(r) || r < 0 || r > arr.length) {
        throw new MathterError('r must be between 0 and array length', 'INVALID_RANGE');
      }
      return this.generatePermutationsWithR(arr, r);
    } else {
      return this.generateAllPermutations(arr);
    }
  }

  /**
   * Generate all combinations of an array
   * 
   * @param arr - Array of elements to combine
   * @param r - Number of elements to choose
   * @returns Array of all possible combinations
   * @throws {MathterError} When input is not an array or r is invalid
   * 
   * @example
   * ```typescript
   * Combinatorics.combinations(['a', 'b', 'c'], 2); // → [['a','b'], ['a','c'], ['b','c']]
   * ```
   */
  public static combinations<T>(arr: T[], r: number): T[][] {
    if (!Array.isArray(arr)) {
      throw new MathterError('Input must be an array', 'INVALID_INPUT');
    }

    if (!isInteger(r) || r < 0 || r > arr.length) {
      throw new MathterError('r must be between 0 and array length', 'INVALID_RANGE');
    }

    if (r === 0) return [[]];
    if (r === arr.length) return [arr];

    const result: T[][] = [];
    this.generateCombinationsRecursive(arr, r, 0, [], result);
    return result;
  }


  // Private helper methods
  private static generateAllPermutations<T>(arr: T[]): T[][] {
    if (arr.length <= 1) return [arr];

    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const permutations = this.generateAllPermutations(remaining);
      
      for (const perm of permutations) {
        result.push([current, ...perm]);
      }
    }

    return result;
  }

  private static generatePermutationsWithR<T>(arr: T[], r: number): T[][] {
    if (r === 0) return [[]];
    if (r === 1) return arr.map(item => [item]);

    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const permutations = this.generatePermutationsWithR(remaining, r - 1);
      
      for (const perm of permutations) {
        result.push([current, ...perm]);
      }
    }

    return result;
  }

  private static generateCombinationsRecursive<T>(
    arr: T[], 
    r: number, 
    start: number, 
    current: T[], 
    result: T[][]
  ): void {
    if (current.length === r) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      this.generateCombinationsRecursive(arr, r, i + 1, current, result);
      current.pop();
    }
  }
}

// Convenience functions for direct import
export const permutationsCount = Combinatorics.permutationsCount;
export const combinationsCount = Combinatorics.combinationsCount;
export const permutations = Combinatorics.permutations;
export const combinations = Combinatorics.combinations;
