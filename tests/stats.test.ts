import { Stats } from '../src/stats';

describe('Stats Module', () => {
  const testArray = [1, 2, 3, 4, 5];
  const testArrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5];

  describe('Basic statistics', () => {
    test('should calculate mean', () => {
      expect(Stats.Mean(testArray)).toBe(3);
    });

    test('should calculate median', () => {
      expect(Stats.Median(testArray)).toBe(3);
      expect(Stats.Median([1, 2, 3, 4])).toBe(2.5);
    });

    test('should calculate mode', () => {
      expect(Stats.Mode(testArrayWithDuplicates)).toBe(3);
      expect(Stats.Mode([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('should calculate range', () => {
      expect(Stats.Range(testArray)).toBe(4);
    });

    test('should calculate standard deviation', () => {
      expect(Stats.StdDev(testArray)).toBeCloseTo(1.41, 2);
    });

    test('should calculate variance', () => {
      expect(Stats.Variance(testArray)).toBeCloseTo(2, 1);
    });
  });

  describe('Sum and product', () => {
    test('should calculate sum', () => {
      expect(Stats.Sum(testArray)).toBe(15);
    });

    test('should calculate product', () => {
      expect(Stats.Product([1, 2, 3, 4])).toBe(24);
    });
  });

  describe('Min and max', () => {
    test('should find minimum', () => {
      expect(Stats.Min(testArray)).toBe(1);
    });

    test('should find maximum', () => {
      expect(Stats.Max(testArray)).toBe(5);
    });
  });

  describe('Quartiles', () => {
    test('should calculate quartiles', () => {
      const quartiles = Stats.Quartiles([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(quartiles.q1).toBe(2.5);
      expect(quartiles.q2).toBe(5);
      expect(quartiles.q3).toBe(7.5);
    });

    test('should calculate IQR', () => {
      expect(Stats.IQR([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(5);
    });
  });

  describe('Correlation', () => {
    test('should calculate correlation coefficient', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      expect(Stats.Correlation(x, y)).toBeCloseTo(1, 5);
    });
  });

  describe('Z-score and percentiles', () => {
    test('should calculate z-score', () => {
      expect(Stats.ZScore(110, 100, 10)).toBe(1);
    });

    test('should calculate percentile rank', () => {
      expect(Stats.PercentileRank([1, 2, 3, 4, 5], 3)).toBe(40);
    });

    test('should calculate percentile value', () => {
      expect(Stats.Percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    });
  });

  describe('Error handling', () => {
    test('should throw error for empty array', () => {
      expect(() => Stats.Mean([])).toThrow('Input must be a non-empty array');
    });

    test('should throw error for non-array input', () => {
      expect(() => Stats.Mean('not array' as any)).toThrow('Input must be a non-empty array');
    });
  });
});
