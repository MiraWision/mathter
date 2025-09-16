import { Combinatorics } from '../src/combinatorics';

describe('Combinatorics Module', () => {
  describe('Factorial', () => {
    test('should calculate factorial', () => {
      expect(Combinatorics.factorial(0)).toBe(1);
      expect(Combinatorics.factorial(1)).toBe(1);
      expect(Combinatorics.factorial(5)).toBe(120);
    });

    test('should throw error for negative numbers', () => {
      expect(() => Combinatorics.factorial(-1)).toThrow('Number must be a non-negative integer');
    });
  });

  describe('Permutations Count', () => {
    test('should calculate permutations P(n)', () => {
      const result = Combinatorics.permutationsCount(3);
      expect(result).toBe(6);
    });

    test('should calculate permutations P(n, r)', () => {
      const result = Combinatorics.permutationsCount(5, 3);
      expect(result).toBe(60);
    });

    test('should throw error when r > n', () => {
      expect(() => Combinatorics.permutationsCount(3, 5)).toThrow('r cannot be greater than n');
    });
  });

  describe('Combinations Count', () => {
    test('should calculate combinations C(n, r)', () => {
      const result = Combinatorics.combinationsCount(5, 3);
      expect(result).toBe(10);
    });

    test('should handle edge cases', () => {
      expect(Combinatorics.combinationsCount(5, 0)).toBe(1);
      expect(Combinatorics.combinationsCount(5, 5)).toBe(1);
    });
  });

  describe('Generate permutations', () => {
    test('should generate all permutations', () => {
      const perms = Combinatorics.permutations([1, 2, 3]);
      expect(perms).toHaveLength(6);
      expect(perms).toContainEqual([1, 2, 3]);
      expect(perms).toContainEqual([3, 2, 1]);
    });

    test('should generate permutations with r', () => {
      const perms = Combinatorics.permutations([1, 2, 3], 2);
      expect(perms).toHaveLength(6);
      expect(perms).toContainEqual([1, 2]);
      expect(perms).toContainEqual([2, 1]);
    });
  });

  describe('Generate combinations', () => {
    test('should generate all combinations', () => {
      const combs = Combinatorics.combinations([1, 2, 3], 2);
      expect(combs).toHaveLength(3);
      expect(combs).toContainEqual([1, 2]);
      expect(combs).toContainEqual([1, 3]);
      expect(combs).toContainEqual([2, 3]);
    });
  });

});
