import { BaseSystem, BaseConversionResult, MathterError } from './types';

// Utility function for integer check (compatible with older Node.js versions)
const isInteger = (n: number): boolean => {
  return n % 1 === 0;
};

// Character sets for different bases
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Base conversion utilities for different number systems
 * 
 * Provides methods to convert numbers between different base systems (2-36),
 * including binary, octal, decimal, and hexadecimal conversions.
 * 
 * @example
 * ```typescript
 * // Convert decimal to binary
 * Base.convert('10', 10, 2); // → { value: '1010', fromBase: 10, toBase: 2, originalValue: '10' }
 * 
 * // Convert binary to hexadecimal
 * Base.convert('1010', 2, 16); // → { value: 'A', fromBase: 2, toBase: 16, originalValue: '1010' }
 * ```
 */
export class Base {
  /**
   * Convert number between different base systems
   * 
   * @param value - The number to convert as a string
   * @param from - Source base system (2-36)
   * @param to - Target base system (2-36)
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When base is invalid or value is not valid in source base
   * 
   * @example
   * ```typescript
   * Base.convert('FF', 16, 10); // → { value: '255', fromBase: 16, toBase: 10, originalValue: 'FF' }
   * ```
   */
  public static convert(value: string, from: BaseSystem, to: BaseSystem): BaseConversionResult {
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
   * 
   * @param n - Non-negative integer to convert
   * @returns Binary representation as string
   * @throws {MathterError} When input is not a non-negative integer
   * 
   * @example
   * ```typescript
   * Base.decimalToBinary(10); // → '1010'
   * Base.decimalToBinary(0); // → '0'
   * ```
   */
  public static decimalToBinary(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 2);
  }

  /**
   * Convert binary to decimal
   * 
   * @param binary - Binary string to convert
   * @returns Decimal number
   * @throws {MathterError} When input is not a valid binary string
   * 
   * @example
   * ```typescript
   * Base.binaryToDecimal('1010'); // → 10
   * Base.binaryToDecimal('0'); // → 0
   * ```
   */
  public static binaryToDecimal(binary: string): number {
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
   * 
   * @param n - Non-negative integer to convert
   * @returns Hexadecimal representation as string
   * @throws {MathterError} When input is not a non-negative integer
   * 
   * @example
   * ```typescript
   * Base.decimalToHex(255); // → 'FF'
   * Base.decimalToHex(16); // → '10'
   * ```
   */
  public static decimalToHex(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 16);
  }

  /**
   * Convert hexadecimal to decimal
   * 
   * @param hex - Hexadecimal string to convert
   * @returns Decimal number
   * @throws {MathterError} When input is not a valid hexadecimal string
   * 
   * @example
   * ```typescript
   * Base.hexToDecimal('FF'); // → 255
   * Base.hexToDecimal('10'); // → 16
   * ```
   */
  public static hexToDecimal(hex: string): number {
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
   * 
   * @param n - Non-negative integer to convert
   * @returns Octal representation as string
   * @throws {MathterError} When input is not a non-negative integer
   * 
   * @example
   * ```typescript
   * Base.decimalToOctal(64); // → '100'
   * Base.decimalToOctal(8); // → '10'
   * ```
   */
  public static decimalToOctal(n: number): string {
    if (!isInteger(n) || n < 0) {
      throw new MathterError('Input must be a non-negative integer', 'INVALID_INPUT');
    }

    return Base.fromDecimal(n, 8);
  }

  /**
   * Convert octal to decimal
   * 
   * @param octal - Octal string to convert
   * @returns Decimal number
   * @throws {MathterError} When input is not a valid octal string
   * 
   * @example
   * ```typescript
   * Base.octalToDecimal('100'); // → 64
   * Base.octalToDecimal('10'); // → 8
   * ```
   */
  public static octalToDecimal(octal: string): number {
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
   * 
   * @param value - String to validate
   * @param base - Base system to check against
   * @returns True if value is valid in the given base
   * 
   * @example
   * ```typescript
   * Base.isValidInBase('1010', 2); // → true
   * Base.isValidInBase('1020', 2); // → false
   * Base.isValidInBase('FF', 16); // → true
   * ```
   */
  public static isValidInBase(value: string, base: BaseSystem): boolean {
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

  /**
   * Get all valid digits for a given base
   * 
   * @param base - Base system (2-36)
   * @returns String containing all valid digits for the base
   * 
   * @example
   * ```typescript
   * Base.getDigitsForBase(2); // → '01'
   * Base.getDigitsForBase(16); // → '0123456789ABCDEF'
   * ```
   */
  public static getDigitsForBase(base: BaseSystem): string {
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
}

// Convenience functions for direct import
export const convertBase = Base.convert;
export const decimalToBinary = Base.decimalToBinary;
export const binaryToDecimal = Base.binaryToDecimal;
export const decimalToHex = Base.decimalToHex;
export const hexToDecimal = Base.hexToDecimal;
export const decimalToOctal = Base.decimalToOctal;
export const octalToDecimal = Base.octalToDecimal;
export const isValidInBase = Base.isValidInBase;
