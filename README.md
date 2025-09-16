# @mirawision/mathter

A comprehensive and modular mathematical library for TypeScript, providing functionalities for unit conversion, number manipulation, geometry, statistics, combinatorics, and various mathematical operations. Built with full type safety and zero dependencies.

## Features

- **Unit Conversion**: Length, mass, temperature, speed, and angle conversions
- **Number Theory**: GCD, LCM, prime numbers, perfect squares/cubes, and number properties
- **Geometry**: Area, perimeter, volume calculations for 2D and 3D shapes
- **Statistics**: Mean, median, mode, standard deviation, correlation, and more
- **Combinatorics**: Factorials, permutations, combinations, and arrangements
- **Roman Numerals**: Convert between Arabic numbers and Roman numerals
- **Base Systems**: Convert between different number bases (binary, hex, etc.)
- **Boolean Logic**: Expression evaluation, truth tables, and logical operations
- **Mathematical Symbols**: Unicode symbol handling and text processing
- **TypeScript Support**: Full type safety with comprehensive TypeScript definitions
- **Zero Dependencies**: Lightweight with no external dependencies
- **Tree-shaking**: Modular architecture for optimal bundle sizes

## Installation

```bash
npm install @mirawision/mathter
```

or

```bash
yarn add @mirawision/mathter
```

## Basic Usage

```typescript
import { Mathter } from '@mirawision/mathter';

// Unit conversion
const temp = Mathter.Convert.temperature(100, 'C', 'F'); 
// → { value: 212, from: 'C', to: 'F', originalValue: 100 }

// Geometric calculations
const area = Mathter.Geometry.Area.circle(5); // → 78.54

// Percentages
const percent = Mathter.Number.Percent.fromXofY(20, 500); 
// → { value: 100, percentage: 20, originalValue: 500 }

// Roman numerals
const roman = Mathter.Roman.to(2025); // → "MMXXV"

// Statistics
const stdDev = Mathter.Stats.stdDev([1, 2, 3, 4, 5]); // → 1.58

// Logic
const result = Mathter.Logic.eval("A && !B", { A: true, B: false }); // → true
```

## Advanced Usage Examples

### Unit Conversion

```typescript
import { Mathter } from '@mirawision/mathter';

// Length conversion
const length = Mathter.Convert.lengthUnit(1, 'm', 'ft');
// → { value: 3.28084, from: 'm', to: 'ft', originalValue: 1 }

// Temperature conversion
const temp = Mathter.Convert.temperature(100, 'C', 'F');
// → { value: 212, from: 'C', to: 'F', originalValue: 100 }

// Mass conversion
const mass = Mathter.Convert.mass(1, 'kg', 'lb');
// → { value: 2.20462, from: 'kg', to: 'lb', originalValue: 1 }

// Speed conversion
const speed = Mathter.Convert.speed(10, 'm/s', 'mph');
// → { value: 22.3694, from: 'm/s', to: 'mph', originalValue: 10 }
```

### Number Theory and Prime Numbers

```typescript
import { Mathter } from '@mirawision/mathter';

// Number properties
const gcd = Mathter.Number.gcd(12, 18); // → 6
const lcm = Mathter.Number.lcm(4, 6); // → 12
const isEven = Mathter.Number.isEven(4); // → true
const isPerfectSquare = Mathter.Number.isPerfectSquare(16); // → true

// Prime numbers
const isPrime = Mathter.Number.Prime.is(17); // → true
const nextPrime = Mathter.Number.Prime.next(13); // → 17
const prevPrime = Mathter.Number.Prime.previous(17); // → 13
const factors = Mathter.Number.Prime.factors(60); // → { 2: 2, 3: 1, 5: 1 }

// Percentage calculations
const percent = Mathter.Number.Percent.fromXofY(20, 500);
// → { value: 100, percentage: 20, originalValue: 500 }

const increase = Mathter.Number.Percent.increase(100, 20);
// → { value: 120, percentage: 20, originalValue: 100 }

const change = Mathter.Number.Percent.change(100, 120);
// → { value: 120, percentage: 20, originalValue: 100 }
```

### Geometry Calculations

```typescript
import { Mathter } from '@mirawision/mathter';

// Area calculations
const circleArea = Mathter.Geometry.Area.circle(5); // → 78.54
const rectangleArea = Mathter.Geometry.Area.rectangle(4, 6); // → 24
const triangleArea = Mathter.Geometry.Area.triangle(3, 4, 90); // → 6
const trapezoidArea = Mathter.Geometry.Area.trapezoid(3, 7, 4); // → 20

// Volume calculations
const cubeVolume = Mathter.Geometry.Volume.cube(4); // → 64
const sphereVolume = Mathter.Geometry.Volume.sphere(3); // → 113.10
const cylinderVolume = Mathter.Geometry.Volume.cylinder(2, 5); // → 62.83
const coneVolume = Mathter.Geometry.Volume.cone(3, 4); // → 37.70

// Pythagorean theorem
const hypotenuse = Mathter.Geometry.Pythagoras.findHypotenuse(3, 4); // → 5
const leg = Mathter.Geometry.Pythagoras.findLeg(5, 3); // → 4
const isRight = Mathter.Geometry.Pythagoras.isRightTriangle(3, 4, 5); // → true

// Distance calculations
const distance2D = Mathter.Geometry.Distance.between2D(
  { x: 0, y: 0 }, 
  { x: 3, y: 4 }
); // → 5

const distance3D = Mathter.Geometry.Distance.between3D(
  { x: 0, y: 0, z: 0 }, 
  { x: 1, y: 1, z: 1 }
); // → 1.732

// Angle conversions
const radians = Mathter.Geometry.Angle.toRadians(180); // → 3.14159
const degrees = Mathter.Geometry.Angle.toDegrees(Math.PI); // → 180
```

### Statistics and Data Analysis

```typescript
import { Mathter } from '@mirawision/mathter';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Basic statistics
const mean = Mathter.Stats.mean(data); // → 5
const median = Mathter.Stats.median(data); // → 5
const mode = Mathter.Stats.mode([1, 2, 2, 3]); // → 2
const range = Mathter.Stats.range(data); // → 8
const stdDev = Mathter.Stats.stdDev(data); // → 2.58
const variance = Mathter.Stats.variance(data); // → 6.67

// Advanced statistics
const quartiles = Mathter.Stats.quartiles(data);
// → { q1: 2.5, q2: 5, q3: 7.5 }

const correlation = Mathter.Stats.correlation(
  [1, 2, 3, 4, 5], 
  [2, 4, 6, 8, 10]
); // → 1 (perfect positive correlation)

const zScore = Mathter.Stats.zScore(85, 80, 5); // → 1
const percentile = Mathter.Stats.percentile(data, 50); // → 5 (median)
```

### Combinatorics

```typescript
import { Mathter } from '@mirawision/mathter';

// Factorials and counts
const factorial = Mathter.Combinatorics.factorial(5); // → 120
const permCount = Mathter.Combinatorics.permutationsCount(5, 3); // → 60
const combCount = Mathter.Combinatorics.combinationsCount(5, 3); // → 10

// Generate arrangements
const permutations = Mathter.Combinatorics.permutations(['a', 'b', 'c'], 2);
// → [['a', 'b'], ['a', 'c'], ['b', 'a'], ['b', 'c'], ['c', 'a'], ['c', 'b']]

const combinations = Mathter.Combinatorics.combinations(['a', 'b', 'c'], 2);
// → [['a', 'b'], ['a', 'c'], ['b', 'c']]
```

### Roman Numerals

```typescript
import { Mathter } from '@mirawision/mathter';

// Convert to Roman numerals
const roman = Mathter.Roman.to(2025); // → "MMXXV"
const roman4 = Mathter.Roman.to(4); // → "IV"

// Convert from Roman numerals
const number = Mathter.Roman.from("MMXXV"); // → 2025
const number4 = Mathter.Roman.from("IV"); // → 4

// Validation
const isValid = Mathter.Roman.isRoman("MMXXV"); // → true
const isInvalid = Mathter.Roman.isRoman("INVALID"); // → false
```

### Base Number Systems

```typescript
import { Mathter } from '@mirawision/mathter';

// Base conversion
const binary = Mathter.Base.convert('10', 10, 2);
// → { value: '1010', fromBase: 10, toBase: 2, originalValue: '10' }

const hex = Mathter.Base.convert('FF', 16, 10);
// → { value: '255', fromBase: 16, toBase: 10, originalValue: 'FF' }

// Convenience methods
const toBinary = Mathter.Base.decimalToBinary(10); // → '1010'
const toDecimal = Mathter.Base.binaryToDecimal('1010'); // → 10
const toHex = Mathter.Base.decimalToHex(255); // → 'FF'
const fromHex = Mathter.Base.hexToDecimal('FF'); // → 255

// Validation
const isValidBinary = Mathter.Base.isValidInBase('1010', 2); // → true
const validDigits = Mathter.Base.getDigitsForBase(16); // → '0123456789ABCDEF'
```

### Boolean Logic

```typescript
import { Mathter } from '@mirawision/mathter';

// Expression evaluation
const result = Mathter.Logic.eval('A && !B', { A: true, B: false }); // → true
const result2 = Mathter.Logic.eval('A || B', { A: false, B: true }); // → true

// Truth tables
const truthTable = Mathter.Logic.truthTable(['A', 'B'], 'A && B');
// → { variables: ['A', 'B'], rows: [...] }

// Logical properties
const isTautology = Mathter.Logic.isTautology('A || !A', ['A']); // → true
const isContradiction = Mathter.Logic.isContradiction('A && !A', ['A']); // → true
const isSatisfiable = Mathter.Logic.isSatisfiable('A && B', ['A', 'B']); // → true

// Expression equivalence
const areEquivalent = Mathter.Logic.areEquivalent('A && B', 'B && A', ['A', 'B']); // → true

// Normal forms
const dnf = Mathter.Logic.toDNF('A || B', ['A', 'B']);
// → '(A && B) || (A && !B) || (!A && B)'

const cnf = Mathter.Logic.toCNF('A && B', ['A', 'B']);
// → '(A || !B) && (!A || B) && (A || B)'

// Simplification
const simplified = Mathter.Logic.simplify('!!A'); // → 'A'
```

### Mathematical Symbols

```typescript
import { Mathter } from '@mirawision/mathter';

// Get symbols by name
const pi = Mathter.Symbol.getSymbol('pi'); // → 'π'
const sqrt = Mathter.Symbol.getSymbol('sqrt'); // → '√'
const infinity = Mathter.Symbol.getSymbol('infinity'); // → '∞'

// Get symbol name by symbol
const name = Mathter.Symbol.getSymbolName('π'); // → 'pi'
const name2 = Mathter.Symbol.getSymbolName('√'); // → 'sqrt'

// Replace text with symbols
const text = Mathter.Symbol.replaceInText('The value of pi is 3.14');
// → 'The value of π is 3.14'

const text2 = Mathter.Symbol.replaceInText('sqrt of 16 equals 4');
// → '√ of 16 equals 4'
```

## 🔧 Modules

### 🔁 Convert - Unit Conversion
- `Convert.lengthUnit(value, from, to)` — length conversion
- `Convert.mass(value, from, to)` — mass conversion
- `Convert.temperature(value, from, to)` — temperature conversion
- `Convert.speed(value, from, to)` — speed conversion

### 🏛️ Roman - Roman Numerals
- `Roman.to(n)` — converts number to Roman notation
- `Roman.from(str)` — Roman notation → number
- `Roman.isRoman(str)` — checks if string is Roman

### 🔣 Symbol - Mathematical Symbols
- `Symbol.getSymbol(name)` — by name (e.g., `"pi"` → `π`)
- `Symbol.getSymbolName(symbol)` — by symbol (`"√"` → `"sqrt"`)
- `Symbol.replaceInText(text)` — replaces keywords in string with symbols

### 🔢 Base - Number Systems
- `Base.convert(value, from, to)` — conversion between number systems
- `Base.decimalToBinary(n)` — decimal → binary
- `Base.binaryToDecimal(binary)` — binary → decimal
- `Base.decimalToHex(n)` — decimal → hexadecimal
- `Base.hexToDecimal(hex)` — hexadecimal → decimal
- `Base.isValidInBase(value, base)` — validate value in given base
- `Base.getDigitsForBase(base)` — get valid digits for base

### 🔢 Number - Number Utilities and Percentages
- `Number.gcd(a, b)` — greatest common divisor (GCD)
- `Number.lcm(a, b)` — least common multiple (LCM)
- `Number.isEven(n)` — even number check
- `Number.isOdd(n)` — odd number check
- `Number.roundTo(n, digits)` — rounding to specified decimal places
- `Number.isPerfectSquare(n)` — perfect square check
- `Number.isPerfectCube(n)` — perfect cube check
- `Number.Percent.fromXofY(x, y)` — x% of y
- `Number.Percent.increase(v, p)` — increase by p%
- `Number.Percent.decrease(v, p)` — decrease by p%
- `Number.Percent.change(a, b)` — change from a to b in %
- `Number.Prime.is(n)` — prime number check
- `Number.Prime.next(n)` — next prime number
- `Number.Prime.previous(n)` — previous prime number
- `Number.Prime.factors(n)` — prime factorization

### 🎲 Combinatorics - Combinatorics
- `Combinatorics.factorial(n)` — factorial `n!`
- `Combinatorics.permutationsCount(n, r?)` — permutations count `P(n)` or `P(n, r)`
- `Combinatorics.combinationsCount(n, r)` — combinations count `C(n, r)`
- `Combinatorics.permutations(arr, r?)` — generate all permutations
- `Combinatorics.combinations(arr, r)` — generate all combinations


### 📐 Geometry - Geometric Calculations
- `Geometry.Area.circle(r)` — circle area
- `Geometry.Area.square(a)` — square area
- `Geometry.Area.rectangle(a, b)` — rectangle area
- `Geometry.Area.triangle(a, b, angleDeg)` — triangle area
- `Geometry.Area.trapezoid(a, b, height)` — trapezoid area
- `Geometry.Perimeter.circle(r)` — circle perimeter
- `Geometry.Perimeter.square(a)` — square perimeter
- `Geometry.Perimeter.rectangle(a, b)` — rectangle perimeter
- `Geometry.Perimeter.triangle(a, b, c)` — triangle perimeter
- `Geometry.Volume.cube(a)` — cube volume
- `Geometry.Volume.sphere(r)` — sphere volume
- `Geometry.Volume.cylinder(r, h)` — cylinder volume
- `Geometry.Volume.rectangularPrism(w, h, d)` — rectangular prism volume
- `Geometry.Volume.cone(r, h)` — cone volume
- `Geometry.Pythagoras.findHypotenuse(a, b)` — hypotenuse
- `Geometry.Pythagoras.findLeg(c, b)` — leg
- `Geometry.Pythagoras.isRightTriangle(a, b, c)` — right triangle check
- `Geometry.Distance.between2D(p1, p2)` — 2D distance
- `Geometry.Distance.between3D(p1, p2)` — 3D distance
- `Geometry.Distance.pointToLine(point, lineStart, lineEnd)` — point to line distance
- `Geometry.Angle.toRadians(degrees)` — degrees to radians
- `Geometry.Angle.toDegrees(radians)` — radians to degrees
- `Geometry.Angle.betweenVectors2D(v1, v2)` — angle between 2D vectors

### 📊 Stats - Statistics
- `Stats.mean(arr)` — mean
- `Stats.median(arr)` — median
- `Stats.mode(arr)` — mode
- `Stats.range(arr)` — range
- `Stats.stdDev(arr)` — standard deviation
- `Stats.variance(arr)` — variance
- `Stats.sum(arr)` — sum
- `Stats.product(arr)` — product
- `Stats.min(arr)` — minimum
- `Stats.max(arr)` — maximum
- `Stats.quartiles(arr)` — quartiles (Q1, Q2, Q3)
- `Stats.correlation(x, y)` — correlation coefficient
- `Stats.zScore(value, mean, stdDev)` — z-score
- `Stats.percentileRank(arr, value)` — percentile rank
- `Stats.percentile(arr, rank)` — percentile value

### 🔧 Logic - Boolean Logic and Truth Tables
- `Logic.eval(expr, vars)` — evaluates logical expression with values
- `Logic.truthTable(vars, expr)` — generates truth table
- `Logic.areEquivalent(expr1, expr2, vars)` — check expression equivalence
- `Logic.isTautology(expr, vars)` — check if expression is tautology
- `Logic.isContradiction(expr, vars)` — check if expression is contradiction
- `Logic.isSatisfiable(expr, vars)` — check if expression is satisfiable
- `Logic.getSatisfyingAssignments(expr, vars)` — get satisfying assignments
- `Logic.toDNF(expr, vars)` — convert to Disjunctive Normal Form
- `Logic.toCNF(expr, vars)` — convert to Conjunctive Normal Form
- `Logic.simplify(expr)` — simplify logical expression

## TypeScript Support

This library is built with TypeScript and provides comprehensive type definitions:

```typescript
import { 
  Mathter, 
  LengthUnit, 
  MassUnit, 
  TemperatureUnit, 
  SpeedUnit,
  ConversionResult,
  PercentResult,
  LogicVariables,
  TruthTable
} from '@mirawision/mathter';

// All functions are fully typed
const result: ConversionResult = Mathter.Convert.temperature(100, 'C', 'F');
const percent: PercentResult = Mathter.Number.Percent.fromXofY(20, 500);
const logic: boolean = Mathter.Logic.eval('A && B', { A: true, B: false });
```

## Error Handling

The library provides comprehensive error handling with custom error types:

```typescript
import { Mathter, MathterError } from '@mirawision/mathter';

try {
  const result = Mathter.Convert.temperature(-100, 'C', 'F');
} catch (error) {
  if (error instanceof MathterError) {
    console.log(`Mathter Error: ${error.message} (Code: ${error.code})`);
  }
}
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Credits

This library is built with ❤️ for the mathematical community, providing a comprehensive toolkit for mathematical operations in TypeScript.