import { Roman } from '../src/roman';

describe('Roman Module', () => {
  describe('To Roman conversion', () => {
    test('should convert 1 to I', () => {
      expect(Roman.To(1)).toBe('I');
    });

    test('should convert 5 to V', () => {
      expect(Roman.To(5)).toBe('V');
    });

    test('should convert 10 to X', () => {
      expect(Roman.To(10)).toBe('X');
    });

    test('should convert 4 to IV', () => {
      expect(Roman.To(4)).toBe('IV');
    });

    test('should convert 9 to IX', () => {
      expect(Roman.To(9)).toBe('IX');
    });

    test('should convert 2025 to MMXXV', () => {
      expect(Roman.To(2025)).toBe('MMXXV');
    });

    test('should throw error for invalid range', () => {
      expect(() => Roman.To(0)).toThrow('Number must be between 1 and 3999');
      expect(() => Roman.To(4000)).toThrow('Number must be between 1 and 3999');
    });

    test('should throw error for non-integer', () => {
      expect(() => Roman.To(1.5)).toThrow('Number must be an integer');
    });
  });

  describe('From Roman conversion', () => {
    test('should convert I to 1', () => {
      expect(Roman.From('I')).toBe(1);
    });

    test('should convert V to 5', () => {
      expect(Roman.From('V')).toBe(5);
    });

    test('should convert X to 10', () => {
      expect(Roman.From('X')).toBe(10);
    });

    test('should convert IV to 4', () => {
      expect(Roman.From('IV')).toBe(4);
    });

    test('should convert IX to 9', () => {
      expect(Roman.From('IX')).toBe(9);
    });

    test('should convert MMXXV to 2025', () => {
      expect(Roman.From('MMXXV')).toBe(2025);
    });

    test('should handle case insensitive input', () => {
      expect(Roman.From('mmxxv')).toBe(2025);
    });

    test('should throw error for invalid input', () => {
      expect(() => Roman.From('')).toThrow('Input must be a non-empty string');
      expect(() => Roman.From('INVALID')).toThrow('Invalid Roman numeral format');
    });
  });

  describe('Is Roman validation', () => {
    test('should return true for valid Roman numerals', () => {
      expect(Roman.IsRoman('I')).toBe(true);
      expect(Roman.IsRoman('MMXXV')).toBe(true);
      expect(Roman.IsRoman('IV')).toBe(true);
    });

    test('should return false for invalid Roman numerals', () => {
      expect(Roman.IsRoman('INVALID')).toBe(false);
      expect(Roman.IsRoman('')).toBe(false);
      expect(Roman.IsRoman('123')).toBe(false);
    });
  });
});
