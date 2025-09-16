import { Number as MathNumber } from '../src/number';

describe('Number Module', () => {
  describe('GCD and LCM', () => {
    test('should calculate GCD', () => {
      expect(MathNumber.gcd(12, 8)).toBe(4);
      expect(MathNumber.gcd(15, 25)).toBe(5);
      expect(MathNumber.gcd(17, 13)).toBe(1);
    });

    test('should calculate LCM', () => {
      expect(MathNumber.lcm(12, 8)).toBe(24);
      expect(MathNumber.lcm(15, 25)).toBe(75);
      expect(MathNumber.lcm(17, 13)).toBe(221);
    });

    test('should throw error for non-integers', () => {
      expect(() => MathNumber.gcd(1.5, 2)).toThrow('Both numbers must be integers');
      expect(() => MathNumber.lcm(1, 2.5)).toThrow('Both numbers must be integers');
    });

    test('should throw error for negative numbers', () => {
      expect(() => MathNumber.gcd(-1, 2)).toThrow('Numbers must be non-negative');
      expect(() => MathNumber.lcm(1, -2)).toThrow('Numbers must be non-negative');
    });
  });

  describe('Even/Odd checks', () => {
    test('should check if number is even', () => {
      expect(MathNumber.isEven(2)).toBe(true);
      expect(MathNumber.isEven(3)).toBe(false);
      expect(MathNumber.isEven(0)).toBe(true);
    });

    test('should check if number is odd', () => {
      expect(MathNumber.isOdd(3)).toBe(true);
      expect(MathNumber.isOdd(2)).toBe(false);
      expect(MathNumber.isOdd(0)).toBe(false);
    });

    test('should throw error for non-integers', () => {
      expect(() => MathNumber.isEven(1.5)).toThrow('Number must be an integer');
      expect(() => MathNumber.isOdd(2.5)).toThrow('Number must be an integer');
    });
  });

  describe('Rounding', () => {
    test('should round to specified decimal places', () => {
      expect(MathNumber.roundTo(3.14159, 2)).toBe(3.14);
      expect(MathNumber.roundTo(3.14159, 3)).toBe(3.142);
      expect(MathNumber.roundTo(3.14159, 0)).toBe(3);
    });

    test('should throw error for invalid digits', () => {
      expect(() => MathNumber.roundTo(3.14, -1)).toThrow('Digits must be a non-negative integer');
      expect(() => MathNumber.roundTo(3.14, 1.5)).toThrow('Digits must be a non-negative integer');
    });
  });

  describe('Percentage calculations', () => {
    test('should calculate percentage from x of y', () => {
      const result = MathNumber.Percent.fromXofY(20, 500);
      expect(result.value).toBe(100);
      expect(result.percentage).toBe(20);
      expect(result.originalValue).toBe(500);
    });

    test('should calculate percentage increase', () => {
      const result = MathNumber.Percent.increase(100, 10);
      expect(result.value).toBe(110);
      expect(result.percentage).toBe(10);
    });

    test('should calculate percentage decrease', () => {
      const result = MathNumber.Percent.decrease(100, 20);
      expect(result.value).toBe(80);
      expect(result.percentage).toBe(20);
    });

    test('should calculate percentage change', () => {
      const result = MathNumber.Percent.change(50, 75);
      expect(result.value).toBe(75);
      expect(result.percentage).toBe(50);
    });

    test('should throw error for negative values', () => {
      expect(() => MathNumber.Percent.fromXofY(-10, 100)).toThrow('Values must be non-negative');
      expect(() => MathNumber.Percent.increase(-50, 10)).toThrow('Values must be non-negative');
      expect(() => MathNumber.Percent.decrease(100, -10)).toThrow('Values must be non-negative');
      expect(() => MathNumber.Percent.change(-50, 100)).toThrow('Values must be non-negative');
    });

    test('should throw error for percentage > 100 in decrease', () => {
      expect(() => MathNumber.Percent.decrease(100, 150)).toThrow('Percentage cannot exceed 100%');
    });

    test('should throw error for zero initial value in change', () => {
      expect(() => MathNumber.Percent.change(0, 100)).toThrow('Initial value cannot be zero');
    });
  });

  describe('Prime checks', () => {
    test('should check if number is prime', () => {
      expect(MathNumber.Prime.is(2)).toBe(true);
      expect(MathNumber.Prime.is(3)).toBe(true);
      expect(MathNumber.Prime.is(4)).toBe(false);
      expect(MathNumber.Prime.is(17)).toBe(true);
    });

    test('should identify non-prime numbers', () => {
      expect(MathNumber.Prime.is(1)).toBe(false);
      expect(MathNumber.Prime.is(15)).toBe(false);
      expect(MathNumber.Prime.is(100)).toBe(false);
    });
  });

  describe('Perfect squares and cubes', () => {
    test('should check if number is perfect square', () => {
      expect(MathNumber.isPerfectSquare(4)).toBe(true);
      expect(MathNumber.isPerfectSquare(9)).toBe(true);
      expect(MathNumber.isPerfectSquare(10)).toBe(false);
    });

    test('should check if number is perfect cube', () => {
      expect(MathNumber.isPerfectCube(8)).toBe(true);
      expect(MathNumber.isPerfectCube(27)).toBe(true);
      expect(MathNumber.isPerfectCube(10)).toBe(false);
    });
  });

  describe('Prime operations', () => {
    test('should find next prime', () => {
      expect(MathNumber.Prime.next(10)).toBe(11);
      expect(MathNumber.Prime.next(17)).toBe(19);
    });

    test('should find previous prime', () => {
      expect(MathNumber.Prime.previous(10)).toBe(7);
      expect(MathNumber.Prime.previous(19)).toBe(17);
    });

    test('should throw error for previous prime of 2', () => {
      expect(() => MathNumber.Prime.previous(2)).toThrow('No prime number exists before 2');
    });

    test('should find prime factors', () => {
      const factors = MathNumber.Prime.factors(12);
      expect(factors[2]).toBe(2);
      expect(factors[3]).toBe(1);
    });

    test('should find prime factors of prime number', () => {
      const factors = MathNumber.Prime.factors(17);
      expect(factors[17]).toBe(1);
    });

    test('should throw error for invalid input in prime factors', () => {
      expect(() => MathNumber.Prime.factors(1)).toThrow('Number must be an integer greater than 1');
      expect(() => MathNumber.Prime.factors(1.5)).toThrow('Number must be an integer greater than 1');
    });
  });
});
