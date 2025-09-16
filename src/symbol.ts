import { MathSymbolName, MathterError } from './types';

// Mathematical symbols mapping
const SYMBOL_MAP: Record<MathSymbolName, string> = {
  // Constants
  'pi': 'π',
  'e': 'e',
  'infinity': '∞',
  
  // Operations
  'sqrt': '√',
  'sum': '∑',
  'product': '∏',
  'integral': '∫',
  'plus': '+',
  'minus': '−',
  'times': '×',
  'divide': '÷',
  'plus-minus': '±',
  
  // Relations
  'equals': '=',
  'not-equals': '≠',
  'less': '<',
  'greater': '>',
  'less-equal': '≤',
  'greater-equal': '≥',
  
  // Greek letters
  'alpha': 'α',
  'beta': 'β',
  'gamma': 'γ',
  'delta': 'δ',
  'epsilon': 'ε',
  'theta': 'θ',
  'lambda': 'λ',
  'mu': 'μ',
  'sigma': 'σ',
  'phi': 'φ',
  'omega': 'ω',
  
  // Set theory
  'empty-set': '∅',
  'union': '∪',
  'intersection': '∩',
  'subset': '⊂',
  'superset': '⊃',
  'element': '∈',
  'not-element': '∉',
  
  // Logic
  'therefore': '∴',
  'because': '∵'
};

// Reverse mapping for symbol to name
const NAME_MAP: Record<string, MathSymbolName> = Object.fromEntries(
  Object.entries(SYMBOL_MAP).map(([name, symbol]) => [symbol, name as MathSymbolName])
);

/**
 * Mathematical symbol utilities
 * 
 * Provides methods for working with mathematical symbols, converting
 * symbol names to Unicode characters, and text processing.
 * 
 * @example
 * ```typescript
 * // Get symbols by name
 * Symbol.get('pi'); // → 'π'
 * Symbol.get('infinity'); // → '∞'
 * 
 * // Replace text with symbols
 * Symbol.replaceInText('The value of pi is 3.14'); // → 'The value of π is 3.14'
 * 
 * // Check if character is a symbol
 * Symbol.isSymbol('π'); // → true
 * ```
 */
export class Symbol {
  /**
   * Get mathematical symbol by name
   * 
   * @param name - Symbol name
   * @returns Unicode symbol character
   * @throws {MathterError} When symbol name is unknown
   * 
   * @example
   * ```typescript
   * Symbol.get('pi'); // → 'π'
   * Symbol.get('sqrt'); // → '√'
   * ```
   */
  public static getSymbol(name: MathSymbolName): string {
    if (!(name in SYMBOL_MAP)) {
      throw new MathterError(`Unknown symbol name: ${name}`, 'UNKNOWN_SYMBOL');
    }
    
    return SYMBOL_MAP[name];
  }

  /**
   * Get symbol name by symbol
   * 
   * @param symbol - Unicode symbol character
   * @returns Symbol name or null if not found
   * 
   * @example
   * ```typescript
   * Symbol.getSymbolName('π'); // → 'pi'
   * Symbol.getSymbolName('√'); // → 'sqrt'
   * Symbol.getSymbolName('?'); // → null
   * ```
   */
  public static getSymbolName(symbol: string): MathSymbolName | null {
    return NAME_MAP[symbol] || null;
  }

  /**
   * Replace mathematical keywords in text with symbols
   * 
   * @param text - Text containing mathematical keywords
   * @returns Text with keywords replaced by symbols
   * @throws {MathterError} When input is not a string
   * 
   * @example
   * ```typescript
   * Symbol.replaceInText('The value of pi is 3.14'); // → 'The value of π is 3.14'
   * Symbol.replaceInText('sqrt of 16 equals 4'); // → '√ of 16 equals 4'
   * ```
   */
  public static replaceInText(text: string): string {
    if (typeof text !== 'string') {
      throw new MathterError('Input must be a string', 'INVALID_INPUT');
    }

    let result = text;
    
    // Sort by length (longest first) to avoid partial replacements
    const sortedNames = Object.keys(SYMBOL_MAP).sort((a, b) => b.length - a.length);
    
    for (const name of sortedNames) {
      const symbol = SYMBOL_MAP[name as MathSymbolName];
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${name}\\b`, 'gi');
      result = result.replace(regex, symbol);
    }
    
    return result;
  }
}

// Convenience functions for direct import
export const getSymbol = Symbol.getSymbol;
export const getSymbolName = Symbol.getSymbolName;
export const replaceInText = Symbol.replaceInText;
