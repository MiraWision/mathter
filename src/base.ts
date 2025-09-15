import { BaseSystem, BaseConversionResult, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

// Character sets for different bases
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Base {
  /**
   * Convert number between different base systems
   */
  static Convert(value: string, from: BaseSystem, to: BaseSystem): BaseConversionResult {
    if (from < 2 || from > 36 || to < 2 || to > 36) {
      throw new MathterError('Base must be between 2 and 36', 'INVALID_BASE');
    }

    if (!value || typeof value !== 'string') {
      throw new MathterError('Value must be a non-empty string', 'INVALID_INPUT');
    }

    // Validate input value for source base
    if (!Base.isValidInBase(value, from)) {
      throw new MathterError(`Value '${value}' is not valid in base ${from}`, 'INVALID_VALUE');
    }

    // Convert to decimal first
    const decimal = Base.toDecimal(value, from);
    
    // Convert from decimal to target base
    const result = Base.fromDecimal(decimal, to);

    return {
      value: result,
      fromBase: from,
      toBase: to,
      originalValue: value
    };
  }

  /**
   * Convert decimal to binary
   */
  static DecimalToBinary(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 2);
  }

  /**
   * Convert binary to decimal
   */
  static BinaryToDecimal(binary: string): number {
    if (!binary || typeof binary !== 'string') {
      throw new MathterError('Input must be a non-empty string', 'INVALID_INPUT');
    }

    if (!Base.isValidInBase(binary, 2)) {
      throw new MathterError(`'${binary}' is not a valid binary number`, 'INVALID_BINARY');
    }

    return Base.toDecimal(binary, 2);
  }

  /**
   * Convert decimal to hexadecimal
   */
  static DecimalToHex(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 16);
  }

  /**
   * Convert hexadecimal to decimal
   */
  static HexToDecimal(hex: string): number {
    if (!hex || typeof hex !== 'string') {
      throw new MathterError('Input must be a non-empty string', 'INVALID_INPUT');
    }

    if (!Base.isValidInBase(hex, 16)) {
      throw new MathterError(`'${hex}' is not a valid hexadecimal number`, 'INVALID_HEX');
    }

    return Base.toDecimal(hex, 16);
  }

  /**
   * Convert decimal to octal
   */
  static DecimalToOctal(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 8);
  }

  /**
   * Convert octal to decimal
   */
  static OctalToDecimal(octal: string): number {
    if (!octal || typeof octal !== 'string') {
      throw new MathterError('Input must be a non-empty string', 'INVALID_INPUT');
    }

    if (!Base.isValidInBase(octal, 8)) {
      throw new MathterError(`'${octal}' is not a valid octal number`, 'INVALID_OCTAL');
    }

    return Base.toDecimal(octal, 8);
  }

  /**
   * Check if a value is valid in given base
   */
  static IsValidInBase(value: string, base: BaseSystem): boolean {
    return Base.isValidInBase(value, base);
  }

  /**
   * Get all valid digits for a given base
   */
  static GetDigitsForBase(base: BaseSystem): string {
    return DIGITS.substring(0, base);
  }

  // Private helper methods
  private static toDecimal(value: string, fromBase: BaseSystem): number {
    const upperValue = value.toUpperCase();
    let result = 0;
    let power = 1;

    for (let i = upperValue.length - 1; i >= 0; i--) {
      const digit = upperValue[i];
      const digitValue = DIGITS.indexOf(digit);
      
      if (digitValue === -1 || digitValue >= fromBase) {
        throw new MathterError(`Invalid digit '${digit}' for base ${fromBase}`, 'INVALID_DIGIT');
      }

      result += digitValue * power;
      power *= fromBase;
    }

    return result;
  }

  private static fromDecimal(decimal: number, toBase: BaseSystem): string {
    if (decimal === 0) return '0';

    let result = '';
    let num = decimal;

    while (num > 0) {
      result = DIGITS[num % toBase] + result;
      num = Math.floor(num / toBase);
    }

    return result;
  }

  private static isValidInBase(value: string, base: BaseSystem): boolean {
    if (!value || typeof value !== 'string') return false;

    const upperValue = value.toUpperCase();
    const validDigits = DIGITS.substring(0, base);

    for (const char of upperValue) {
      if (!validDigits.includes(char)) {
        return false;
      }
    }

    return true;
  }
}

// Convenience functions for direct import
export const convertBase = Base.Convert;
export const decimalToBinary = Base.DecimalToBinary;
export const binaryToDecimal = Base.BinaryToDecimal;
export const decimalToHex = Base.DecimalToHex;
export const hexToDecimal = Base.HexToDecimal;
export const decimalToOctal = Base.DecimalToOctal;
export const octalToDecimal = Base.OctalToDecimal;
export const isValidInBase = Base.IsValidInBase;
