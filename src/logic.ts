import { LogicVariables, TruthTable, TruthTableRow, MathterError } from './types';

export class Logic {
  /**
   * Evaluate a logical expression with given variables
   */
  static Eval(expr: string, vars: LogicVariables): boolean {
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
   */
  static TruthTable(vars: string[], expr: string): TruthTable {
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
   */
  static AreEquivalent(expr1: string, expr2: string, vars: string[]): boolean {
    const table1 = this.TruthTable(vars, expr1);
    const table2 = this.TruthTable(vars, expr2);

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
   */
  static IsTautology(expr: string, vars: string[]): boolean {
    const table = this.TruthTable(vars, expr);
    return table.rows.every(row => row.result === true);
  }

  /**
   * Check if an expression is a contradiction (always false)
   */
  static IsContradiction(expr: string, vars: string[]): boolean {
    const table = this.TruthTable(vars, expr);
    return table.rows.every(row => row.result === false);
  }

  /**
   * Check if an expression is satisfiable (has at least one true case)
   */
  static IsSatisfiable(expr: string, vars: string[]): boolean {
    const table = this.TruthTable(vars, expr);
    return table.rows.some(row => row.result === true);
  }

  /**
   * Get all satisfying assignments for an expression
   */
  static GetSatisfyingAssignments(expr: string, vars: string[]): LogicVariables[] {
    const table = this.TruthTable(vars, expr);
    return table.rows
      .filter(row => row.result === true)
      .map(row => row.variables);
  }

  /**
   * Convert expression to Disjunctive Normal Form (DNF)
   */
  static ToDNF(expr: string, vars: string[]): string {
    const table = this.TruthTable(vars, expr);
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
   */
  static ToCNF(expr: string, vars: string[]): string {
    const table = this.TruthTable(vars, expr);
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
  static evaluateExpression(expr: string, vars: LogicVariables): boolean {
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
   */
  static GetVariableCombinations(vars: string[]): LogicVariables[] {
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
   */
  static Simplify(expr: string): string {
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
export const evalLogic = Logic.Eval;
export const truthTable = Logic.TruthTable;
export const areEquivalent = Logic.AreEquivalent;
export const isTautology = Logic.IsTautology;
export const isContradiction = Logic.IsContradiction;
export const isSatisfiable = Logic.IsSatisfiable;
export const toDNF = Logic.ToDNF;
export const toCNF = Logic.ToCNF;
