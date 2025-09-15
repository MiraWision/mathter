import { Point2D, Point3D, Circle, Rectangle, Triangle, MathterError } from './types';

export class Geometry {
  /**
   * Area calculations
   */
  static Area = {
    /**
     * Calculate area of a circle
     */
    Circle: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return Math.PI * radius * radius;
    },

    /**
     * Calculate area of a square
     */
    Square: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return side * side;
    },

    /**
     * Calculate area of a rectangle
     */
    Rectangle: (width: number, height: number): number => {
      if (width < 0 || height < 0) {
        throw new MathterError('Width and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return width * height;
    },

    /**
     * Calculate area of a triangle using two sides and included angle
     */
    Triangle: (a: number, b: number, angleDeg: number): number => {
      if (a < 0 || b < 0) {
        throw new MathterError('Side lengths cannot be negative', 'NEGATIVE_SIDES');
      }
      if (angleDeg < 0 || angleDeg > 180) {
        throw new MathterError('Angle must be between 0 and 180 degrees', 'INVALID_ANGLE');
      }
      const angleRad = (angleDeg * Math.PI) / 180;
      return 0.5 * a * b * Math.sin(angleRad);
    },

    /**
     * Calculate area of a triangle using Heron's formula
     */
    TriangleHeron: (a: number, b: number, c: number): number => {
      if (a < 0 || b < 0 || c < 0) {
        throw new MathterError('Side lengths cannot be negative', 'NEGATIVE_SIDES');
      }
      if (a + b <= c || a + c <= b || b + c <= a) {
        throw new MathterError('Invalid triangle: sum of any two sides must be greater than the third', 'INVALID_TRIANGLE');
      }
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    },

    /**
     * Calculate area of a trapezoid
     */
    Trapezoid: (a: number, b: number, height: number): number => {
      if (a < 0 || b < 0 || height < 0) {
        throw new MathterError('Dimensions cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return 0.5 * (a + b) * height;
    }
  };

  /**
   * Perimeter calculations
   */
  static Perimeter = {
    /**
     * Calculate perimeter of a circle (circumference)
     */
    Circle: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return 2 * Math.PI * radius;
    },

    /**
     * Calculate perimeter of a square
     */
    Square: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return 4 * side;
    },

    /**
     * Calculate perimeter of a rectangle
     */
    Rectangle: (width: number, height: number): number => {
      if (width < 0 || height < 0) {
        throw new MathterError('Width and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return 2 * (width + height);
    },

    /**
     * Calculate perimeter of a triangle
     */
    Triangle: (a: number, b: number, c: number): number => {
      if (a < 0 || b < 0 || c < 0) {
        throw new MathterError('Side lengths cannot be negative', 'NEGATIVE_SIDES');
      }
      return a + b + c;
    }
  };

  /**
   * Volume calculations
   */
  static Volume = {
    /**
     * Calculate volume of a cube
     */
    Cube: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return side * side * side;
    },

    /**
     * Calculate volume of a sphere
     */
    Sphere: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return (4 / 3) * Math.PI * radius * radius * radius;
    },

    /**
     * Calculate volume of a cylinder
     */
    Cylinder: (radius: number, height: number): number => {
      if (radius < 0 || height < 0) {
        throw new MathterError('Radius and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return Math.PI * radius * radius * height;
    },

    /**
     * Calculate volume of a rectangular prism
     */
    RectangularPrism: (width: number, height: number, depth: number): number => {
      if (width < 0 || height < 0 || depth < 0) {
        throw new MathterError('Dimensions cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return width * height * depth;
    },

    /**
     * Calculate volume of a cone
     */
    Cone: (radius: number, height: number): number => {
      if (radius < 0 || height < 0) {
        throw new MathterError('Radius and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return (1 / 3) * Math.PI * radius * radius * height;
    }
  };

  /**
   * Pythagorean theorem calculations
   */
  static Pythagoras = {
    /**
     * Find hypotenuse given two legs
     */
    FindHypotenuse: (a: number, b: number): number => {
      if (a < 0 || b < 0) {
        throw new MathterError('Leg lengths cannot be negative', 'NEGATIVE_LEGS');
      }
      return Math.sqrt(a * a + b * b);
    },

    /**
     * Find leg given hypotenuse and other leg
     */
    FindLeg: (hypotenuse: number, leg: number): number => {
      if (hypotenuse < 0 || leg < 0) {
        throw new MathterError('Lengths cannot be negative', 'NEGATIVE_LENGTHS');
      }
      if (leg >= hypotenuse) {
        throw new MathterError('Leg must be shorter than hypotenuse', 'INVALID_TRIANGLE');
      }
      return Math.sqrt(hypotenuse * hypotenuse - leg * leg);
    },

    /**
     * Check if three numbers form a right triangle
     */
    IsRightTriangle: (a: number, b: number, c: number): boolean => {
      if (a <= 0 || b <= 0 || c <= 0) return false;
      
      const sides = [a, b, c].sort((x, y) => x - y);
      const [leg1, leg2, hypotenuse] = sides;
      
      return Math.abs(leg1 * leg1 + leg2 * leg2 - hypotenuse * hypotenuse) < 1e-10;
    }
  };

  /**
   * Distance calculations
   */
  static Distance = {
    /**
     * Calculate distance between two 2D points
     */
    Between2D: (p1: Point2D, p2: Point2D): number => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate distance between two 3D points
     */
    Between3D: (p1: Point3D, p2: Point3D): number => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    /**
     * Calculate distance from point to line (2D)
     */
    PointToLine: (point: Point2D, lineStart: Point2D, lineEnd: Point2D): number => {
      const A = point.x - lineStart.x;
      const B = point.y - lineStart.y;
      const C = lineEnd.x - lineStart.x;
      const D = lineEnd.y - lineStart.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      
      if (lenSq === 0) {
        // Line is actually a point
        return Math.sqrt(A * A + B * B);
      }

      const param = dot / lenSq;
      let xx, yy;

      if (param < 0) {
        xx = lineStart.x;
        yy = lineStart.y;
      } else if (param > 1) {
        xx = lineEnd.x;
        yy = lineEnd.y;
      } else {
        xx = lineStart.x + param * C;
        yy = lineStart.y + param * D;
      }

      const dx = point.x - xx;
      const dy = point.y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }
  };

  /**
   * Angle calculations
   */
  static Angle = {
    /**
     * Convert degrees to radians
     */
    ToRadians: (degrees: number): number => {
      return degrees * Math.PI / 180;
    },

    /**
     * Convert radians to degrees
     */
    ToDegrees: (radians: number): number => {
      return radians * 180 / Math.PI;
    },

    /**
     * Calculate angle between two vectors (2D)
     */
    BetweenVectors2D: (v1: Point2D, v2: Point2D): number => {
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
      
      if (mag1 === 0 || mag2 === 0) {
        throw new MathterError('Vectors cannot have zero magnitude', 'ZERO_VECTOR');
      }

      const cosAngle = dot / (mag1 * mag2);
      return Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    }
  };
}

// Convenience functions for direct import
export const areaCircle = Geometry.Area.Circle;
export const areaSquare = Geometry.Area.Square;
export const areaRectangle = Geometry.Area.Rectangle;
export const areaTriangle = Geometry.Area.Triangle;
export const perimeterCircle = Geometry.Perimeter.Circle;
export const perimeterSquare = Geometry.Perimeter.Square;
export const perimeterRectangle = Geometry.Perimeter.Rectangle;
export const volumeCube = Geometry.Volume.Cube;
export const volumeSphere = Geometry.Volume.Sphere;
export const volumeCylinder = Geometry.Volume.Cylinder;
export const findHypotenuse = Geometry.Pythagoras.FindHypotenuse;
export const findLeg = Geometry.Pythagoras.FindLeg;
