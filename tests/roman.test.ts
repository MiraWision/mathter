import { Roman } from '../src/roman';

describe('Roman Module', () => {
  describe('To Roman conversion', () => {
    test('should convert 1 to I', () => {
      expect(Roman.to(1)).toBe('I');
    });

    test('should convert 5 to V', () => {
      expect(Roman.to(5)).toBe('V');
    });

    test('should convert 10 to X', () => {
      expect(Roman.to(10)).toBe('X');
    });

    test('should convert 4 to IV', () => {
      expect(Roman.to(4)).toBe('IV');
    });

    test('should convert 9 to IX', () => {
      expect(Roman.to(9)).toBe('IX');
    });

    test('should convert 2025 to MMXXV', () => {
      expect(Roman.to(2025)).toBe('MMXXV');
    });

    test('should throw error for invalid range', () => {
      expect(() => Roman.to(0)).toThrow('Number must be between 1 and 3999');
      expect(() => Roman.to(4000)).toThrow('Number must be between 1 and 3999');
    });

    test('should throw error for non-integer', () => {
      expect(() => Roman.to(1.5)).toThrow('Number must be an integer');
    });
  });

  describe('From Roman conversion', () => {
    test('should convert I to 1', () => {
      expect(Roman.from('I')).toBe(1);
    });

    test('should convert V to 5', () => {
      expect(Roman.from('V')).toBe(5);
    });

    test('should convert X to 10', () => {
      expect(Roman.from('X')).toBe(10);
    });

    test('should convert IV to 4', () => {
      expect(Roman.from('IV')).toBe(4);
    });

    test('should convert IX to 9', () => {
      expect(Roman.from('IX')).toBe(9);
    });

    test('should convert MMXXV to 2025', () => {
      expect(Roman.from('MMXXV')).toBe(2025);
    });

    test('should handle case insensitive input', () => {
      expect(Roman.from('mmxxv')).toBe(2025);
    });

    test('should throw error for invalid input', () => {
      expect(() => Roman.from('')).toThrow('Input must be a non-empty string');
      expect(() => Roman.from('INVALID')).toThrow('Invalid Roman numeral format');
    });
  });

  describe('Is Roman validation', () => {
    test('should return true for valid Roman numerals', () => {
      expect(Roman.isRoman('I')).toBe(true);
      expect(Roman.isRoman('MMXXV')).toBe(true);
      expect(Roman.isRoman('IV')).toBe(true);
    });

    test('should return false for invalid Roman numerals', () => {
      expect(Roman.isRoman('INVALID')).toBe(false);
      expect(Roman.isRoman('')).toBe(false);
      expect(Roman.isRoman('123')).toBe(false);
    });
  });
});
