import { Convert } from '../src/convert';

describe('Convert Module', () => {
  describe('Length conversion', () => {
    test('should convert meters to centimeters', () => {
      const result = Convert.lengthUnit(1, 'm', 'cm');
      expect(result.value).toBe(100);
      expect(result.from).toBe('m');
      expect(result.to).toBe('cm');
    });

    test('should convert inches to feet', () => {
      const result = Convert.lengthUnit(12, 'in', 'ft');
      expect(result.value).toBeCloseTo(1, 10);
    });

    test('should throw error for negative values', () => {
      expect(() => Convert.lengthUnit(-1, 'm', 'cm')).toThrow('Length value cannot be negative');
    });
  });

  describe('Mass conversion', () => {
    test('should convert kilograms to grams', () => {
      const result = Convert.mass(1, 'kg', 'g');
      expect(result.value).toBe(1000);
    });

    test('should convert pounds to kilograms', () => {
      const result = Convert.mass(1, 'lb', 'kg');
      expect(result.value).toBeCloseTo(0.453592, 5);
    });
  });

  describe('Temperature conversion', () => {
    test('should convert Celsius to Fahrenheit', () => {
      const result = Convert.temperature(0, 'C', 'F');
      expect(result.value).toBe(32);
    });

    test('should convert Fahrenheit to Celsius', () => {
      const result = Convert.temperature(32, 'F', 'C');
      expect(result.value).toBe(0);
    });

    test('should convert Celsius to Kelvin', () => {
      const result = Convert.temperature(0, 'C', 'K');
      expect(result.value).toBe(273.15);
    });
  });

  describe('Speed conversion', () => {
    test('should convert m/s to km/h', () => {
      const result = Convert.speed(1, 'm/s', 'km/h');
      expect(result.value).toBeCloseTo(3.6, 5);
    });

    test('should convert mph to m/s', () => {
      const result = Convert.speed(1, 'mph', 'm/s');
      expect(result.value).toBeCloseTo(0.44704, 5);
    });
  });
});
