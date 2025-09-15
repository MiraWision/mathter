import { Logic } from '../src/logic';

describe('Logic Module', () => {
  describe('Expression evaluation', () => {
    test('should evaluate simple expressions', () => {
      expect(Logic.Eval('A && B', { A: true, B: true })).toBe(true);
      expect(Logic.Eval('A && B', { A: true, B: false })).toBe(false);
      expect(Logic.Eval('A || B', { A: false, B: true })).toBe(true);
    });

    test('should evaluate complex expressions', () => {
      expect(Logic.Eval('A && (B || C)', { A: true, B: false, C: true })).toBe(true);
      expect(Logic.Eval('!A && B', { A: false, B: true })).toBe(true);
    });

    test('should handle different operator formats', () => {
      expect(Logic.Eval('A AND B', { A: true, B: true })).toBe(true);
      expect(Logic.Eval('A OR B', { A: false, B: true })).toBe(true);
      expect(Logic.Eval('NOT A', { A: false })).toBe(true);
    });
  });

  describe('Truth table generation', () => {
    test('should generate truth table for single variable', () => {
      const table = Logic.TruthTable(['A'], 'A');
      expect(table.rows).toHaveLength(2);
      expect(table.rows[0].variables.A).toBe(false);
      expect(table.rows[0].result).toBe(false);
      expect(table.rows[1].variables.A).toBe(true);
      expect(table.rows[1].result).toBe(true);
    });

    test('should generate truth table for two variables', () => {
      const table = Logic.TruthTable(['A', 'B'], 'A && B');
      expect(table.rows).toHaveLength(4);
    });
  });

  describe('Equivalence checking', () => {
    test('should check if expressions are equivalent', () => {
      expect(Logic.AreEquivalent('A && B', 'B && A', ['A', 'B'])).toBe(true);
      expect(Logic.AreEquivalent('A && B', 'A || B', ['A', 'B'])).toBe(false);
    });
  });

  describe('Tautology and contradiction checks', () => {
    test('should identify tautologies', () => {
      expect(Logic.IsTautology('A || !A', ['A'])).toBe(true);
      expect(Logic.IsTautology('A && !A', ['A'])).toBe(false);
    });

    test('should identify contradictions', () => {
      expect(Logic.IsContradiction('A && !A', ['A'])).toBe(true);
      expect(Logic.IsContradiction('A || !A', ['A'])).toBe(false);
    });

    test('should check satisfiability', () => {
      expect(Logic.IsSatisfiable('A && B', ['A', 'B'])).toBe(true);
      expect(Logic.IsSatisfiable('A && !A', ['A'])).toBe(false);
    });
  });

  describe('Normal forms', () => {
    test('should convert to DNF', () => {
      const dnf = Logic.ToDNF('A && B', ['A', 'B']);
      expect(dnf).toContain('A && B');
    });

    test('should convert to CNF', () => {
      const cnf = Logic.ToCNF('A || B', ['A', 'B']);
      expect(cnf).toContain('A || B');
    });
  });

  describe('Variable combinations', () => {
    test('should generate all variable combinations', () => {
      const combs = Logic.GetVariableCombinations(['A', 'B']);
      expect(combs).toHaveLength(4);
      expect(combs[0]).toEqual({ A: false, B: false });
      expect(combs[3]).toEqual({ A: true, B: true });
    });
  });

  describe('Expression simplification', () => {
    test('should simplify expressions', () => {
      const simplified = Logic.Simplify('!!A');
      expect(simplified).toBe('A');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid expression', () => {
      expect(() => Logic.Eval('', { A: true })).toThrow('Expression must be a non-empty string');
    });

    test('should throw error for invalid variables', () => {
      expect(() => Logic.Eval('A', null as any)).toThrow('Variables must be an object');
    });
  });
});
