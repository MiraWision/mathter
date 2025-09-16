import { Geometry } from '../src/geometry';

describe('Geometry Module', () => {
  describe('Area calculations', () => {
    test('should calculate circle area', () => {
      expect(Geometry.Area.circle(5)).toBeCloseTo(78.54, 2);
    });

    test('should calculate square area', () => {
      expect(Geometry.Area.square(4)).toBe(16);
    });

    test('should calculate rectangle area', () => {
      expect(Geometry.Area.rectangle(3, 4)).toBe(12);
    });

    test('should calculate triangle area with sides and angle', () => {
      expect(Geometry.Area.triangle(3, 4, 90)).toBeCloseTo(6, 1);
    });
  });

  describe('Perimeter calculations', () => {
    test('should calculate circle perimeter', () => {
      expect(Geometry.Perimeter.circle(5)).toBeCloseTo(31.42, 2);
    });

    test('should calculate square perimeter', () => {
      expect(Geometry.Perimeter.square(4)).toBe(16);
    });

    test('should calculate rectangle perimeter', () => {
      expect(Geometry.Perimeter.rectangle(3, 4)).toBe(14);
    });

    test('should calculate triangle perimeter', () => {
      expect(Geometry.Perimeter.triangle(3, 4, 5)).toBe(12);
    });
  });

  describe('Volume calculations', () => {
    test('should calculate cube volume', () => {
      expect(Geometry.Volume.cube(3)).toBe(27);
    });

    test('should calculate sphere volume', () => {
      expect(Geometry.Volume.sphere(3)).toBeCloseTo(113.1, 1);
    });

    test('should calculate cylinder volume', () => {
      expect(Geometry.Volume.cylinder(2, 5)).toBeCloseTo(62.83, 2);
    });
  });

  describe('Pythagorean theorem', () => {
    test('should find hypotenuse', () => {
      expect(Geometry.Pythagoras.findHypotenuse(3, 4)).toBe(5);
    });

    test('should find leg', () => {
      expect(Geometry.Pythagoras.findLeg(5, 3)).toBe(4);
    });

    test('should check if triangle is right', () => {
      expect(Geometry.Pythagoras.isRightTriangle(3, 4, 5)).toBe(true);
      expect(Geometry.Pythagoras.isRightTriangle(3, 4, 6)).toBe(false);
    });
  });

  describe('Distance calculations', () => {
    test('should calculate 2D distance', () => {
      const p1 = { x: 0, y: 0 };
      const p2 = { x: 3, y: 4 };
      expect(Geometry.Distance.between2D(p1, p2)).toBe(5);
    });

    test('should calculate 3D distance', () => {
      const p1 = { x: 0, y: 0, z: 0 };
      const p2 = { x: 3, y: 4, z: 0 };
      expect(Geometry.Distance.between3D(p1, p2)).toBe(5);
    });
  });

  describe('Angle conversion', () => {
    test('should convert degrees to radians', () => {
      const result = Geometry.Angle.toRadians(180);
      expect(result).toBe(Math.PI);
    });

    test('should convert radians to degrees', () => {
      const result = Geometry.Angle.toDegrees(Math.PI);
      expect(result).toBe(180);
    });
  });

  describe('Error handling', () => {
    test('should throw error for negative radius', () => {
      expect(() => Geometry.Area.circle(-1)).toThrow('Radius cannot be negative');
    });

    test('should throw error for negative side length', () => {
      expect(() => Geometry.Area.square(-1)).toThrow('Side length cannot be negative');
    });
  });
});
