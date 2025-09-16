import { LengthUnit, MassUnit, TemperatureUnit, SpeedUnit, ConversionResult, MathterError } from './types';

// Conversion factors relative to base units
const LENGTH_FACTORS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344
};

const MASS_FACTORS: Record<MassUnit, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  oz: 0.0283495,
  lb: 0.453592,
  t: 1000
};

const SPEED_FACTORS: Record<SpeedUnit, number> = {
  'm/s': 1,
  'km/h': 0.277778,
  'mph': 0.44704,
  'ft/s': 0.3048,
  'knot': 0.514444
};

/**
 * Unit conversion utilities for various measurement systems
 * 
 * Provides methods to convert between different units of length, mass,
 * temperature, speed, and angle measurements.
 * 
 * @example
 * ```typescript
 * // Length conversion
 * Convert.lengthUnit(1, 'm', 'ft'); // → { value: 3.28084, from: 'm', to: 'ft', originalValue: 1 }
 * 
 * // Temperature conversion
 * Convert.temperature(100, 'C', 'F'); // → { value: 212, from: 'C', to: 'F', originalValue: 100 }
 * ```
 */
export class Convert {
  /**
   * Convert length between different units
   * 
   * @param value - Value to convert
   * @param from - Source length unit
   * @param to - Target length unit
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.lengthUnit(1, 'm', 'ft'); // → { value: 3.28084, from: 'm', to: 'ft', originalValue: 1 }
   * Convert.lengthUnit(1, 'km', 'mi'); // → { value: 0.621371, from: 'km', to: 'mi', originalValue: 1 }
   * ```
   */
  public static lengthUnit(value: number, from: LengthUnit, to: LengthUnit): ConversionResult {
    if (value < 0) {
      throw new MathterError('Length value cannot be negative', 'NEGATIVE_VALUE');
    }

    const baseValue = value * LENGTH_FACTORS[from];
    const result = baseValue / LENGTH_FACTORS[to];

    return {
      value: result,
      from,
      to,
      originalValue: value
    };
  }

  /**
   * Convert mass between different units
   * 
   * @param value - Value to convert
   * @param from - Source mass unit
   * @param to - Target mass unit
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.mass(1, 'kg', 'lb'); // → { value: 2.20462, from: 'kg', to: 'lb', originalValue: 1 }
   * Convert.mass(100, 'g', 'oz'); // → { value: 3.5274, from: 'g', to: 'oz', originalValue: 100 }
   * ```
   */
  public static mass(value: number, from: MassUnit, to: MassUnit): ConversionResult {
    if (value < 0) {
      throw new MathterError('Mass value cannot be negative', 'NEGATIVE_VALUE');
    }

    const baseValue = value * MASS_FACTORS[from];
    const result = baseValue / MASS_FACTORS[to];

    return {
      value: result,
      from,
      to,
      originalValue: value
    };
  }

  /**
   * Convert temperature between different units
   * 
   * @param value - Temperature value to convert
   * @param from - Source temperature unit ('C', 'F', or 'K')
   * @param to - Target temperature unit ('C', 'F', or 'K')
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When unit is not supported
   * 
   * @example
   * ```typescript
   * Convert.temperature(100, 'C', 'F'); // → { value: 212, from: 'C', to: 'F', originalValue: 100 }
   * Convert.temperature(32, 'F', 'K'); // → { value: 273.15, from: 'F', to: 'K', originalValue: 32 }
   * ```
   */
  public static temperature(value: number, from: TemperatureUnit, to: TemperatureUnit): ConversionResult {
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case 'C':
        celsius = value;
        break;
      case 'F':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'K':
        celsius = value - 273.15;
        break;
      default:
        throw new MathterError(`Unsupported temperature unit: ${from}`, 'INVALID_UNIT');
    }

    // Convert from Celsius to target unit
    let result: number;
    switch (to) {
      case 'C':
        result = celsius;
        break;
      case 'F':
        result = celsius * 9 / 5 + 32;
        break;
      case 'K':
        result = celsius + 273.15;
        break;
      default:
        throw new MathterError(`Unsupported temperature unit: ${to}`, 'INVALID_UNIT');
    }

    return {
      value: result,
      from,
      to,
      originalValue: value
    };
  }

  /**
   * Convert speed between different units
   * 
   * @param value - Speed value to convert
   * @param from - Source speed unit
   * @param to - Target speed unit
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.speed(10, 'm/s', 'mph'); // → { value: 22.3694, from: 'm/s', to: 'mph', originalValue: 10 }
   * Convert.speed(100, 'km/h', 'knot'); // → { value: 53.9957, from: 'km/h', to: 'knot', originalValue: 100 }
   * ```
   */
  public static speed(value: number, from: SpeedUnit, to: SpeedUnit): ConversionResult {
    if (value < 0) {
      throw new MathterError('Speed value cannot be negative', 'NEGATIVE_VALUE');
    }

    const baseValue = value * SPEED_FACTORS[from];
    const result = baseValue / SPEED_FACTORS[to];

    return {
      value: result,
      from,
      to,
      originalValue: value
    };
  }

}

// Convenience functions for direct import
export const convertLength = Convert.lengthUnit;
export const convertMass = Convert.mass;
export const convertTemperature = Convert.temperature;
export const convertSpeed = Convert.speed;
