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
const temp = Mathter.Convert.temperature('C', 'F', 100); // → 212

// Geometric calculations
const area = Mathter.Geometry.Area.circle(5); // → 78.54

// Percentages
const percent = Mathter.Number.Percent.fromXofY(20, 500); // → 100

// Roman numerals
const roman = Mathter.Roman.to(2025); // → "MMXXV"

// Statistics
const stdDev = Mathter.Stats.stdDev([1, 2, 3, 4, 5]); // → 1.41

// Logic
const result = Mathter.Logic.eval("A && !B", { A: true, B: false }); // → true
```

## 🔧 Modules

### 🔁 Convert - Unit Conversion
- `Convert.length(from, to, value)` — length conversion
- `Convert.mass(from, to, value)` — mass conversion
- `Convert.temperature(from, to, value)` — temperature conversion
- `Convert.speed(from, to, value)` — speed conversion
- `Convert.Angle.toRadians(degrees)` — degrees → radians
- `Convert.Angle.toDegrees(radians)` — radians → degrees

### 🏛️ Roman - Roman Numerals
- `Roman.to(n)` — converts number to Roman notation
- `Roman.from(str)` — Roman notation → number
- `Roman.isRoman(str)` — checks if string is Roman

### 🔣 Symbol - Mathematical Symbols
- `Symbol.get(name)` — by name (e.g., `"pi"` → `π`)
- `Symbol.name(symbol)` — by symbol (`"√"` → `"sqrt"`)
- `Symbol.replaceInText(text)` — replaces keywords in string with symbols

### 🔢 Base - Number Systems
- `Base.convert(value, from, to)` — conversion between number systems
- `Base.decimalToBinary(n)` — decimal → binary
- `Base.binaryToDecimal(binary)` — binary → decimal

### 🔢 Number - Number Utilities and Percentages
- `Number.gcd(a, b)` — greatest common divisor (GCD)
- `Number.lcm(a, b)` — least common multiple (LCM)
- `Number.isEven(n)` — even number check
- `Number.isOdd(n)` — odd number check
- `Number.roundTo(n, digits)` — rounding to specified decimal places
- `Number.Percent.fromXofY(x, y)` — x% of y
- `Number.Percent.increase(v, p)` — increase by p%
- `Number.Percent.decrease(v, p)` — decrease by p%
- `Number.Percent.change(a, b)` — change from a to b in %

### 🎲 Combinatorics - Combinatorics
- `Combinatorics.factorial(n)` — factorial `n!`
- `Combinatorics.permutations(n, r?)` — permutations `P(n)` or `P(n, r)`
- `Combinatorics.combinations(n, r)` — combinations `C(n, r)`

### 🔍 Prime - Prime Numbers
- `Prime.is(n)` — is number prime
- `Prime.next(n)` — next prime number
- `Prime.factors(n)` — prime factorization

### 📐 Geometry - Geometric Calculations
- `Geometry.Area.circle(r)` — circle area
- `Geometry.Area.square(a)` — square area
- `Geometry.Area.rectangle(a, b)` — rectangle area
- `Geometry.Area.triangle(a, b, angleDeg)` — triangle area
- `Geometry.Perimeter.circle(r)` — circle perimeter
- `Geometry.Perimeter.square(a)` — square perimeter
- `Geometry.Perimeter.rectangle(a, b)` — rectangle perimeter
- `Geometry.Volume.cube(a)` — cube volume
- `Geometry.Volume.sphere(r)` — sphere volume
- `Geometry.Volume.cylinder(r, h)` — cylinder volume
- `Geometry.Pythagoras.findHypotenuse(a, b)` — hypotenuse
- `Geometry.Pythagoras.findLeg(c, b)` — leg

### 📊 Stats - Simple Statistics
- `Stats.mean(arr)` — mean
- `Stats.median(arr)` — median
- `Stats.mode(arr)` — mode
- `Stats.range(arr)` — range
- `Stats.stdDev(arr)` — standard deviation

### 🔧 Logic - Boolean Logic and Truth Tables
- `Logic.eval(expr, vars)` — evaluates logical expression with values
- `Logic.truthTable(vars, expr)` — generates truth table

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