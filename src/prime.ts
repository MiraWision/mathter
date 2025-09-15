import { PrimeFactors, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

export class Prime {
  /**
   * Check if a number is prime
   */
  static Is(n: number): boolean {
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
   */
  static Next(n: number): number {
    if (!isInteger(n)) {
      throw new MathterError('Input must be an integer', 'NOT_INTEGER');
    }

    if (n < 2) return 2;

    let candidate = n + 1;
    while (!Prime.Is(candidate)) {
      candidate++;
    }

    return candidate;
  }

  /**
   * Find the previous prime number before n
   */
  static Previous(n: number): number {
    if (!isInteger(n)) {
      throw new MathterError('Input must be an integer', 'NOT_INTEGER');
    }

    if (n <= 2) {
      throw new MathterError('No prime number exists before 2', 'NO_PREVIOUS_PRIME');
    }

    let candidate = n - 1;
    while (candidate >= 2 && !Prime.Is(candidate)) {
      candidate--;
    }

    if (candidate < 2) {
      throw new MathterError('No prime number found', 'NO_PRIME_FOUND');
    }

    return candidate;
  }

  /**
   * Get prime factors of a number
   */
  static Factors(n: number): PrimeFactors {
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
   */
  static Sieve(n: number): number[] {
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
   */
  static AreCoprime(a: number, b: number): boolean {
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
   */
  static Totient(n: number): number {
    if (!isInteger(n) || n < 1) {
      throw new MathterError('Number must be a positive integer', 'INVALID_INPUT');
    }

    if (n === 1) return 1;

    const factors = this.Factors(n);
    let result = n;

    for (const prime in factors) {
      result *= (1 - 1 / parseInt(prime));
    }

    return Math.round(result);
  }

  /**
   * Check if a number is a prime power
   */
  static IsPrimePower(n: number): boolean {
    if (!isInteger(n) || n < 2) {
      return false;
    }

    const factors = this.Factors(n);
    const primeCount = Object.keys(factors).length;
    
    return primeCount === 1;
  }

  /**
   * Get the smallest prime factor of a number
   */
  static SmallestFactor(n: number): number {
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
   */
  static IsMersenne(n: number): boolean {
    if (!this.Is(n)) return false;

    // Check if n = 2^p - 1 for some prime p
    const m = n + 1;
    if (m <= 0 || (m & (m - 1)) !== 0) return false; // Check if m is a power of 2

    const p = Math.log2(m);
    return isInteger(p) && this.Is(p);
  }

  /**
   * Get twin primes (pairs of primes that differ by 2)
   */
  static TwinPrimes(limit: number): Array<[number, number]> {
    if (!isInteger(limit) || limit < 5) {
      throw new MathterError('Limit must be an integer greater than 4', 'INVALID_INPUT');
    }

    const primes = this.Sieve(limit);
    const twins: Array<[number, number]> = [];

    for (let i = 0; i < primes.length - 1; i++) {
      if (primes[i + 1] - primes[i] === 2) {
        twins.push([primes[i], primes[i + 1]]);
      }
    }

    return twins;
  }

  // Private helper method for GCD
  static gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}

// Convenience functions for direct import
export const nextPrime = Prime.Next;
export const previousPrime = Prime.Previous;
export const primeFactors = Prime.Factors;
export const primeSieve = Prime.Sieve;
export const areCoprime = Prime.AreCoprime;
export const totient = Prime.Totient;
