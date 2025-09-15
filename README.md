# Mathter

**Modular mathematical library for educational and utility tasks**

[![npm version](https://badge.fury.io/js/%40mathter%2Fcore.svg)](https://badge.fury.io/js/%40mathter%2Fcore)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/mathter/mathter)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/mathter/mathter)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Installation

```bash
npm install @mathter/core
```

## 📖 Usage

```javascript
import { Mathter } from '@mathter/core';

// Temperature conversion
const temp = Mathter.Convert.Temperature('C', 'F', 100); // → 212

// Geometric calculations
const area = Mathter.Geometry.Area.Circle(5); // → 78.54

// Percentages
const percent = Mathter.Number.Percent.FromXofY(20, 500); // → 100

// Roman numerals
const roman = Mathter.Roman.To(2025); // → "MMXXV"

// Statistics
const stdDev = Mathter.Stats.StdDev([1, 2, 3, 4, 5]); // → 1.41

// Logic
const result = Mathter.Logic.Eval("A && !B", { A: true, B: false }); // → true
```

## 🔧 Modules

### 🔁 Convert - Unit Conversion
- `Convert.Length(from, to, value)` — length conversion
- `Convert.Mass(from, to, value)` — mass conversion
- `Convert.Temperature(from, to, value)` — temperature conversion
- `Convert.Speed(from, to, value)` — speed conversion
- `Convert.Angle.ToRadians(degrees)` — degrees → radians
- `Convert.Angle.ToDegrees(radians)` — radians → degrees

### 🏛️ Roman - Roman Numerals
- `Roman.To(n)` — converts number to Roman notation
- `Roman.From(str)` — Roman notation → number
- `Roman.IsRoman(str)` — checks if string is Roman

### 🔣 Symbol - Mathematical Symbols
- `Symbol.Get(name)` — by name (e.g., `"pi"` → `π`)
- `Symbol.Name(symbol)` — by symbol (`"√"` → `"sqrt"`)
- `Symbol.ReplaceInText(text)` — replaces keywords in string with symbols

### 🔢 Base - Number Systems
- `Base.Convert(value, from, to)` — conversion between number systems
- `Base.DecimalToBinary(n)` — decimal → binary
- `Base.BinaryToDecimal(binary)` — binary → decimal

### 🔢 Number - Number Utilities and Percentages
- `Number.GCD(a, b)` — greatest common divisor (GCD)
- `Number.LCM(a, b)` — least common multiple (LCM)
- `Number.IsEven(n)` — even number check
- `Number.IsOdd(n)` — odd number check
- `Number.RoundTo(n, digits)` — rounding to specified decimal places
- `Number.Percent.FromXofY(x, y)` — x% of y
- `Number.Percent.Increase(v, p)` — increase by p%
- `Number.Percent.Decrease(v, p)` — decrease by p%
- `Number.Percent.Change(a, b)` — change from a to b in %

### 🎲 Combinatorics - Combinatorics
- `Combinatorics.Factorial(n)` — factorial `n!`
- `Combinatorics.Permutations(n, r?)` — permutations `P(n)` or `P(n, r)`
- `Combinatorics.Combinations(n, r)` — combinations `C(n, r)`

### 🔍 Prime - Prime Numbers
- `Prime.Is(n)` — is number prime
- `Prime.Next(n)` — next prime number
- `Prime.Factors(n)` — prime factorization

### 📐 Geometry - Geometric Calculations
- `Geometry.Area.Circle(r)` — circle area
- `Geometry.Area.Square(a)` — square area
- `Geometry.Area.Rectangle(a, b)` — rectangle area
- `Geometry.Area.Triangle(a, b, angleDeg)` — triangle area
- `Geometry.Perimeter.Circle(r)` — circle perimeter
- `Geometry.Perimeter.Square(a)` — square perimeter
- `Geometry.Perimeter.Rectangle(a, b)` — rectangle perimeter
- `Geometry.Volume.Cube(a)` — cube volume
- `Geometry.Volume.Sphere(r)` — sphere volume
- `Geometry.Volume.Cylinder(r, h)` — cylinder volume
- `Geometry.Pythagoras.FindHypotenuse(a, b)` — hypotenuse
- `Geometry.Pythagoras.FindLeg(c, b)` — leg

### 📊 Stats - Simple Statistics
- `Stats.Mean(arr)` — mean
- `Stats.Median(arr)` — median
- `Stats.Mode(arr)` — mode
- `Stats.Range(arr)` — range
- `Stats.StdDev(arr)` — standard deviation

### 🔧 Logic - Boolean Logic and Truth Tables
- `Logic.Eval(expr, vars)` — evaluates logical expression with values
- `Logic.TruthTable(vars, expr)` — generates truth table

## 🧪 Testing

```bash
npm test
```

## 📦 Build

```bash
npm run build
```

## 📚 Documentation

Complete documentation is available in the `docs/` folder. To run the demo site:

```bash
cd docs
npm install
npm start
```

## 🏗️ Architecture

- **TypeScript First** - full type safety
- **Tree-shaking** - modular architecture
- **Zero Dependencies** - no external dependencies
- **Modern ES2017** - modern JavaScript
- **Comprehensive Testing** - full test coverage
- **Error Handling** - error handling

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🤝 Contributing

Any contributions are welcome! Please create issues and pull requests.

## 📞 Support

If you have questions or suggestions, create an issue in the repository.

---

**Created with ❤️ for the mathematical community**