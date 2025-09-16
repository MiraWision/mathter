import { Stats } from '../src/stats';

describe('Stats Module', () => {
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5];

  describe('Basic statistics', () => {
    test('should calculate mean', () => {
      expect(Stats.mean(testArray)).toBe(3);
    });

    test('should calculate median', () => {
      expect(Stats.median(testArray)).toBe(3);
      expect(Stats.median([1, 2, 3, 4])).toBe(2.5);
    });

    test('should calculate mode', () => {
      expect(Stats.mode(testArrayWithDuplicates)).toBe(3);
      expect(Stats.mode([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('should calculate range', () => {
      expect(Stats.range(testArray)).toBe(4);
    });

    test('should calculate standard deviation', () => {
      expect(Stats.stdDev(testArray)).toBeCloseTo(1.41, 2);
    });

    test('should calculate variance', () => {
      expect(Stats.variance(testArray)).toBeCloseTo(2, 1);
    });
  });

  describe('Sum and product', () => {
    test('should calculate sum', () => {
      expect(Stats.sum(testArray)).toBe(15);
    });

    test('should calculate product', () => {
      expect(Stats.product([1, 2, 3, 4])).toBe(24);
    });
  });

  describe('Min and max', () => {
    test('should find minimum', () => {
      expect(Stats.min(testArray)).toBe(1);
    });

    test('should find maximum', () => {
      expect(Stats.max(testArray)).toBe(5);
    });
  });

  describe('Quartiles', () => {
    test('should calculate quartiles', () => {
      const quartiles = Stats.quartiles([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(quartiles.q1).toBe(2.5);
      expect(quartiles.q2).toBe(5);
      expect(quartiles.q3).toBe(7.5);
    });
  });

  describe('Correlation', () => {
    test('should calculate correlation coefficient', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      expect(Stats.correlation(x, y)).toBeCloseTo(1, 5);
    });
  });

  describe('Z-score and percentiles', () => {
    test('should calculate z-score', () => {
      expect(Stats.zScore(110, 100, 10)).toBe(1);
    });

    test('should calculate percentile rank', () => {
      expect(Stats.percentileRank([1, 2, 3, 4, 5], 3)).toBe(40);
    });

    test('should calculate percentile value', () => {
      expect(Stats.percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    });
  });

  describe('Error handling', () => {
    test('should throw error for empty array', () => {
      expect(() => Stats.mean([])).toThrow('Input must be a non-empty array');
    });

    test('should throw error for non-array input', () => {
      expect(() => Stats.mean('not array' as any)).toThrow('Input must be a non-empty array');
    });
  });
});
