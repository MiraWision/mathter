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

export class Convert {
  /**
   * Convert length between different units
   */
  static Length(from: LengthUnit, to: LengthUnit, value: number): ConversionResult {
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
   */
  static Mass(from: MassUnit, to: MassUnit, value: number): ConversionResult {
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
   */
  static Temperature(from: TemperatureUnit, to: TemperatureUnit, value: number): ConversionResult {
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
   */
  static Speed(from: SpeedUnit, to: SpeedUnit, value: number): ConversionResult {
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
   * Convert degrees to radians
   */
  static Angle = {
    ToRadians: (degrees: number): number => {
      return degrees * Math.PI / 180;
    },

    /**
     * Convert radians to degrees
     */
    ToDegrees: (radians: number): number => {
      return radians * 180 / Math.PI;
    }
  };
}

// Convenience functions for direct import
export const convertLength = Convert.Length;
export const convertMass = Convert.Mass;
export const convertTemperature = Convert.Temperature;
export const convertSpeed = Convert.Speed;
export const toRadians = Convert.Angle.ToRadians;
export const toDegrees = Convert.Angle.ToDegrees;
