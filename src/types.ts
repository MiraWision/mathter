// Unit types for conversion
export type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';
export type MassUnit = 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 't';
export type TemperatureUnit = 'C' | 'F' | 'K';
export type SpeedUnit = 'm/s' | 'km/h' | 'mph' | 'ft/s' | 'knot';

// Base conversion types
export type BaseSystem = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | 32 | 36;

// Roman numeral types
export type RomanSymbol = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';
export type RomanValue = 1 | 5 | 10 | 50 | 100 | 500 | 1000;

// Mathematical symbol types
export type MathSymbolName = 
  | 'pi' | 'e' | 'infinity' | 'sqrt' | 'sum' | 'product' | 'integral'
  | 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'theta' | 'lambda'
  | 'mu' | 'sigma' | 'phi' | 'omega' | 'plus' | 'minus' | 'times' | 'divide'
  | 'equals' | 'not-equals' | 'less' | 'greater' | 'less-equal' | 'greater-equal'
  | 'plus-minus' | 'infinity' | 'empty-set' | 'union' | 'intersection'
  | 'subset' | 'superset' | 'element' | 'not-element' | 'therefore' | 'because';

// Geometry types
export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

export interface Circle {
  radius: number;
  center?: Point2D;
}

export interface Rectangle {
  width: number;
  height: number;
  center?: Point2D;
}

export interface Triangle {
  a: number;
  b: number;
  c: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
}

// Statistics types
export interface StatsResult {
  mean: number;
  median: number;
  mode: number | number[];
  range: number;
  standardDeviation: number;
  variance: number;
}

// Logic types
export interface LogicVariables {
  [key: string]: boolean;
}

export interface TruthTableRow {
  variables: LogicVariables;
  result: boolean;
}

export interface TruthTable {
  variables: string[];
  rows: TruthTableRow[];
}

// Number utility types
export interface PercentResult {
  value: number;
  percentage: number;
  originalValue: number;
}

// Prime number types
export interface PrimeFactors {
  [prime: number]: number;
}

// Combinatorics types
export interface PermutationResult {
  count: number;
  permutations?: string[][];
}

export interface CombinationResult {
  count: number;
  combinations?: string[][];
}

// Error types
export class MathterError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'MathterError';
  }
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Conversion result types
export interface ConversionResult {
  value: number;
  from: string;
  to: string;
  originalValue: number;
}

// Base conversion types
export interface BaseConversionResult {
  value: string;
  fromBase: number;
  toBase: number;
  originalValue: string;
}
