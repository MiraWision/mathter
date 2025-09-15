// Main Mathter library exports
export * from './types';

// Core modules
export * from './convert';
export * from './roman';
export * from './symbol';
export * from './base';
export * from './number';
export * from './combinatorics';
export * from './prime';
export * from './geometry';
export * from './stats';
export * from './logic';

// Re-export main classes for convenience
export { Convert } from './convert';
export { Roman } from './roman';
export { Symbol } from './symbol';
export { Base } from './base';
export { Number as MathNumber } from './number';
export { Combinatorics } from './combinatorics';
export { Prime } from './prime';
export { Geometry } from './geometry';
export { Stats } from './stats';
export { Logic } from './logic';

// Import classes for namespace
import { Convert } from './convert';
import { Roman } from './roman';
import { Symbol } from './symbol';
import { Base } from './base';
import { Number as MathNumber } from './number';
import { Combinatorics } from './combinatorics';
import { Prime } from './prime';
import { Geometry } from './geometry';
import { Stats } from './stats';
import { Logic } from './logic';

// Main Mathter namespace
export class Mathter {
  static Convert = Convert;
  static Roman = Roman;
  static Symbol = Symbol;
  static Base = Base;
  static Number = MathNumber;
  static Combinatorics = Combinatorics;
  static Prime = Prime;
  static Geometry = Geometry;
  static Stats = Stats;
  static Logic = Logic;
}

// Default export
export default Mathter;
