import { Combinatorics } from '../src/combinatorics';

describe('Combinatorics Module', () => {
  describe('Factorial', () => {
    test('should calculate factorial', () => {
      expect(Combinatorics.Factorial(0)).toBe(1);
      expect(Combinatorics.Factorial(1)).toBe(1);
      expect(Combinatorics.Factorial(5)).toBe(120);
    });

    test('should throw error for negative numbers', () => {
      expect(() => Combinatorics.Factorial(-1)).toThrow('Number must be a non-negative integer');
    });
  });

  describe('Permutations', () => {
    test('should calculate permutations P(n)', () => {
      const result = Combinatorics.Permutations(3);
      expect(result.count).toBe(6);
    });

    test('should calculate permutations P(n, r)', () => {
      const result = Combinatorics.Permutations(5, 3);
      expect(result.count).toBe(60);
    });

    test('should throw error when r > n', () => {
      expect(() => Combinatorics.Permutations(3, 5)).toThrow('r cannot be greater than n');
    });
  });

  describe('Combinations', () => {
    test('should calculate combinations C(n, r)', () => {
      const result = Combinatorics.Combinations(5, 3);
      expect(result.count).toBe(10);
    });

    test('should handle edge cases', () => {
      expect(Combinatorics.Combinations(5, 0).count).toBe(1);
      expect(Combinatorics.Combinations(5, 5).count).toBe(1);
    });
  });

  describe('Generate permutations', () => {
    test('should generate all permutations', () => {
      const perms = Combinatorics.GeneratePermutations([1, 2, 3]);
      expect(perms).toHaveLength(6);
      expect(perms).toContainEqual([1, 2, 3]);
      expect(perms).toContainEqual([3, 2, 1]);
    });

    test('should generate permutations with r', () => {
      const perms = Combinatorics.GeneratePermutations([1, 2, 3], 2);
      expect(perms).toHaveLength(6);
      expect(perms).toContainEqual([1, 2]);
      expect(perms).toContainEqual([2, 1]);
    });
  });

  describe('Generate combinations', () => {
    test('should generate all combinations', () => {
      const combs = Combinatorics.GenerateCombinations([1, 2, 3], 2);
      expect(combs).toHaveLength(3);
      expect(combs).toContainEqual([1, 2]);
      expect(combs).toContainEqual([1, 3]);
      expect(combs).toContainEqual([2, 3]);
    });
  });

  describe('Stirling numbers', () => {
    test('should calculate Stirling numbers of first kind', () => {
      expect(Combinatorics.StirlingFirst(3, 1)).toBe(2);
      expect(Combinatorics.StirlingFirst(3, 3)).toBe(1);
    });

    test('should calculate Stirling numbers of second kind', () => {
      expect(Combinatorics.StirlingSecond(3, 1)).toBe(1);
      expect(Combinatorics.StirlingSecond(3, 2)).toBe(3);
    });
  });
});
