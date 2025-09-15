import { PrimeFactors, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

/**
 * Prime number utilities and number theory functions
 * 
 * Provides methods for prime number operations, factorization,
 * and various number theory calculations.
 * 
 * @example
 * ```typescript
 * // Prime checks
 * Prime.is(17); // → true
 * Prime.next(13); // → 17
 * 
 * // Factorization
 * Prime.factors(60); // → { 2: 2, 3: 1, 5: 1 }
 * 
 * // Sieve of Eratosthenes
 * Prime.sieve(20); // → [2, 3, 5, 7, 11, 13, 17, 19]
 * ```
 */
export class Prime {
  /**
   * Check if a number is prime
   * 
   * @param n - Number to check
   * @returns True if the number is prime
   * 
   * @example
   * ```typescript
   * Prime.is(17); // → true
   * Prime.is(15); // → false
   * ```
   */
  public static is(n: number): boolean {
    if (!isInteger(n) || n < 2) {
      return false;
    }

    if (n === 2) return true;
    if (n % 2 === 0) return false;

    // Check odd divisors up to sqrt(n)
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Find the next prime number after n
   * 
   * @param n - Starting number
   * @returns Next prime number after n
   * @throws {MathterError} When n is not an integer
   * 
   * @example
   * ```typescript
   * Prime.next(13); // → 17
   * Prime.next(1); // → 2
   * ```
   */
  public static next(n: number): number {
    if (!isInteger(n)) {
      throw new MathterError('Input must be an integer', 'NOT_INTEGER');
    }

    if (n < 2) return 2;

    let candidate = n + 1;
    while (!Prime.is(candidate)) {
      candidate++;
    }

    return candidate;
  }

  /**
   * Find the previous prime number before n
   * 
   * @param n - Starting number
   * @returns Previous prime number before n
   * @throws {MathterError} When n is not an integer or no previous prime exists
   * 
   * @example
   * ```typescript
   * Prime.previous(17); // → 13
   * Prime.previous(3); // → 2
   * ```
   */
  public static previous(n: number): number {
    if (!isInteger(n)) {
      throw new MathterError('Input must be an integer', 'NOT_INTEGER');
    }

    if (n <= 2) {
      throw new MathterError('No prime number exists before 2', 'NO_PREVIOUS_PRIME');
    }

    let candidate = n - 1;
    while (candidate >= 2 && !Prime.is(candidate)) {
      candidate--;
    }

    if (candidate < 2) {
      throw new MathterError('No prime number found', 'NO_PRIME_FOUND');
    }

    return candidate;
  }

  /**
   * Get prime factors of a number
   * 
   * @param n - Number to factorize
   * @returns Object with prime factors and their exponents
   * @throws {MathterError} When n is not an integer greater than 1
   * 
   * @example
   * ```typescript
   * Prime.factors(60); // → { 2: 2, 3: 1, 5: 1 }
   * Prime.factors(17); // → { 17: 1 }
   * ```
   */
  public static factors(n: number): PrimeFactors {
    if (!isInteger(n) || n < 2) {
      throw new MathterError('Number must be an integer greater than 1', 'INVALID_INPUT');
    }

    const factors: PrimeFactors = {};
    let num = n;

    // Check for factor 2
    while (num % 2 === 0) {
      factors[2] = (factors[2] || 0) + 1;
      num /= 2;
    }

    // Check for odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      while (num % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        num /= i;
      }
    }

    // If remaining number is greater than 1, it's a prime factor
    if (num > 1) {
      factors[num] = (factors[num] || 0) + 1;
    }

    return factors;
  }

  /**
   * Get all prime numbers up to n (Sieve of Eratosthenes)
   * 
   * @param n - Upper limit
   * @returns Array of all prime numbers up to n
   * @throws {MathterError} When n is not an integer greater than 1
   * 
   * @example
   * ```typescript
   * Prime.sieve(20); // → [2, 3, 5, 7, 11, 13, 17, 19]
   * Prime.sieve(10); // → [2, 3, 5, 7]
   * ```
   */
  public static sieve(n: number): number[] {
    if (!isInteger(n) || n < 2) {
      throw new MathterError('Number must be an integer greater than 1', 'INVALID_INPUT');
    }

    const primes: number[] = [];
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }

    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }

    return primes;
  }

  /**
   * Check if two numbers are coprime (relatively prime)
   * 
   * @param a - First number
   * @param b - Second number
   * @returns True if the numbers are coprime (gcd = 1)
   * @throws {MathterError} When either number is not an integer
   * 
   * @example
   * ```typescript
   * Prime.areCoprime(8, 15); // → true
   * Prime.areCoprime(12, 18); // → false
   * ```
   */
  public static areCoprime(a: number, b: number): boolean {
    if (!isInteger(a) || !isInteger(b)) {
      throw new MathterError('Both numbers must be integers', 'NOT_INTEGER');
    }

    if (a === 0 || b === 0) {
      return Math.abs(a) === 1 || Math.abs(b) === 1;
    }

    return Prime.gcd(Math.abs(a), Math.abs(b)) === 1;
  }

  /**
   * Calculate Euler's totient function φ(n)
   * 
   * @param n - Positive integer
   * @returns Euler's totient function value
   * @throws {MathterError} When n is not a positive integer
   * 
   * @example
   * ```typescript
   * Prime.totient(10); // → 4
   * Prime.totient(7); // → 6
   * ```
   */
  public static totient(n: number): number {
    if (!isInteger(n) || n < 1) {
      throw new MathterError('Number must be a positive integer', 'INVALID_INPUT');
    }

    if (n === 1) return 1;

    const factors = this.factors(n);
    let result = n;

    for (const prime in factors) {
      result *= (1 - 1 / parseInt(prime));
    }

    return Math.round(result);
  }

  /**
   * Check if a number is a prime power
   * 
   * @param n - Number to check
   * @returns True if the number is a prime power
   * 
   * @example
   * ```typescript
   * Prime.isPrimePower(8); // → true (2^3)
   * Prime.isPrimePower(15); // → false
   * ```
   */
  public static isPrimePower(n: number): boolean {
    if (!isInteger(n) || n < 2) {
      return false;
    }

    const factors = this.factors(n);
    const primeCount = Object.keys(factors).length;
    
    return primeCount === 1;
  }

  /**
   * Get the smallest prime factor of a number
   * 
   * @param n - Number to factorize
   * @returns Smallest prime factor of n
   * @throws {MathterError} When n is not an integer greater than 1
   * 
   * @example
   * ```typescript
   * Prime.smallestFactor(15); // → 3
   * Prime.smallestFactor(17); // → 17
   * ```
   */
  public static smallestFactor(n: number): number {
    if (!isInteger(n) || n < 2) {
      throw new MathterError('Number must be an integer greater than 1', 'INVALID_INPUT');
    }

    if (n % 2 === 0) return 2;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        return i;
      }
    }

    return n; // n is prime
  }

  /**
   * Check if a number is a Mersenne prime
   * 
   * @param n - Number to check
   * @returns True if the number is a Mersenne prime
   * 
   * @example
   * ```typescript
   * Prime.isMersenne(7); // → true (2^3 - 1)
   * Prime.isMersenne(15); // → false
   * ```
   */
  public static isMersenne(n: number): boolean {
    if (!this.is(n)) return false;

    // Check if n = 2^p - 1 for some prime p
    const m = n + 1;
    if (m <= 0 || (m & (m - 1)) !== 0) return false; // Check if m is a power of 2

    const p = Math.log2(m);
    return isInteger(p) && this.is(p);
  }

  /**
   * Get twin primes (pairs of primes that differ by 2)
   * 
   * @param limit - Upper limit for prime search
   * @returns Array of twin prime pairs
   * @throws {MathterError} When limit is not an integer greater than 4
   * 
   * @example
   * ```typescript
   * Prime.twinPrimes(20); // → [[3, 5], [5, 7], [11, 13], [17, 19]]
   * ```
   */
  public static twinPrimes(limit: number): Array<[number, number]> {
    if (!isInteger(limit) || limit < 5) {
      throw new MathterError('Limit must be an integer greater than 4', 'INVALID_INPUT');
    }

    const primes = this.sieve(limit);
    const twins: Array<[number, number]> = [];

    for (let i = 0; i < primes.length - 1; i++) {
      if (primes[i + 1] - primes[i] === 2) {
        twins.push([primes[i], primes[i + 1]]);
      }
    }

    return twins;
  }

  // Private helper method for GCD
  private static gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}

// Convenience functions for direct import
export const nextPrime = Prime.next;
export const previousPrime = Prime.previous;
export const primeFactors = Prime.factors;
export const primeSieve = Prime.sieve;
export const areCoprime = Prime.areCoprime;
export const totient = Prime.totient;
