import { PermutationResult, CombinationResult, MathterError } from './types';

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
 * // Calculate permutations
 * Combinatorics.permutations(5, 3); // → { count: 60 }
 * 
 * // Generate combinations
 * Combinatorics.generateCombinations(['a', 'b', 'c'], 2); // → [['a', 'b'], ['a', 'c'], ['b', 'c']]
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
   * Calculate permutations P(n) or P(n, r)
   * P(n) = n! (all permutations of n elements)
   * P(n, r) = n! / (n - r)! (permutations of r elements from n)
   * 
   * @param n - Total number of elements
   * @param r - Optional number of elements to arrange (if not provided, uses all n elements)
   * @returns Object containing the count of permutations
   * @throws {MathterError} When n or r are negative, or r > n
   * 
   * @example
   * ```typescript
   * Combinatorics.permutations(5); // → { count: 120 } (5!)
   * Combinatorics.permutations(5, 3); // → { count: 60 } (P(5,3))
   * ```
   */
  public static permutations(n: number, r?: number): PermutationResult {
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

      const count = Combinatorics.factorial(n) / Combinatorics.factorial(n - r);
      return { count };
    } else {
      const count = Combinatorics.factorial(n);
      return { count };
    }
  }

  /**
   * Calculate combinations C(n, r)
   * C(n, r) = n! / (r! * (n - r)!)
   * 
   * @param n - Total number of elements
   * @param r - Number of elements to choose
   * @returns Object containing the count of combinations
   * @throws {MathterError} When n or r are negative, or r > n
   * 
   * @example
   * ```typescript
   * Combinatorics.combinations(5, 3); // → { count: 10 } (C(5,3))
   * Combinatorics.combinations(4, 2); // → { count: 6 } (C(4,2))
   * ```
   */
  public static combinations(n: number, r: number): CombinationResult {
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
      return { count: 1 };
    }

    // Use the property C(n, r) = C(n, n-r) to minimize calculations
    const k = Math.min(r, n - r);
    let numerator = 1;
    let denominator = 1;

    for (let i = 0; i < k; i++) {
      numerator *= (n - i);
      denominator *= (i + 1);
    }

    const count = numerator / denominator;
    return { count };
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
   * Combinatorics.generatePermutations(['a', 'b', 'c']); // → [['a','b','c'], ['a','c','b'], ...]
   * Combinatorics.generatePermutations(['a', 'b', 'c'], 2); // → [['a','b'], ['a','c'], ['b','a'], ...]
   * ```
   */
  public static generatePermutations<T>(arr: T[], r?: number): T[][] {
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
   * Combinatorics.generateCombinations(['a', 'b', 'c'], 2); // → [['a','b'], ['a','c'], ['b','c']]
   * ```
   */
  public static generateCombinations<T>(arr: T[], r: number): T[][] {
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

  /**
   * Calculate Stirling numbers of the first kind
   * 
   * @param n - Total number of elements
   * @param k - Number of cycles
   * @returns Stirling number of the first kind s(n,k)
   * @throws {MathterError} When n or k are negative
   * 
   * @example
   * ```typescript
   * Combinatorics.stirlingFirst(4, 2); // → 11
   * ```
   */
  public static stirlingFirst(n: number, k: number): number {
    if (!isInteger(n) || !isInteger(k) || n < 0 || k < 0) {
      throw new MathterError('Both n and k must be non-negative integers', 'INVALID_INPUT');
    }

    if (k > n) return 0;
    if (k === 0) return n === 0 ? 1 : 0;
    if (k === n) return 1;

    // Use recurrence relation: s(n,k) = s(n-1,k-1) + (n-1)*s(n-1,k)
    const memo: number[][] = [];
    for (let i = 0; i <= n; i++) {
      memo[i] = new Array(k + 1).fill(0);
    }

    memo[0][0] = 1;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= Math.min(i, k); j++) {
        memo[i][j] = memo[i - 1][j - 1] + (i - 1) * memo[i - 1][j];
      }
    }

    return memo[n][k];
  }

  /**
   * Calculate Stirling numbers of the second kind
   * 
   * @param n - Total number of elements
   * @param k - Number of non-empty subsets
   * @returns Stirling number of the second kind S(n,k)
   * @throws {MathterError} When n or k are negative
   * 
   * @example
   * ```typescript
   * Combinatorics.stirlingSecond(4, 2); // → 7
   * ```
   */
  public static stirlingSecond(n: number, k: number): number {
    if (!isInteger(n) || !isInteger(k) || n < 0 || k < 0) {
      throw new MathterError('Both n and k must be non-negative integers', 'INVALID_INPUT');
    }

    if (k > n) return 0;
    if (k === 0) return n === 0 ? 1 : 0;
    if (k === n) return 1;

    // Use recurrence relation: S(n,k) = S(n-1,k-1) + k*S(n-1,k)
    const memo: number[][] = [];
    for (let i = 0; i <= n; i++) {
      memo[i] = new Array(k + 1).fill(0);
    }

    memo[0][0] = 1;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= Math.min(i, k); j++) {
        memo[i][j] = memo[i - 1][j - 1] + j * memo[i - 1][j];
      }
    }

    return memo[n][k];
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
export const permutations = Combinatorics.permutations;
export const combinations = Combinatorics.combinations;
export const generatePermutations = Combinatorics.generatePermutations;
export const generateCombinations = Combinatorics.generateCombinations;
