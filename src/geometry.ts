import { Point2D, Point3D, Circle, Rectangle, Triangle, MathterError } from './types';

/**
 * Geometric calculation utilities for 2D and 3D shapes
 * 
 * Provides methods for calculating areas, perimeters, volumes, distances,
 * and other geometric properties of various shapes.
 * 
 * @example
 * ```typescript
 * // Area calculations
 * Geometry.Area.circle(5); // → 78.54
 * Geometry.Area.rectangle(4, 6); // → 24
 * 
 * // Volume calculations
 * Geometry.Volume.sphere(3); // → 113.10
 * Geometry.Volume.cube(4); // → 64
 * 
 * // Distance calculations
 * Geometry.Distance.between2D({x: 0, y: 0}, {x: 3, y: 4}); // → 5
 * ```
 */
export class Geometry {
  /**
   * Area calculations for 2D shapes
   */
  public static Area = {
    /**
     * Calculate area of a circle
     * 
     * @param radius - Radius of the circle
     * @returns Area of the circle
     * @throws {MathterError} When radius is negative
     * 
     * @example
     * ```typescript
     * Geometry.Area.circle(5); // → 78.54
     * Geometry.Area.circle(0); // → 0
     * ```
     */
    circle: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return Math.PI * radius * radius;
    },

    /**
     * Calculate area of a square
     * 
     * @param side - Length of one side
     * @returns Area of the square
     * @throws {MathterError} When side is negative
     * 
     * @example
     * ```typescript
     * Geometry.Area.square(4); // → 16
     * Geometry.Area.square(0); // → 0
     * ```
     */
    square: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return side * side;
    },

    /**
     * Calculate area of a rectangle
     * 
     * @param width - Width of the rectangle
     * @param height - Height of the rectangle
     * @returns Area of the rectangle
     * @throws {MathterError} When width or height is negative
     * 
     * @example
     * ```typescript
     * Geometry.Area.rectangle(4, 6); // → 24
     * Geometry.Area.rectangle(0, 5); // → 0
     * ```
     */
    rectangle: (width: number, height: number): number => {
      if (width < 0 || height < 0) {
        throw new MathterError('Width and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return width * height;
    },

    /**
     * Calculate area of a triangle using two sides and included angle
     * 
     * @param a - Length of first side
     * @param b - Length of second side
     * @param angleDeg - Included angle in degrees
     * @returns Area of the triangle
     * @throws {MathterError} When sides are negative or angle is invalid
     * 
     * @example
     * ```typescript
     * Geometry.Area.triangle(3, 4, 90); // → 6
     * Geometry.Area.triangle(5, 6, 60); // → 12.99...
     * ```
     */
    triangle: (a: number, b: number, angleDeg: number): number => {
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
     * Calculate area of a trapezoid
     * 
     * @param a - Length of first parallel side
     * @param b - Length of second parallel side
     * @param height - Height of the trapezoid
     * @returns Area of the trapezoid
     * @throws {MathterError} When dimensions are negative
     * 
     * @example
     * ```typescript
     * Geometry.Area.trapezoid(3, 7, 4); // → 20
     * Geometry.Area.trapezoid(5, 5, 3); // → 15
     * ```
     */
    trapezoid: (a: number, b: number, height: number): number => {
      if (a < 0 || b < 0 || height < 0) {
        throw new MathterError('Dimensions cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return 0.5 * (a + b) * height;
    }
  };

  /**
   * Perimeter calculations for 2D shapes
   */
  public static Perimeter = {
    /**
     * Calculate perimeter of a circle (circumference)
     * 
     * @param radius - Radius of the circle
     * @returns Circumference of the circle
     * @throws {MathterError} When radius is negative
     * 
     * @example
     * ```typescript
     * Geometry.Perimeter.circle(5); // → 31.42...
     * Geometry.Perimeter.circle(0); // → 0
     * ```
     */
    circle: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return 2 * Math.PI * radius;
    },

    /**
     * Calculate perimeter of a square
     * 
     * @param side - Length of one side
     * @returns Perimeter of the square
     * @throws {MathterError} When side is negative
     * 
     * @example
     * ```typescript
     * Geometry.Perimeter.square(4); // → 16
     * Geometry.Perimeter.square(0); // → 0
     * ```
     */
    square: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return 4 * side;
    },

    /**
     * Calculate perimeter of a rectangle
     * 
     * @param width - Width of the rectangle
     * @param height - Height of the rectangle
     * @returns Perimeter of the rectangle
     * @throws {MathterError} When width or height is negative
     * 
     * @example
     * ```typescript
     * Geometry.Perimeter.rectangle(4, 6); // → 20
     * Geometry.Perimeter.rectangle(0, 5); // → 10
     * ```
     */
    rectangle: (width: number, height: number): number => {
      if (width < 0 || height < 0) {
        throw new MathterError('Width and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return 2 * (width + height);
    },

    /**
     * Calculate perimeter of a triangle
     * 
     * @param a - Length of first side
     * @param b - Length of second side
     * @param c - Length of third side
     * @returns Perimeter of the triangle
     * @throws {MathterError} When any side is negative
     * 
     * @example
     * ```typescript
     * Geometry.Perimeter.triangle(3, 4, 5); // → 12
     * Geometry.Perimeter.triangle(5, 5, 5); // → 15
     * ```
     */
    triangle: (a: number, b: number, c: number): number => {
      if (a < 0 || b < 0 || c < 0) {
        throw new MathterError('Side lengths cannot be negative', 'NEGATIVE_SIDES');
      }
      return a + b + c;
    }
  };

  /**
   * Volume calculations for 3D shapes
   */
  public static Volume = {
    /**
     * Calculate volume of a cube
     * 
     * @param side - Length of one side
     * @returns Volume of the cube
     * @throws {MathterError} When side is negative
     * 
     * @example
     * ```typescript
     * Geometry.Volume.cube(4); // → 64
     * Geometry.Volume.cube(0); // → 0
     * ```
     */
    cube: (side: number): number => {
      if (side < 0) {
        throw new MathterError('Side length cannot be negative', 'NEGATIVE_SIDE');
      }
      return side * side * side;
    },

    /**
     * Calculate volume of a sphere
     * 
     * @param radius - Radius of the sphere
     * @returns Volume of the sphere
     * @throws {MathterError} When radius is negative
     * 
     * @example
     * ```typescript
     * Geometry.Volume.sphere(3); // → 113.10...
     * Geometry.Volume.sphere(0); // → 0
     * ```
     */
    sphere: (radius: number): number => {
      if (radius < 0) {
        throw new MathterError('Radius cannot be negative', 'NEGATIVE_RADIUS');
      }
      return (4 / 3) * Math.PI * radius * radius * radius;
    },

    /**
     * Calculate volume of a cylinder
     * 
     * @param radius - Radius of the cylinder
     * @param height - Height of the cylinder
     * @returns Volume of the cylinder
     * @throws {MathterError} When radius or height is negative
     * 
     * @example
     * ```typescript
     * Geometry.Volume.cylinder(2, 5); // → 62.83...
     * Geometry.Volume.cylinder(0, 5); // → 0
     * ```
     */
    cylinder: (radius: number, height: number): number => {
      if (radius < 0 || height < 0) {
        throw new MathterError('Radius and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return Math.PI * radius * radius * height;
    },

    /**
     * Calculate volume of a rectangular prism
     * 
     * @param width - Width of the prism
     * @param height - Height of the prism
     * @param depth - Depth of the prism
     * @returns Volume of the rectangular prism
     * @throws {MathterError} When any dimension is negative
     * 
     * @example
     * ```typescript
     * Geometry.Volume.rectangularPrism(3, 4, 5); // → 60
     * Geometry.Volume.rectangularPrism(0, 4, 5); // → 0
     * ```
     */
    rectangularPrism: (width: number, height: number, depth: number): number => {
      if (width < 0 || height < 0 || depth < 0) {
        throw new MathterError('Dimensions cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return width * height * depth;
    },

    /**
     * Calculate volume of a cone
     * 
     * @param radius - Radius of the cone base
     * @param height - Height of the cone
     * @returns Volume of the cone
     * @throws {MathterError} When radius or height is negative
     * 
     * @example
     * ```typescript
     * Geometry.Volume.cone(3, 4); // → 37.70...
     * Geometry.Volume.cone(0, 4); // → 0
     * ```
     */
    cone: (radius: number, height: number): number => {
      if (radius < 0 || height < 0) {
        throw new MathterError('Radius and height cannot be negative', 'NEGATIVE_DIMENSIONS');
      }
      return (1 / 3) * Math.PI * radius * radius * height;
    }
  };

  /**
   * Pythagorean theorem calculations for right triangles
   */
  public static Pythagoras = {
    /**
     * Find hypotenuse given two legs
     * 
     * @param a - Length of first leg
     * @param b - Length of second leg
     * @returns Length of the hypotenuse
     * @throws {MathterError} When either leg is negative
     * 
     * @example
     * ```typescript
     * Geometry.Pythagoras.findHypotenuse(3, 4); // → 5
     * Geometry.Pythagoras.findHypotenuse(5, 12); // → 13
     * ```
     */
    findHypotenuse: (a: number, b: number): number => {
      if (a < 0 || b < 0) {
        throw new MathterError('Leg lengths cannot be negative', 'NEGATIVE_LEGS');
      }
      return Math.sqrt(a * a + b * b);
    },

    /**
     * Find leg given hypotenuse and other leg
     * 
     * @param hypotenuse - Length of the hypotenuse
     * @param leg - Length of the known leg
     * @returns Length of the unknown leg
     * @throws {MathterError} When lengths are negative or leg >= hypotenuse
     * 
     * @example
     * ```typescript
     * Geometry.Pythagoras.findLeg(5, 3); // → 4
     * Geometry.Pythagoras.findLeg(13, 5); // → 12
     * ```
     */
    findLeg: (hypotenuse: number, leg: number): number => {
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
     * 
     * @param a - Length of first side
     * @param b - Length of second side
     * @param c - Length of third side
     * @returns True if the sides form a right triangle
     * 
     * @example
     * ```typescript
     * Geometry.Pythagoras.isRightTriangle(3, 4, 5); // → true
     * Geometry.Pythagoras.isRightTriangle(3, 4, 6); // → false
     * ```
     */
    isRightTriangle: (a: number, b: number, c: number): boolean => {
      if (a <= 0 || b <= 0 || c <= 0) return false;
      
      const sides = [a, b, c].sort((x, y) => x - y);
      const [leg1, leg2, hypotenuse] = sides;
      
      return Math.abs(leg1 * leg1 + leg2 * leg2 - hypotenuse * hypotenuse) < 1e-10;
    }
  };

  /**
   * Distance calculations between points and lines
   */
  public static Distance = {
    /**
     * Calculate distance between two 2D points
     * 
     * @param p1 - First 2D point
     * @param p2 - Second 2D point
     * @returns Distance between the points
     * 
     * @example
     * ```typescript
     * Geometry.Distance.between2D({x: 0, y: 0}, {x: 3, y: 4}); // → 5
     * Geometry.Distance.between2D({x: 1, y: 1}, {x: 4, y: 5}); // → 5
     * ```
     */
    between2D: (p1: Point2D, p2: Point2D): number => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate distance between two 3D points
     * 
     * @param p1 - First 3D point
     * @param p2 - Second 3D point
     * @returns Distance between the points
     * 
     * @example
     * ```typescript
     * Geometry.Distance.between3D({x: 0, y: 0, z: 0}, {x: 3, y: 4, z: 0}); // → 5
     * Geometry.Distance.between3D({x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1}); // → 1.732...
     * ```
     */
    between3D: (p1: Point3D, p2: Point3D): number => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = p2.z - p1.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    /**
     * Calculate distance from point to line (2D)
     * 
     * @param point - Point to measure distance from
     * @param lineStart - Starting point of the line
     * @param lineEnd - Ending point of the line
     * @returns Shortest distance from point to line
     * 
     * @example
     * ```typescript
     * Geometry.Distance.pointToLine({x: 0, y: 0}, {x: 0, y: 0}, {x: 3, y: 4}); // → 0
     * Geometry.Distance.pointToLine({x: 1, y: 1}, {x: 0, y: 0}, {x: 2, y: 0}); // → 1
     * ```
     */
    pointToLine: (point: Point2D, lineStart: Point2D, lineEnd: Point2D): number => {
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
   * Angle calculations and conversions
   */
  public static Angle = {
    /**
     * Convert degrees to radians
     * 
     * @param degrees - Angle in degrees
     * @returns Angle in radians
     * 
     * @example
     * ```typescript
     * Geometry.Angle.toRadians(180); // → 3.14159...
     * Geometry.Angle.toRadians(90); // → 1.57079...
     * ```
     */
    toRadians: (degrees: number): number => {
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
     * Geometry.Angle.toDegrees(Math.PI); // → 180
     * Geometry.Angle.toDegrees(Math.PI / 2); // → 90
     * ```
     */
    toDegrees: (radians: number): number => {
      return radians * 180 / Math.PI;
    },

    /**
     * Calculate angle between two vectors (2D)
     * 
     * @param v1 - First 2D vector
     * @param v2 - Second 2D vector
     * @returns Angle between vectors in radians
     * @throws {MathterError} When either vector has zero magnitude
     * 
     * @example
     * ```typescript
     * Geometry.Angle.betweenVectors2D({x: 1, y: 0}, {x: 0, y: 1}); // → 1.57079... (90°)
     * Geometry.Angle.betweenVectors2D({x: 1, y: 0}, {x: 1, y: 0}); // → 0
     * ```
     */
    betweenVectors2D: (v1: Point2D, v2: Point2D): number => {
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
export const areaCircle = Geometry.Area.circle;
export const areaSquare = Geometry.Area.square;
export const areaRectangle = Geometry.Area.rectangle;
export const areaTriangle = Geometry.Area.triangle;
export const perimeterCircle = Geometry.Perimeter.circle;
export const perimeterSquare = Geometry.Perimeter.square;
export const perimeterRectangle = Geometry.Perimeter.rectangle;
export const volumeCube = Geometry.Volume.cube;
export const volumeSphere = Geometry.Volume.sphere;
export const volumeCylinder = Geometry.Volume.cylinder;
export const findHypotenuse = Geometry.Pythagoras.findHypotenuse;
export const findLeg = Geometry.Pythagoras.findLeg;
