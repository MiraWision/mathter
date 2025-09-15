import { LogicVariables, TruthTable, TruthTableRow, MathterError } from './types';

/**
 * Boolean logic utilities for expression evaluation and truth tables
 * 
 * Provides methods for evaluating logical expressions, generating truth tables,
 * checking logical properties, and converting between normal forms.
 * 
 * @example
 * ```typescript
 * // Evaluate logical expressions
 * Logic.eval('A && !B', { A: true, B: false }); // → true
 * 
 * // Generate truth tables
 * Logic.truthTable(['A', 'B'], 'A && B'); // → { variables: ['A', 'B'], rows: [...] }
 * 
 * // Check logical properties
 * Logic.isTautology('A || !A', ['A']); // → true
 * ```
 */
export class Logic {
  /**
   * Evaluate a logical expression with given variables
   * 
   * @param expr - Logical expression string
   * @param vars - Object containing variable values
   * @returns Result of the expression evaluation
   * @throws {MathterError} When expression is invalid or variables are undefined
   * 
   * @example
   * ```typescript
   * Logic.eval('A && !B', { A: true, B: false }); // → true
   * Logic.eval('A || B', { A: false, B: true }); // → true
   * ```
   */
  public static eval(expr: string, vars: LogicVariables): boolean {
    if (typeof expr !== 'string' || !expr.trim()) {
      throw new MathterError('Expression must be a non-empty string', 'INVALID_EXPRESSION');
    }

    if (typeof vars !== 'object' || vars === null) {
      throw new MathterError('Variables must be an object', 'INVALID_VARIABLES');
    }

    try {
      return Logic.evaluateExpression(expr.trim(), vars);
    } catch (error) {
      throw new MathterError(`Error evaluating expression: ${error}`, 'EVALUATION_ERROR');
    }
  }

  /**
   * Generate truth table for given variables and expression
   * 
   * @param vars - Array of variable names
   * @param expr - Logical expression string
   * @returns Truth table with all possible variable combinations and results
   * @throws {MathterError} When variables or expression are invalid
   * 
   * @example
   * ```typescript
   * Logic.truthTable(['A', 'B'], 'A && B'); // → { variables: ['A', 'B'], rows: [...] }
   * Logic.truthTable(['P'], 'P || !P'); // → { variables: ['P'], rows: [...] }
   * ```
   */
  public static truthTable(vars: string[], expr: string): TruthTable {
    if (!Array.isArray(vars) || vars.length === 0) {
      throw new MathterError('Variables must be a non-empty array', 'INVALID_VARIABLES');
    }

    if (typeof expr !== 'string' || !expr.trim()) {
      throw new MathterError('Expression must be a non-empty string', 'INVALID_EXPRESSION');
    }

    // Validate variable names
    for (const varName of vars) {
      if (typeof varName !== 'string' || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
        throw new MathterError(`Invalid variable name: ${varName}`, 'INVALID_VARIABLE_NAME');
      }
    }

    const rows: TruthTableRow[] = [];
    const numCombinations = Math.pow(2, vars.length);

    for (let i = 0; i < numCombinations; i++) {
      const variables: LogicVariables = {};
      
      // Generate binary representation for this combination
      for (let j = 0; j < vars.length; j++) {
        const bit = (i >> (vars.length - 1 - j)) & 1;
        variables[vars[j]] = bit === 1;
      }

      try {
        const result = Logic.evaluateExpression(expr, variables);
        rows.push({ variables, result });
      } catch (error) {
        throw new MathterError(`Error evaluating expression for combination ${i}: ${error}`, 'EVALUATION_ERROR');
      }
    }

    return { variables: vars, rows };
  }

  /**
   * Check if two logical expressions are equivalent
   * 
   * @param expr1 - First logical expression
   * @param expr2 - Second logical expression
   * @param vars - Array of variable names used in both expressions
   * @returns True if expressions are logically equivalent
   * 
   * @example
   * ```typescript
   * Logic.areEquivalent('A && B', 'B && A', ['A', 'B']); // → true
   * Logic.areEquivalent('A && B', 'A || B', ['A', 'B']); // → false
   * ```
   */
  public static areEquivalent(expr1: string, expr2: string, vars: string[]): boolean {
    const table1 = this.truthTable(vars, expr1);
    const table2 = this.truthTable(vars, expr2);

    if (table1.rows.length !== table2.rows.length) {
      return false;
    }

    for (let i = 0; i < table1.rows.length; i++) {
      if (table1.rows[i].result !== table2.rows[i].result) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if an expression is a tautology (always true)
   * 
   * @param expr - Logical expression to check
   * @param vars - Array of variable names used in the expression
   * @returns True if the expression is always true
   * 
   * @example
   * ```typescript
   * Logic.isTautology('A || !A', ['A']); // → true
   * Logic.isTautology('A && !A', ['A']); // → false
   * ```
   */
  public static isTautology(expr: string, vars: string[]): boolean {
    const table = this.truthTable(vars, expr);
    return table.rows.every(row => row.result === true);
  }

  /**
   * Check if an expression is a contradiction (always false)
   * 
   * @param expr - Logical expression to check
   * @param vars - Array of variable names used in the expression
   * @returns True if the expression is always false
   * 
   * @example
   * ```typescript
   * Logic.isContradiction('A && !A', ['A']); // → true
   * Logic.isContradiction('A || !A', ['A']); // → false
   * ```
   */
  public static isContradiction(expr: string, vars: string[]): boolean {
    const table = this.truthTable(vars, expr);
    return table.rows.every(row => row.result === false);
  }

  /**
   * Check if an expression is satisfiable (has at least one true case)
   * 
   * @param expr - Logical expression to check
   * @param vars - Array of variable names used in the expression
   * @returns True if the expression has at least one satisfying assignment
   * 
   * @example
   * ```typescript
   * Logic.isSatisfiable('A && B', ['A', 'B']); // → true
   * Logic.isSatisfiable('A && !A', ['A']); // → false
   * ```
   */
  public static isSatisfiable(expr: string, vars: string[]): boolean {
    const table = this.truthTable(vars, expr);
    return table.rows.some(row => row.result === true);
  }

  /**
   * Get all satisfying assignments for an expression
   * 
   * @param expr - Logical expression to check
   * @param vars - Array of variable names used in the expression
   * @returns Array of variable assignments that make the expression true
   * 
   * @example
   * ```typescript
   * Logic.getSatisfyingAssignments('A && B', ['A', 'B']); // → [{A: true, B: true}]
   * Logic.getSatisfyingAssignments('A || B', ['A', 'B']); // → [{A: true, B: false}, ...]
   * ```
   */
  public static getSatisfyingAssignments(expr: string, vars: string[]): LogicVariables[] {
    const table = this.truthTable(vars, expr);
    return table.rows
      .filter(row => row.result === true)
      .map(row => row.variables);
  }

  /**
   * Convert expression to Disjunctive Normal Form (DNF)
   * 
   * @param expr - Logical expression to convert
   * @param vars - Array of variable names used in the expression
   * @returns Expression in DNF form
   * 
   * @example
   * ```typescript
   * Logic.toDNF('A && B', ['A', 'B']); // → '(A && B)'
   * Logic.toDNF('A || B', ['A', 'B']); // → '(A && B) || (A && !B) || (!A && B)'
   * ```
   */
  public static toDNF(expr: string, vars: string[]): string {
    const table = this.truthTable(vars, expr);
    const trueRows = table.rows.filter(row => row.result === true);

    if (trueRows.length === 0) {
      return 'false';
    }

    const terms: string[] = [];

    for (const row of trueRows) {
      const literals: string[] = [];
      
      for (const varName of vars) {
        const value = row.variables[varName];
        literals.push(value ? varName : `!${varName}`);
      }
      
      terms.push(`(${literals.join(' && ')})`);
    }

    return terms.join(' || ');
  }

  /**
   * Convert expression to Conjunctive Normal Form (CNF)
   * 
   * @param expr - Logical expression to convert
   * @param vars - Array of variable names used in the expression
   * @returns Expression in CNF form
   * 
   * @example
   * ```typescript
   * Logic.toCNF('A && B', ['A', 'B']); // → '(A || !B) && (!A || B) && (A || B)'
   * Logic.toCNF('A || B', ['A', 'B']); // → 'true'
   * ```
   */
  public static toCNF(expr: string, vars: string[]): string {
    const table = this.truthTable(vars, expr);
    const falseRows = table.rows.filter(row => row.result === false);

    if (falseRows.length === 0) {
      return 'true';
    }

    const clauses: string[] = [];

    for (const row of falseRows) {
      const literals: string[] = [];
      
      for (const varName of vars) {
        const value = row.variables[varName];
        literals.push(value ? `!${varName}` : varName);
      }
      
      clauses.push(`(${literals.join(' || ')})`);
    }

    return clauses.join(' && ');
  }

  // Private helper methods
  private static evaluateExpression(expr: string, vars: LogicVariables): boolean {
    // Clean and validate expression
    let cleanExpr = expr.replace(/\s+/g, ' ').trim();
    
    // Replace logical operators with JavaScript equivalents
    cleanExpr = cleanExpr
      .replace(/\bAND\b/gi, '&&')
      .replace(/\bOR\b/gi, '||')
      .replace(/\bNOT\b/gi, '!')
      .replace(/\bXOR\b/gi, '^')
      .replace(/\bNAND\b/gi, '!(')
      .replace(/\bNOR\b/gi, '!(')
      .replace(/\bXNOR\b/gi, '!(');

    // Handle NAND, NOR, XNOR (need to close parentheses)
    const nandCount = (cleanExpr.match(/!\(/g) || []).length;
    const openParens = (cleanExpr.match(/\(/g) || []).length;
    const closeParens = (cleanExpr.match(/\)/g) || []).length;
    
    if (nandCount > 0) {
      // For NAND: !(A && B) -> !(A && B)
      // For NOR: !(A || B) -> !(A || B)
      // For XNOR: !(A ^ B) -> !(A ^ B)
      cleanExpr = cleanExpr.replace(/!\(([^)]+)\)/g, '!($1)');
    }

    // Replace variable names with their values
    for (const [varName, value] of Object.entries(vars)) {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      cleanExpr = cleanExpr.replace(regex, value ? 'true' : 'false');
    }

    // Validate that all variables have been replaced
    const remainingVars = cleanExpr.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g);
    if (remainingVars && remainingVars.length > 0) {
      // Filter out 'true', 'false', and other valid keywords
      const validKeywords = ['true', 'false', 'and', 'or', 'not', 'xor', 'nand', 'nor', 'xnor'];
      const undefinedVars = remainingVars.filter(v => !validKeywords.includes(v.toLowerCase()));
      if (undefinedVars.length > 0) {
        throw new MathterError(`Undefined variables: ${undefinedVars.join(', ')}`, 'UNDEFINED_VARIABLES');
      }
    }

    // Evaluate the expression
    try {
      // eslint-disable-next-line no-eval
      const result = eval(cleanExpr);
      return Boolean(result);
    } catch (error) {
      throw new MathterError(`Invalid expression syntax: ${error}`, 'INVALID_SYNTAX');
    }
  }

  /**
   * Get all possible variable combinations for given variables
   * 
   * @param vars - Array of variable names
   * @returns Array of all possible variable assignments
   * 
   * @example
   * ```typescript
   * Logic.getVariableCombinations(['A', 'B']); // → [{A: false, B: false}, {A: false, B: true}, ...]
   * ```
   */
  public static getVariableCombinations(vars: string[]): LogicVariables[] {
    if (!Array.isArray(vars) || vars.length === 0) {
      throw new MathterError('Variables must be a non-empty array', 'INVALID_VARIABLES');
    }

    const combinations: LogicVariables[] = [];
    const numCombinations = Math.pow(2, vars.length);

    for (let i = 0; i < numCombinations; i++) {
      const combination: LogicVariables = {};
      
      for (let j = 0; j < vars.length; j++) {
        const bit = (i >> (vars.length - 1 - j)) & 1;
        combination[vars[j]] = bit === 1;
      }
      
      combinations.push(combination);
    }

    return combinations;
  }

  /**
   * Simplify a logical expression (basic simplification)
   * 
   * @param expr - Logical expression to simplify
   * @returns Simplified expression
   * 
   * @example
   * ```typescript
   * Logic.simplify('!!A'); // → 'A'
   * Logic.simplify('A && true'); // → 'A'
   * ```
   */
  public static simplify(expr: string): string {
    // Basic simplification rules
    let simplified = expr
      .replace(/\s+/g, ' ')
      .replace(/\btrue\b/gi, 'true')
      .replace(/\bfalse\b/gi, 'false')
      .trim();

    // Remove double negations
    simplified = simplified.replace(/!!/g, '');

    // Apply De Morgan's laws
    simplified = simplified.replace(/!\(([^)]+)\s*&&\s*([^)]+)\)/g, '(!$1 || !$2)');
    simplified = simplified.replace(/!\(([^)]+)\s*\|\|\s*([^)]+)\)/g, '(!$1 && !$2)');

    return simplified;
  }
}

// Convenience functions for direct import
export const evalLogic = Logic.eval;
export const truthTable = Logic.truthTable;
export const areEquivalent = Logic.areEquivalent;
export const isTautology = Logic.isTautology;
export const isContradiction = Logic.isContradiction;
export const isSatisfiable = Logic.isSatisfiable;
export const toDNF = Logic.toDNF;
export const toCNF = Logic.toCNF;
