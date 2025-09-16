import { Symbol } from '../src/symbol';

describe('Symbol Module', () => {
  describe('Get symbol by name', () => {
    test('should get pi symbol', () => {
      expect(Symbol.getSymbol('pi')).toBe('π');
    });

    test('should get infinity symbol', () => {
      expect(Symbol.getSymbol('infinity')).toBe('∞');
    });

    test('should get plus symbol', () => {
      expect(Symbol.getSymbol('plus')).toBe('+');
    });

    test('should get equals symbol', () => {
      expect(Symbol.getSymbol('equals')).toBe('=');
    });

    test('should throw error for unknown symbol', () => {
      expect(() => Symbol.getSymbol('unknown' as any)).toThrow('Unknown symbol name: unknown');
    });
  });

  describe('Get name by symbol', () => {
    test('should get name for pi symbol', () => {
      expect(Symbol.getSymbolName('π')).toBe('pi');
    });

    test('should get name for infinity symbol', () => {
      expect(Symbol.getSymbolName('∞')).toBe('infinity');
    });

    test('should return null for unknown symbol', () => {
      expect(Symbol.getSymbolName('?')).toBe(null);
    });
  });

  describe('Replace in text', () => {
    test('should replace mathematical keywords with symbols', () => {
      const text = 'The value of pi is approximately 3.14';
      const result = Symbol.replaceInText(text);
      expect(result).toBe('The value of π is approximately 3.14');
    });

    test('should replace multiple symbols', () => {
      const text = 'alpha plus beta equals gamma';
      const result = Symbol.replaceInText(text);
      expect(result).toBe('α + β = γ');
    });

    test('should handle case insensitive replacement', () => {
      const text = 'PI and E are important constants';
      const result = Symbol.replaceInText(text);
      expect(result).toBe('π and e are important constants');
    });

    test('should throw error for non-string input', () => {
      expect(() => Symbol.replaceInText(123 as any)).toThrow('Input must be a string');
    });
  });
});
