import { Symbol } from '../src/symbol';

describe('Symbol Module', () => {
  describe('Get symbol by name', () => {
    test('should get pi symbol', () => {
      expect(Symbol.Get('pi')).toBe('π');
    });

    test('should get infinity symbol', () => {
      expect(Symbol.Get('infinity')).toBe('∞');
    });

    test('should get plus symbol', () => {
      expect(Symbol.Get('plus')).toBe('+');
    });

    test('should get equals symbol', () => {
      expect(Symbol.Get('equals')).toBe('=');
    });

    test('should throw error for unknown symbol', () => {
      expect(() => Symbol.Get('unknown' as any)).toThrow('Unknown symbol name: unknown');
    });
  });

  describe('Get name by symbol', () => {
    test('should get name for pi symbol', () => {
      expect(Symbol.Name('π')).toBe('pi');
    });

    test('should get name for infinity symbol', () => {
      expect(Symbol.Name('∞')).toBe('infinity');
    });

    test('should return null for unknown symbol', () => {
      expect(Symbol.Name('?')).toBe(null);
    });
  });

  describe('Replace in text', () => {
    test('should replace mathematical keywords with symbols', () => {
      const text = 'The value of pi is approximately 3.14';
      const result = Symbol.ReplaceInText(text);
      expect(result).toBe('The value of π is approximately 3.14');
    });

    test('should replace multiple symbols', () => {
      const text = 'alpha plus beta equals gamma';
      const result = Symbol.ReplaceInText(text);
      expect(result).toBe('α + β = γ');
    });

    test('should handle case insensitive replacement', () => {
      const text = 'PI and E are important constants';
      const result = Symbol.ReplaceInText(text);
      expect(result).toBe('π and e are important constants');
    });

    test('should throw error for non-string input', () => {
      expect(() => Symbol.ReplaceInText(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('Get symbols by category', () => {
    test('should get constants symbols', () => {
      const constants = Symbol.GetByCategory('constants');
      expect(constants).toContain('pi');
      expect(constants).toContain('e');
      expect(constants).toContain('infinity');
    });

    test('should get operations symbols', () => {
      const operations = Symbol.GetByCategory('operations');
      expect(operations).toContain('plus');
      expect(operations).toContain('minus');
      expect(operations).toContain('times');
    });

    test('should get greek symbols', () => {
      const greek = Symbol.GetByCategory('greek');
      expect(greek).toContain('alpha');
      expect(greek).toContain('beta');
      expect(greek).toContain('gamma');
    });
  });

  describe('Find by name', () => {
    test('should find symbols by partial name', () => {
      const results = Symbol.FindByName('pl');
      expect(results).toContain('plus');
      expect(results).toContain('plus-minus');
    });

    test('should be case insensitive', () => {
      const results = Symbol.FindByName('PI');
      expect(results).toContain('pi');
    });
  });
});
