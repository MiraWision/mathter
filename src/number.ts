import { PercentResult, MathterError } from './types';

// Helper function to check if number is integer
const isInteger = (n: number): boolean => {
  return typeof n === 'number' && n % 1 === 0;
};

/**
 * Number utility functions for mathematical operations
 * 
 * Provides methods for number theory operations, percentage calculations,
 * and various number property checks.
 * 
 * @example
 * ```typescript
 * // Number theory
 * Number.gcd(12, 18); // → 6
 * Number.lcm(4, 6); // → 12
 * 
 * // Percentage calculations
 * Number.Percent.fromXofY(20, 500); // → { value: 100, percentage: 20, originalValue: 500 }
 * 
 * // Number properties
 * Number.isEven(4); // → true
 * Number.isPrime(17); // → true
 * ```
 */
export class Number {
  /**
   * Calculate Greatest Common Divisor (GCD) using Euclidean algorithm
   * 
   * @param a - First integer
   * @param b - Second integer
   * @returns Greatest common divisor of a and b
   * @throws {MathterError} When either number is not an integer or is negative
   * 
   * @example
   * ```typescript
   * Number.gcd(12, 18); // → 6
   * Number.gcd(17, 13); // → 1
   * ```
   */
  public static gcd(a: number, b: number): number {
    if (!isInteger(a) || !isInteger(b)) {
      throw new MathterError('Both numbers must be integers', 'NOT_INTEGER');
    }

    if (a < 0 || b < 0) {
      throw new MathterError('Numbers must be non-negative', 'NEGATIVE_NUMBER');
    }

    // Handle edge cases
    if (a === 0) return b;
    if (b === 0) return a;

    // Euclidean algorithm
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  }

  /**
   * Calculate Least Common Multiple (LCM)
   * 
   * @param a - First integer
   * @param b - Second integer
   * @returns Least common multiple of a and b
   * @throws {MathterError} When either number is not an integer or is negative
   * 
   * @example
   * ```typescript
   * Number.lcm(4, 6); // → 12
   * Number.lcm(5, 7); // → 35
   * ```
   */
  public static lcm(a: number, b: number): number {
    if (!isInteger(a) || !isInteger(b)) {
      throw new MathterError('Both numbers must be integers', 'NOT_INTEGER');
    }

    if (a < 0 || b < 0) {
      throw new MathterError('Numbers must be non-negative', 'NEGATIVE_NUMBER');
    }

    if (a === 0 || b === 0) {
      return 0;
    }

    return Math.abs(a * b) / Number.gcd(a, b);
  }

  /**
   * Check if number is even
   * 
   * @param n - Number to check
   * @returns True if the number is even
   * @throws {MathterError} When number is not an integer
   * 
   * @example
   * ```typescript
   * Number.isEven(4); // → true
   * Number.isEven(5); // → false
   * ```
   */
  public static isEven(n: number): boolean {
    if (!isInteger(n)) {
      throw new MathterError('Number must be an integer', 'NOT_INTEGER');
    }

    return n % 2 === 0;
  }

  /**
   * Check if number is odd
   * 
   * @param n - Number to check
   * @returns True if the number is odd
   * @throws {MathterError} When number is not an integer
   * 
   * @example
   * ```typescript
   * Number.isOdd(5); // → true
   * Number.isOdd(4); // → false
   * ```
   */
  public static isOdd(n: number): boolean {
    if (!isInteger(n)) {
      throw new MathterError('Number must be an integer', 'NOT_INTEGER');
    }

    return n % 2 !== 0;
  }

  /**
   * Round number to specified decimal places
   * 
   * @param n - Number to round
   * @param digits - Number of decimal places
   * @returns Rounded number
   * @throws {MathterError} When digits is negative or not an integer
   * 
   * @example
   * ```typescript
   * Number.roundTo(3.14159, 2); // → 3.14
   * Number.roundTo(2.71828, 3); // → 2.718
   * ```
   */
  public static roundTo(n: number, digits: number): number {
    if (digits < 0 || !isInteger(digits)) {
      throw new MathterError('Digits must be a non-negative integer', 'INVALID_DIGITS');
    }

    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
  }

  /**
   * Percentage calculation utilities
   */
  public static Percent = {
    /**
     * Calculate x% of y
     * 
     * @param x - Percentage value
     * @param y - Base value
     * @returns Object containing the calculated value and original values
     * @throws {MathterError} When values are negative
     * 
     * @example
     * ```typescript
     * Number.Percent.fromXofY(20, 500); // → { value: 100, percentage: 20, originalValue: 500 }
     * Number.Percent.fromXofY(50, 200); // → { value: 100, percentage: 50, originalValue: 200 }
     * ```
     */
    public fromXofY: (x: number, y: number): PercentResult => {
      if (x < 0 || y < 0) {
        throw new MathterError('Values must be non-negative', 'NEGATIVE_VALUE');
      }

      const value = (x / 100) * y;
      return {
        value,
        percentage: x,
        originalValue: y
      };
    },

    /**
     * Increase value by percentage
     * 
     * @param value - Original value
     * @param percentage - Percentage to increase by
     * @returns Object containing the new value and increase details
     * @throws {MathterError} When values are negative
     * 
     * @example
     * ```typescript
     * Number.Percent.increase(100, 20); // → { value: 120, percentage: 20, originalValue: 100 }
     * Number.Percent.increase(50, 10); // → { value: 55, percentage: 10, originalValue: 50 }
     * ```
     */
    public increase: (value: number, percentage: number): PercentResult => {
      if (value < 0 || percentage < 0) {
        throw new MathterError('Values must be non-negative', 'NEGATIVE_VALUE');
      }

      const increase = (percentage / 100) * value;
      const newValue = value + increase;
      
      return {
        value: newValue,
        percentage,
        originalValue: value
      };
    },

    /**
     * Decrease value by percentage
     * 
     * @param value - Original value
     * @param percentage - Percentage to decrease by
     * @returns Object containing the new value and decrease details
     * @throws {MathterError} When values are negative or percentage > 100
     * 
     * @example
     * ```typescript
     * Number.Percent.decrease(100, 20); // → { value: 80, percentage: 20, originalValue: 100 }
     * Number.Percent.decrease(50, 10); // → { value: 45, percentage: 10, originalValue: 50 }
     * ```
     */
    public decrease: (value: number, percentage: number): PercentResult => {
      if (value < 0 || percentage < 0) {
        throw new MathterError('Values must be non-negative', 'NEGATIVE_VALUE');
      }

      if (percentage > 100) {
        throw new MathterError('Percentage cannot exceed 100%', 'INVALID_PERCENTAGE');
      }

      const decrease = (percentage / 100) * value;
      const newValue = value - decrease;
      
      return {
        value: newValue,
        percentage,
        originalValue: value
      };
    },

    /**
     * Calculate percentage change from a to b
     * 
     * @param a - Initial value
     * @param b - Final value
     * @returns Object containing the final value and percentage change
     * @throws {MathterError} When values are negative or initial value is zero
     * 
     * @example
     * ```typescript
     * Number.Percent.change(100, 120); // → { value: 120, percentage: 20, originalValue: 100 }
     * Number.Percent.change(200, 150); // → { value: 150, percentage: -25, originalValue: 200 }
     * ```
     */
    public change: (a: number, b: number): PercentResult => {
      if (a < 0 || b < 0) {
        throw new MathterError('Values must be non-negative', 'NEGATIVE_VALUE');
      }

      if (a === 0) {
        throw new MathterError('Initial value cannot be zero', 'ZERO_INITIAL');
      }

      const percentage = ((b - a) / a) * 100;
      
      return {
        value: b,
        percentage,
        originalValue: a
      };
    }
  };

  /**
   * Check if number is prime
   * 
   * @param n - Number to check
   * @returns True if the number is prime
   * 
   * @example
   * ```typescript
   * Number.isPrime(17); // → true
   * Number.isPrime(15); // → false
   * ```
   */
  public static isPrime(n: number): boolean {
    if (!isInteger(n) || n < 2) {
      return false;
    }

    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if number is perfect square
   * 
   * @param n - Number to check
   * @returns True if the number is a perfect square
   * 
   * @example
   * ```typescript
   * Number.isPerfectSquare(16); // → true
   * Number.isPerfectSquare(15); // → false
   * ```
   */
  public static isPerfectSquare(n: number): boolean {
    if (n < 0) return false;
    const sqrt = Math.sqrt(n);
    return isInteger(sqrt);
  }

  /**
   * Check if number is perfect cube
   * 
   * @param n - Number to check
   * @returns True if the number is a perfect cube
   * 
   * @example
   * ```typescript
   * Number.isPerfectCube(27); // → true
   * Number.isPerfectCube(25); // → false
   * ```
   */
  public static isPerfectCube(n: number): boolean {
    if (n < 0) return false;
    const cbrt = Math.cbrt(n);
    return isInteger(cbrt);
  }

  /**
   * Get factorial of a number
   * 
   * @param n - Non-negative integer
   * @returns Factorial of n (n!)
   * @throws {MathterError} When n is negative or too large (>170)
   * 
   * @example
   * ```typescript
   * Number.factorial(5); // → 120
   * Number.factorial(0); // → 1
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
   * Calculate absolute value
   * 
   * @param n - Number
   * @returns Absolute value of n
   * 
   * @example
   * ```typescript
   * Number.abs(-5); // → 5
   * Number.abs(3); // → 3
   * ```
   */
  public static abs(n: number): number {
    return Math.abs(n);
  }

  /**
   * Calculate square root
   * 
   * @param n - Non-negative number
   * @returns Square root of n
   * @throws {MathterError} When n is negative
   * 
   * @example
   * ```typescript
   * Number.sqrt(16); // → 4
   * Number.sqrt(25); // → 5
   * ```
   */
  public static sqrt(n: number): number {
    if (n < 0) {
      throw new MathterError('Cannot calculate square root of negative number', 'NEGATIVE_SQRT');
    }

    return Math.sqrt(n);
  }

  /**
   * Calculate cube root
   * 
   * @param n - Number
   * @returns Cube root of n
   * 
   * @example
   * ```typescript
   * Number.cbrt(27); // → 3
   * Number.cbrt(-8); // → -2
   * ```
   */
  public static cbrt(n: number): number {
    return Math.cbrt(n);
  }

  /**
   * Calculate power
   * 
   * @param base - Base number
   * @param exponent - Exponent
   * @returns base raised to the power of exponent
   * 
   * @example
   * ```typescript
   * Number.pow(2, 3); // → 8
   * Number.pow(5, 2); // → 25
   * ```
   */
  public static pow(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}

// Convenience functions for direct import
export const gcd = Number.gcd;
export const lcm = Number.lcm;
export const isEven = Number.isEven;
export const isOdd = Number.isOdd;
export const roundTo = Number.roundTo;
export const isPerfectSquare = Number.isPerfectSquare;
export const isPerfectCube = Number.isPerfectCube;
