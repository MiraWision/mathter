import { Base } from '../src/base';

describe('Base Module', () => {
  describe('Base conversion', () => {
    test('should convert decimal to binary', () => {
      expect(Base.DecimalToBinary(10)).toBe('1010');
      expect(Base.DecimalToBinary(0)).toBe('0');
      expect(Base.DecimalToBinary(1)).toBe('1');
    });

    test('should convert binary to decimal', () => {
      expect(Base.BinaryToDecimal('1010')).toBe(10);
      expect(Base.BinaryToDecimal('0')).toBe(0);
      expect(Base.BinaryToDecimal('1')).toBe(1);
    });

    test('should convert decimal to hex', () => {
      expect(Base.DecimalToHex(255)).toBe('FF');
      expect(Base.DecimalToHex(16)).toBe('10');
    });

    test('should convert hex to decimal', () => {
      expect(Base.HexToDecimal('FF')).toBe(255);
      expect(Base.HexToDecimal('10')).toBe(16);
    });

    test('should convert between different bases', () => {
      const result = Base.Convert('1010', 2, 16);
      expect(result.value).toBe('A');
      expect(result.fromBase).toBe(2);
      expect(result.toBase).toBe(16);
    });

    test('should handle case insensitive hex', () => {
      expect(Base.HexToDecimal('ff')).toBe(255);
      expect(Base.HexToDecimal('aB')).toBe(171);
    });
  });

  describe('Validation', () => {
    test('should validate binary numbers', () => {
      expect(Base.IsValidInBase('1010', 2)).toBe(true);
      expect(Base.IsValidInBase('1020', 2)).toBe(false);
    });

    test('should validate hex numbers', () => {
      expect(Base.IsValidInBase('FF', 16)).toBe(true);
      expect(Base.IsValidInBase('GG', 16)).toBe(false);
    });

    test('should get valid digits for base', () => {
      expect(Base.GetDigitsForBase(2)).toBe('01');
      expect(Base.GetDigitsForBase(16)).toBe('0123456789ABCDEF');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid base', () => {
      expect(() => Base.Convert('10', 1 as any, 2)).toThrow('Base must be between 2 and 36');
      expect(() => Base.Convert('10', 2, 37 as any)).toThrow('Base must be between 2 and 36');
    });

    test('should throw error for invalid input', () => {
      expect(() => Base.Convert('', 2, 10)).toThrow('Value must be a non-empty string');
      expect(() => Base.Convert('102', 2, 10)).toThrow('Value \'102\' is not valid in base 2');
    });

    test('should throw error for negative numbers', () => {
      expect(() => Base.DecimalToBinary(-1)).toThrow('Input must be a non-negative integer');
    });
  });
});
