import { PercentResult, MathterError } from './types';

// Helper function to check if number is integer
const isInteger = (n: number): boolean => {
  return typeof n === 'number' && n % 1 === 0;
};

export class Number {
  /**
   * Calculate Greatest Common Divisor (GCD) using Euclidean algorithm
   */
  static GCD(a: number, b: number): number {
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
   */
  static LCM(a: number, b: number): number {
    if (!isInteger(a) || !isInteger(b)) {
      throw new MathterError('Both numbers must be integers', 'NOT_INTEGER');
    }

    if (a < 0 || b < 0) {
      throw new MathterError('Numbers must be non-negative', 'NEGATIVE_NUMBER');
    }

    if (a === 0 || b === 0) {
      return 0;
    }

    return Math.abs(a * b) / Number.GCD(a, b);
  }

  /**
   * Check if number is even
   */
  static IsEven(n: number): boolean {
    if (!isInteger(n)) {
      throw new MathterError('Number must be an integer', 'NOT_INTEGER');
    }

    return n % 2 === 0;
  }

  /**
   * Check if number is odd
   */
  static IsOdd(n: number): boolean {
    if (!isInteger(n)) {
      throw new MathterError('Number must be an integer', 'NOT_INTEGER');
    }

    return n % 2 !== 0;
  }

  /**
   * Round number to specified decimal places
   */
  static RoundTo(n: number, digits: number): number {
    if (digits < 0 || !isInteger(digits)) {
      throw new MathterError('Digits must be a non-negative integer', 'INVALID_DIGITS');
    }

    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
  }

  /**
   * Percentage utilities
   */
  static Percent = {
    /**
     * Calculate x% of y
     */
    FromXofY: (x: number, y: number): PercentResult => {
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
     */
    Increase: (value: number, percentage: number): PercentResult => {
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
     */
    Decrease: (value: number, percentage: number): PercentResult => {
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
     */
    Change: (a: number, b: number): PercentResult => {
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
   */
  static IsPrime(n: number): boolean {
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
   */
  static IsPerfectSquare(n: number): boolean {
    if (n < 0) return false;
    const sqrt = Math.sqrt(n);
    return isInteger(sqrt);
  }

  /**
   * Check if number is perfect cube
   */
  static IsPerfectCube(n: number): boolean {
    if (n < 0) return false;
    const cbrt = Math.cbrt(n);
    return isInteger(cbrt);
  }

  /**
   * Get factorial of a number
   */
  static Factorial(n: number): number {
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
   */
  static Abs(n: number): number {
    return Math.abs(n);
  }

  /**
   * Calculate square root
   */
  static Sqrt(n: number): number {
    if (n < 0) {
      throw new MathterError('Cannot calculate square root of negative number', 'NEGATIVE_SQRT');
    }

    return Math.sqrt(n);
  }

  /**
   * Calculate cube root
   */
  static Cbrt(n: number): number {
    return Math.cbrt(n);
  }

  /**
   * Calculate power
   */
  static Pow(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}

// Convenience functions for direct import
export const gcd = Number.GCD;
export const lcm = Number.LCM;
export const isEven = Number.IsEven;
export const isOdd = Number.IsOdd;
export const roundTo = Number.RoundTo;
export const isPerfectSquare = Number.IsPerfectSquare;
export const isPerfectCube = Number.IsPerfectCube;
