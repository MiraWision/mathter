import { Prime } from '../src/prime';

describe('Prime Module', () => {
  describe('Prime checks', () => {
    test('should identify prime numbers', () => {
      expect(Prime.Is(2)).toBe(true);
      expect(Prime.Is(3)).toBe(true);
      expect(Prime.Is(17)).toBe(true);
      expect(Prime.Is(97)).toBe(true);
    });

    test('should identify non-prime numbers', () => {
      expect(Prime.Is(1)).toBe(false);
      expect(Prime.Is(4)).toBe(false);
      expect(Prime.Is(15)).toBe(false);
      expect(Prime.Is(100)).toBe(false);
    });
  });

  describe('Next and previous primes', () => {
    test('should find next prime', () => {
      expect(Prime.Next(10)).toBe(11);
      expect(Prime.Next(17)).toBe(19);
    });

    test('should find previous prime', () => {
      expect(Prime.Previous(10)).toBe(7);
      expect(Prime.Previous(19)).toBe(17);
    });

    test('should throw error for previous prime of 2', () => {
      expect(() => Prime.Previous(2)).toThrow('No prime number exists before 2');
    });
  });

  describe('Prime factors', () => {
    test('should find prime factors', () => {
      const factors = Prime.Factors(12);
      expect(factors[2]).toBe(2);
      expect(factors[3]).toBe(1);
    });

    test('should find prime factors of prime number', () => {
      const factors = Prime.Factors(17);
      expect(factors[17]).toBe(1);
    });
  });

  describe('Prime sieve', () => {
    test('should generate primes up to n', () => {
      const primes = Prime.Sieve(20);
      expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
    });
  });

  describe('Coprime checks', () => {
    test('should check if numbers are coprime', () => {
      expect(Prime.AreCoprime(8, 9)).toBe(true);
      expect(Prime.AreCoprime(12, 8)).toBe(false);
    });
  });

  describe('Totient function', () => {
    test('should calculate Euler\'s totient', () => {
      expect(Prime.Totient(1)).toBe(1);
      expect(Prime.Totient(10)).toBe(4);
    });
  });

  describe('Prime power checks', () => {
    test('should check if number is prime power', () => {
      expect(Prime.IsPrimePower(8)).toBe(true); // 2^3
      expect(Prime.IsPrimePower(9)).toBe(true); // 3^2
      expect(Prime.IsPrimePower(12)).toBe(false);
    });
  });

  describe('Twin primes', () => {
    test('should find twin primes', () => {
      const twins = Prime.TwinPrimes(20);
      expect(twins).toContainEqual([3, 5]);
      expect(twins).toContainEqual([5, 7]);
      expect(twins).toContainEqual([11, 13]);
      expect(twins).toContainEqual([17, 19]);
    });
  });
});
