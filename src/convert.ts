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
 * Convert.length('m', 'ft', 1); // → { value: 3.28084, from: 'm', to: 'ft', originalValue: 1 }
 * 
 * // Temperature conversion
 * Convert.temperature('C', 'F', 100); // → { value: 212, from: 'C', to: 'F', originalValue: 100 }
 * ```
 */
export class Convert {
  /**
   * Convert length between different units
   * 
   * @param from - Source length unit
   * @param to - Target length unit
   * @param value - Value to convert
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.length('m', 'ft', 1); // → { value: 3.28084, from: 'm', to: 'ft', originalValue: 1 }
   * Convert.length('km', 'mi', 1); // → { value: 0.621371, from: 'km', to: 'mi', originalValue: 1 }
   * ```
   */
  public static length(from: LengthUnit, to: LengthUnit, value: number): ConversionResult {
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
   * @param from - Source mass unit
   * @param to - Target mass unit
   * @param value - Value to convert
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.mass('kg', 'lb', 1); // → { value: 2.20462, from: 'kg', to: 'lb', originalValue: 1 }
   * Convert.mass('g', 'oz', 100); // → { value: 3.5274, from: 'g', to: 'oz', originalValue: 100 }
   * ```
   */
  public static mass(from: MassUnit, to: MassUnit, value: number): ConversionResult {
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
   * @param from - Source temperature unit ('C', 'F', or 'K')
   * @param to - Target temperature unit ('C', 'F', or 'K')
   * @param value - Temperature value to convert
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When unit is not supported
   * 
   * @example
   * ```typescript
   * Convert.temperature('C', 'F', 100); // → { value: 212, from: 'C', to: 'F', originalValue: 100 }
   * Convert.temperature('F', 'K', 32); // → { value: 273.15, from: 'F', to: 'K', originalValue: 32 }
   * ```
   */
  public static temperature(from: TemperatureUnit, to: TemperatureUnit, value: number): ConversionResult {
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
   * @param from - Source speed unit
   * @param to - Target speed unit
   * @param value - Speed value to convert
   * @returns Conversion result with original and converted values
   * @throws {MathterError} When value is negative
   * 
   * @example
   * ```typescript
   * Convert.speed('m/s', 'mph', 10); // → { value: 22.3694, from: 'm/s', to: 'mph', originalValue: 10 }
   * Convert.speed('km/h', 'knot', 100); // → { value: 53.9957, from: 'km/h', to: 'knot', originalValue: 100 }
   * ```
   */
  public static speed(from: SpeedUnit, to: SpeedUnit, value: number): ConversionResult {
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

  /**
   * Angle conversion utilities
   */
  static Angle = {
    /**
     * Convert degrees to radians
     * 
     * @param degrees - Angle in degrees
     * @returns Angle in radians
     * 
     * @example
     * ```typescript
     * Convert.Angle.toRadians(180); // → 3.14159...
     * Convert.Angle.toRadians(90); // → 1.57079...
     * ```
     */
    public toRadians: (degrees: number): number => {
      return degrees * Math.PI / 180;
    },

    /**
     * Convert radians to degrees
     * 
     * @param radians - Angle in radians
     * @returns Angle in degrees
     * 
     * @example
     * ```typescript
     * Convert.Angle.toDegrees(Math.PI); // → 180
     * Convert.Angle.toDegrees(Math.PI / 2); // → 90
     * ```
     */
    public toDegrees: (radians: number): number => {
      return radians * 180 / Math.PI;
    }
  };
}

// Convenience functions for direct import
export const convertLength = Convert.length;
export const convertMass = Convert.mass;
export const convertTemperature = Convert.temperature;
export const convertSpeed = Convert.speed;
export const toRadians = Convert.Angle.toRadians;
export const toDegrees = Convert.Angle.toDegrees;
