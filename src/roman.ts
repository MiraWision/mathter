import { RomanSymbol, RomanValue, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

// Roman numeral mappings
const ROMAN_TO_VALUE: Record<RomanSymbol, RomanValue> = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

const VALUE_TO_ROMAN: Record<number, RomanSymbol> = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};

// Roman numeral patterns for validation
const ROMAN_PATTERN = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export class Roman {
  /**
   * Convert number to Roman numeral
   */
  static To(n: number): string {
    if (n <= 0 || n > 3999) {
      throw new MathterError('Number must be between 1 and 3999', 'INVALID_RANGE');
    }

    if (!isInteger(n)) {
      throw new MathterError('Number must be an integer', 'NOT_INTEGER');
    }

    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    
    let result = '';
    
    for (let i = 0; i < values.length; i++) {
      const count = Math.floor(n / values[i]);
      result += symbols[i].repeat(count);
      n -= values[i] * count;
    }
    
    return result;
  }

  /**
   * Convert Roman numeral to number
   */
  static From(str: string): number {
    if (!str || typeof str !== 'string') {
      throw new MathterError('Input must be a non-empty string', 'INVALID_INPUT');
    }

    const roman = str.toUpperCase().trim();
    
    if (!ROMAN_PATTERN.test(roman)) {
      throw new MathterError('Invalid Roman numeral format', 'INVALID_FORMAT');
    }

    let result = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = ROMAN_TO_VALUE[roman[i] as RomanSymbol];
      
      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }
      
      prevValue = currentValue;
    }

    return result;
  }

  /**
   * Check if string is a valid Roman numeral
   */
  static IsRoman(str: string): boolean {
    if (!str || typeof str !== 'string') {
      return false;
    }

    const roman = str.toUpperCase().trim();
    return ROMAN_PATTERN.test(roman);
  }

  /**
   * Get all Roman symbols
   */
  static GetSymbols(): RomanSymbol[] {
    return Object.keys(ROMAN_TO_VALUE) as RomanSymbol[];
  }

  /**
   * Get value of a Roman symbol
   */
  static GetSymbolValue(symbol: RomanSymbol): RomanValue {
    return ROMAN_TO_VALUE[symbol];
  }

  /**
   * Get Roman symbol for a value
   */
  static GetValueSymbol(value: RomanValue): RomanSymbol {
    return VALUE_TO_ROMAN[value];
  }
}

// Convenience functions for direct import
export const toRoman = Roman.To;
export const fromRoman = Roman.From;
export const isRoman = Roman.IsRoman;
