import { Base } from '../src/base';

describe('Base Module', () => {
  describe('Base conversion', () => {
    test('should convert decimal to binary', () => {
      expect(Base.decimalToBinary(10)).toBe('1010');
      expect(Base.decimalToBinary(0)).toBe('0');
      expect(Base.decimalToBinary(1)).toBe('1');
    });

    test('should convert binary to decimal', () => {
      expect(Base.binaryToDecimal('1010')).toBe(10);
      expect(Base.binaryToDecimal('0')).toBe(0);
      expect(Base.binaryToDecimal('1')).toBe(1);
    });

    test('should convert decimal to hex', () => {
      expect(Base.decimalToHex(255)).toBe('FF');
      expect(Base.decimalToHex(16)).toBe('10');
    });

    test('should convert hex to decimal', () => {
      expect(Base.hexToDecimal('FF')).toBe(255);
      expect(Base.hexToDecimal('10')).toBe(16);
    });

    test('should convert between different bases', () => {
      const result = Base.convert('1010', 2, 16);
      expect(result.value).toBe('A');
      expect(result.fromBase).toBe(2);
      expect(result.toBase).toBe(16);
    });

    test('should handle case insensitive hex', () => {
      expect(Base.hexToDecimal('ff')).toBe(255);
      expect(Base.hexToDecimal('aB')).toBe(171);
    });
  });

  describe('Validation', () => {
    test('should validate binary numbers', () => {
      expect(Base.isValidInBase('1010', 2)).toBe(true);
      expect(Base.isValidInBase('1020', 2)).toBe(false);
    });

    test('should validate hex numbers', () => {
      expect(Base.isValidInBase('FF', 16)).toBe(true);
      expect(Base.isValidInBase('GG', 16)).toBe(false);
    });

    test('should get valid digits for base', () => {
      expect(Base.getDigitsForBase(2)).toBe('01');
      expect(Base.getDigitsForBase(16)).toBe('0123456789ABCDEF');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid base', () => {
      expect(() => Base.convert('10', 1 as any, 2)).toThrow('Base must be between 2 and 36');
      expect(() => Base.convert('10', 2, 37 as any)).toThrow('Base must be between 2 and 36');
    });

    test('should throw error for invalid input', () => {
      expect(() => Base.convert('', 2, 10)).toThrow('Value must be a non-empty string');
      expect(() => Base.convert('102', 2, 10)).toThrow('Value \'102\' is not valid in base 2');
    });

    test('should throw error for negative numbers', () => {
      expect(() => Base.decimalToBinary(-1)).toThrow('Input must be a non-negative integer');
    });
  });
});
