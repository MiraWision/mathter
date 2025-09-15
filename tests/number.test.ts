import { Number as MathNumber } from '../src/number';

describe('Number Module', () => {
  describe('GCD and LCM', () => {
    test('should calculate GCD', () => {
      expect(MathNumber.GCD(12, 8)).toBe(4);
      expect(MathNumber.GCD(15, 25)).toBe(5);
      expect(MathNumber.GCD(17, 13)).toBe(1);
    });

    test('should calculate LCM', () => {
      expect(MathNumber.LCM(12, 8)).toBe(24);
      expect(MathNumber.LCM(15, 25)).toBe(75);
      expect(MathNumber.LCM(17, 13)).toBe(221);
    });

    test('should throw error for non-integers', () => {
      expect(() => MathNumber.GCD(1.5, 2)).toThrow('Both numbers must be integers');
      expect(() => MathNumber.LCM(1, 2.5)).toThrow('Both numbers must be integers');
    });
  });

  describe('Even/Odd checks', () => {
    test('should check if number is even', () => {
      expect(MathNumber.IsEven(2)).toBe(true);
      expect(MathNumber.IsEven(3)).toBe(false);
      expect(MathNumber.IsEven(0)).toBe(true);
    });

    test('should check if number is odd', () => {
      expect(MathNumber.IsOdd(3)).toBe(true);
      expect(MathNumber.IsOdd(2)).toBe(false);
      expect(MathNumber.IsOdd(0)).toBe(false);
    });
  });

  describe('Rounding', () => {
    test('should round to specified decimal places', () => {
      expect(MathNumber.RoundTo(3.14159, 2)).toBe(3.14);
      expect(MathNumber.RoundTo(3.14159, 3)).toBe(3.142);
      expect(MathNumber.RoundTo(3.14159, 0)).toBe(3);
    });
  });

  describe('Percentage calculations', () => {
    test('should calculate percentage from x of y', () => {
      const result = MathNumber.Percent.FromXofY(20, 500);
      expect(result.value).toBe(100);
      expect(result.percentage).toBe(20);
      expect(result.originalValue).toBe(500);
    });

    test('should calculate percentage increase', () => {
      const result = MathNumber.Percent.Increase(100, 10);
      expect(result.value).toBe(110);
      expect(result.percentage).toBe(10);
    });

    test('should calculate percentage decrease', () => {
      const result = MathNumber.Percent.Decrease(100, 20);
      expect(result.value).toBe(80);
      expect(result.percentage).toBe(20);
    });

    test('should calculate percentage change', () => {
      const result = MathNumber.Percent.Change(50, 75);
      expect(result.value).toBe(75);
      expect(result.percentage).toBe(50);
    });
  });

  describe('Prime checks', () => {
    test('should check if number is prime', () => {
      expect(MathNumber.IsPrime(2)).toBe(true);
      expect(MathNumber.IsPrime(3)).toBe(true);
      expect(MathNumber.IsPrime(4)).toBe(false);
      expect(MathNumber.IsPrime(17)).toBe(true);
    });
  });

  describe('Perfect squares and cubes', () => {
    test('should check if number is perfect square', () => {
      expect(MathNumber.IsPerfectSquare(4)).toBe(true);
      expect(MathNumber.IsPerfectSquare(9)).toBe(true);
      expect(MathNumber.IsPerfectSquare(10)).toBe(false);
    });

    test('should check if number is perfect cube', () => {
      expect(MathNumber.IsPerfectCube(8)).toBe(true);
      expect(MathNumber.IsPerfectCube(27)).toBe(true);
      expect(MathNumber.IsPerfectCube(10)).toBe(false);
    });
  });

  describe('Factorial', () => {
    test('should calculate factorial', () => {
      expect(MathNumber.Factorial(0)).toBe(1);
      expect(MathNumber.Factorial(1)).toBe(1);
      expect(MathNumber.Factorial(5)).toBe(120);
    });

    test('should throw error for negative numbers', () => {
      expect(() => MathNumber.Factorial(-1)).toThrow('Number must be a non-negative integer');
    });
  });
});
