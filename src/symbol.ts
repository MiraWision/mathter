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
  public static get(name: MathSymbolName): string {
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
   * Symbol.name('π'); // → 'pi'
   * Symbol.name('√'); // → 'sqrt'
   * Symbol.name('?'); // → null
   * ```
   */
  public static name(symbol: string): MathSymbolName | null {
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

  /**
   * Get all available symbol names
   * 
   * @returns Array of all symbol names
   * 
   * @example
   * ```typescript
   * Symbol.getNames(); // → ['pi', 'e', 'infinity', 'sqrt', ...]
   * ```
   */
  public static getNames(): MathSymbolName[] {
    return Object.keys(SYMBOL_MAP) as MathSymbolName[];
  }

  /**
   * Get all available symbols
   * 
   * @returns Array of all Unicode symbol characters
   * 
   * @example
   * ```typescript
   * Symbol.getSymbols(); // → ['π', 'e', '∞', '√', ...]
   * ```
   */
  public static getSymbols(): string[] {
    return Object.values(SYMBOL_MAP);
  }

  /**
   * Check if a string is a mathematical symbol
   * 
   * @param str - String to check
   * @returns True if string is a mathematical symbol
   * 
   * @example
   * ```typescript
   * Symbol.isSymbol('π'); // → true
   * Symbol.isSymbol('a'); // → false
   * ```
   */
  public static isSymbol(str: string): boolean {
    return str in NAME_MAP;
  }

  /**
   * Get symbol by partial name match
   * 
   * @param partialName - Partial symbol name to search for
   * @returns Array of matching symbol names
   * @throws {MathterError} When input is not a string
   * 
   * @example
   * ```typescript
   * Symbol.findByName('gr'); // → ['greater', 'greater-equal']
   * Symbol.findByName('alpha'); // → ['alpha']
   * ```
   */
  public static findByName(partialName: string): MathSymbolName[] {
    if (typeof partialName !== 'string') {
      throw new MathterError('Input must be a string', 'INVALID_INPUT');
    }

    const lowerPartial = partialName.toLowerCase();
    return Object.keys(SYMBOL_MAP).filter(name => 
      name.toLowerCase().includes(lowerPartial)
    ) as MathSymbolName[];
  }

  /**
   * Get all symbols in a category
   * 
   * @param category - Symbol category
   * @returns Array of symbol names in the category
   * 
   * @example
   * ```typescript
   * Symbol.getByCategory('greek'); // → ['alpha', 'beta', 'gamma', ...]
   * Symbol.getByCategory('operations'); // → ['sqrt', 'sum', 'product', ...]
   * ```
   */
  public static getByCategory(category: 'constants' | 'operations' | 'relations' | 'greek' | 'sets' | 'logic'): MathSymbolName[] {
    const categories: Record<string, MathSymbolName[]> = {
      constants: ['pi', 'e', 'infinity'],
      operations: ['sqrt', 'sum', 'product', 'integral', 'plus', 'minus', 'times', 'divide', 'plus-minus'],
      relations: ['equals', 'not-equals', 'less', 'greater', 'less-equal', 'greater-equal'],
      greek: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'theta', 'lambda', 'mu', 'sigma', 'phi', 'omega'],
      sets: ['empty-set', 'union', 'intersection', 'subset', 'superset', 'element', 'not-element'],
      logic: ['therefore', 'because']
    };

    return categories[category] || [];
  }
}

// Convenience functions for direct import
export const getSymbol = Symbol.get;
export const getSymbolName = Symbol.name;
export const replaceInText = Symbol.replaceInText;
export const isSymbol = Symbol.isSymbol;
