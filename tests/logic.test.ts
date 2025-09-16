import { Logic } from '../src/logic';

describe('Logic Module', () => {
  describe('Expression evaluation', () => {
    test('should evaluate simple expressions', () => {
      expect(Logic.eval('A && B', { A: true, B: true })).toBe(true);
      expect(Logic.eval('A && B', { A: true, B: false })).toBe(false);
      expect(Logic.eval('A || B', { A: false, B: true })).toBe(true);
    });

    test('should evaluate complex expressions', () => {
      expect(Logic.eval('A && (B || C)', { A: true, B: false, C: true })).toBe(true);
      expect(Logic.eval('!A && B', { A: false, B: true })).toBe(true);
    });

    test('should handle different operator formats', () => {
      expect(Logic.eval('A AND B', { A: true, B: true })).toBe(true);
      expect(Logic.eval('A OR B', { A: false, B: true })).toBe(true);
      expect(Logic.eval('NOT A', { A: false })).toBe(true);
    });
  });

  describe('Truth table generation', () => {
    test('should generate truth table for single variable', () => {
      const table = Logic.truthTable(['A'], 'A');
      expect(table.rows).toHaveLength(2);
      expect(table.rows[0].variables.A).toBe(false);
      expect(table.rows[0].result).toBe(false);
      expect(table.rows[1].variables.A).toBe(true);
      expect(table.rows[1].result).toBe(true);
    });

    test('should generate truth table for two variables', () => {
      const table = Logic.truthTable(['A', 'B'], 'A && B');
      expect(table.rows).toHaveLength(4);
    });
  });

  describe('Equivalence checking', () => {
    test('should check if expressions are equivalent', () => {
      expect(Logic.areEquivalent('A && B', 'B && A', ['A', 'B'])).toBe(true);
      expect(Logic.areEquivalent('A && B', 'A || B', ['A', 'B'])).toBe(false);
    });
  });

  describe('Tautology and contradiction checks', () => {
    test('should identify tautologies', () => {
      expect(Logic.isTautology('A || !A', ['A'])).toBe(true);
      expect(Logic.isTautology('A && !A', ['A'])).toBe(false);
    });

    test('should identify contradictions', () => {
      expect(Logic.isContradiction('A && !A', ['A'])).toBe(true);
      expect(Logic.isContradiction('A || !A', ['A'])).toBe(false);
    });

    test('should check satisfiability', () => {
      expect(Logic.isSatisfiable('A && B', ['A', 'B'])).toBe(true);
      expect(Logic.isSatisfiable('A && !A', ['A'])).toBe(false);
    });
  });

  describe('Normal forms', () => {
    test('should convert to DNF', () => {
      const dnf = Logic.toDNF('A && B', ['A', 'B']);
      expect(dnf).toContain('A && B');
    });

    test('should convert to CNF', () => {
      const cnf = Logic.toCNF('A || B', ['A', 'B']);
      expect(cnf).toContain('A || B');
    });
  });

  describe('Variable combinations', () => {
    test('should generate all variable combinations', () => {
      const combs = Logic.getVariableCombinations(['A', 'B']);
      expect(combs).toHaveLength(4);
      expect(combs[0]).toEqual({ A: false, B: false });
      expect(combs[3]).toEqual({ A: true, B: true });
    });
  });

  describe('Expression simplification', () => {
    test('should simplify expressions', () => {
      const simplified = Logic.simplify('!!A');
      expect(simplified).toBe('A');
    });
  });

  describe('Error handling', () => {
    test('should throw error for invalid expression', () => {
      expect(() => Logic.eval('', { A: true })).toThrow('Expression must be a non-empty string');
    });

    test('should throw error for invalid variables', () => {
      expect(() => Logic.eval('A', null as any)).toThrow('Variables must be an object');
    });
  });
});
