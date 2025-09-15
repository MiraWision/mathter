import { Convert } from '../src/convert';

describe('Convert Module', () => {
  describe('Length conversion', () => {
    test('should convert meters to centimeters', () => {
      const result = Convert.Length('m', 'cm', 1);
      expect(result.value).toBe(100);
      expect(result.from).toBe('m');
      expect(result.to).toBe('cm');
    });

    test('should convert inches to feet', () => {
      const result = Convert.Length('in', 'ft', 12);
      expect(result.value).toBeCloseTo(1, 10);
    });

    test('should throw error for negative values', () => {
      expect(() => Convert.Length('m', 'cm', -1)).toThrow('Length value cannot be negative');
    });
  });

  describe('Mass conversion', () => {
    test('should convert kilograms to grams', () => {
      const result = Convert.Mass('kg', 'g', 1);
      expect(result.value).toBe(1000);
    });

    test('should convert pounds to kilograms', () => {
      const result = Convert.Mass('lb', 'kg', 1);
      expect(result.value).toBeCloseTo(0.453592, 5);
    });
  });

  describe('Temperature conversion', () => {
    test('should convert Celsius to Fahrenheit', () => {
      const result = Convert.Temperature('C', 'F', 0);
      expect(result.value).toBe(32);
    });

    test('should convert Fahrenheit to Celsius', () => {
      const result = Convert.Temperature('F', 'C', 32);
      expect(result.value).toBe(0);
    });

    test('should convert Celsius to Kelvin', () => {
      const result = Convert.Temperature('C', 'K', 0);
      expect(result.value).toBe(273.15);
    });
  });

  describe('Speed conversion', () => {
    test('should convert m/s to km/h', () => {
      const result = Convert.Speed('m/s', 'km/h', 1);
      expect(result.value).toBeCloseTo(3.6, 5);
    });

    test('should convert mph to m/s', () => {
      const result = Convert.Speed('mph', 'm/s', 1);
      expect(result.value).toBeCloseTo(0.44704, 5);
    });
  });

  describe('Angle conversion', () => {
    test('should convert degrees to radians', () => {
      const result = Convert.Angle.ToRadians(180);
      expect(result).toBe(Math.PI);
    });

    test('should convert radians to degrees', () => {
      const result = Convert.Angle.ToDegrees(Math.PI);
      expect(result).toBe(180);
    });
  });
});
