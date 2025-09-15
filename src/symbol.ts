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

export class Symbol {
  /**
   * Get mathematical symbol by name
   */
  static Get(name: MathSymbolName): string {
    if (!(name in SYMBOL_MAP)) {
      throw new MathterError(`Unknown symbol name: ${name}`, 'UNKNOWN_SYMBOL');
    }
    
    return SYMBOL_MAP[name];
  }

  /**
   * Get symbol name by symbol
   */
  static Name(symbol: string): MathSymbolName | null {
    return NAME_MAP[symbol] || null;
  }

  /**
   * Replace mathematical keywords in text with symbols
   */
  static ReplaceInText(text: string): string {
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
   */
  static GetNames(): MathSymbolName[] {
    return Object.keys(SYMBOL_MAP) as MathSymbolName[];
  }

  /**
   * Get all available symbols
   */
  static GetSymbols(): string[] {
    return Object.values(SYMBOL_MAP);
  }

  /**
   * Check if a string is a mathematical symbol
   */
  static IsSymbol(str: string): boolean {
    return str in NAME_MAP;
  }

  /**
   * Get symbol by partial name match
   */
  static FindByName(partialName: string): MathSymbolName[] {
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
   */
  static GetByCategory(category: 'constants' | 'operations' | 'relations' | 'greek' | 'sets' | 'logic'): MathSymbolName[] {
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
export const getSymbol = Symbol.Get;
export const getSymbolName = Symbol.Name;
export const replaceInText = Symbol.ReplaceInText;
export const isSymbol = Symbol.IsSymbol;
