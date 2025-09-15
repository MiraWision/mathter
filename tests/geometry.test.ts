import { Geometry } from '../src/geometry';

describe('Geometry Module', () => {
  describe('Area calculations', () => {
    test('should calculate circle area', () => {
      expect(Geometry.Area.Circle(5)).toBeCloseTo(78.54, 2);
    });

    test('should calculate square area', () => {
      expect(Geometry.Area.Square(4)).toBe(16);
    });

    test('should calculate rectangle area', () => {
      expect(Geometry.Area.Rectangle(3, 4)).toBe(12);
    });

    test('should calculate triangle area with sides and angle', () => {
      expect(Geometry.Area.Triangle(3, 4, 90)).toBeCloseTo(6, 1);
    });

    test('should calculate triangle area using Heron\'s formula', () => {
      expect(Geometry.Area.TriangleHeron(3, 4, 5)).toBe(6);
    });
  });

  describe('Perimeter calculations', () => {
    test('should calculate circle perimeter', () => {
      expect(Geometry.Perimeter.Circle(5)).toBeCloseTo(31.42, 2);
    });

    test('should calculate square perimeter', () => {
      expect(Geometry.Perimeter.Square(4)).toBe(16);
    });

    test('should calculate rectangle perimeter', () => {
      expect(Geometry.Perimeter.Rectangle(3, 4)).toBe(14);
    });

    test('should calculate triangle perimeter', () => {
      expect(Geometry.Perimeter.Triangle(3, 4, 5)).toBe(12);
    });
  });

  describe('Volume calculations', () => {
    test('should calculate cube volume', () => {
      expect(Geometry.Volume.Cube(3)).toBe(27);
    });

    test('should calculate sphere volume', () => {
      expect(Geometry.Volume.Sphere(3)).toBeCloseTo(113.1, 1);
    });

    test('should calculate cylinder volume', () => {
      expect(Geometry.Volume.Cylinder(2, 5)).toBeCloseTo(62.83, 2);
    });
  });

  describe('Pythagorean theorem', () => {
    test('should find hypotenuse', () => {
      expect(Geometry.Pythagoras.FindHypotenuse(3, 4)).toBe(5);
    });

    test('should find leg', () => {
      expect(Geometry.Pythagoras.FindLeg(5, 3)).toBe(4);
    });

    test('should check if triangle is right', () => {
      expect(Geometry.Pythagoras.IsRightTriangle(3, 4, 5)).toBe(true);
      expect(Geometry.Pythagoras.IsRightTriangle(3, 4, 6)).toBe(false);
    });
  });

  describe('Distance calculations', () => {
    test('should calculate 2D distance', () => {
      const p1 = { x: 0, y: 0 };
      const p2 = { x: 3, y: 4 };
      expect(Geometry.Distance.Between2D(p1, p2)).toBe(5);
    });

    test('should calculate 3D distance', () => {
      const p1 = { x: 0, y: 0, z: 0 };
      const p2 = { x: 3, y: 4, z: 0 };
      expect(Geometry.Distance.Between3D(p1, p2)).toBe(5);
    });
  });

  describe('Error handling', () => {
    test('should throw error for negative radius', () => {
      expect(() => Geometry.Area.Circle(-1)).toThrow('Radius cannot be negative');
    });

    test('should throw error for negative side length', () => {
      expect(() => Geometry.Area.Square(-1)).toThrow('Side length cannot be negative');
    });
  });
});
