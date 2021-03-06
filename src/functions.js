import { RAD2DEG, DEG2RAD, TAU } from './const';

/**
 * Component-wise addition of two arrays/vectors.
 * If target is NOT specified, the first argument will
 * be mutated. Target will be overwritten and NOT included in the sum.
 * @param {number[]} to left operand
 * @param {number[]} from right operand
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array/vector
 */
export function add(to, from, target = null) {
  if (target) {
    if (target.length === 0) target.length = to.length;
  } else {
    target = to;
  }
  for (let i = 0; i < target.length; i++) {
    target[i] = to[i] + from[i];
  }
  return target;
}

/**
 * Component-wise addition of one vector with a scaled version of another vector.
 * If target is NOT specified, the first argument will
 * be mutated. Target will be overwritten and NOT included in the sum.
 * @param {number[]} to left operand
 * @param {number[]} from right operand
 * @param {number} factor scaling factor to apply to from-vector
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array/vector
 */
export function addScaled(to, from, factor, target = null) {
  if (target) {
    if (target.length === 0) target.length = to.length;
  } else {
    target = to;
  }
  for (let i = 0; i < target.length; i++) {
    target[i] = to[i] + from[i] * factor;
  }
  return target;
}

/**
 * Component-wise addition of a set of arrays/vectors.
 * If target is NOT specified, the first element in the set will
 * be mutated. Target (if it has valid values) WILL be included in the sum.
 * @param {number[][]} vectors Array of equally length arrays/vectors (to be added)
 * @param {number[]} target optional array/vector to add into
 * @return {number[]} array/vector
 */
export function addAll(vectors, target = null) {
  let start = 0;
  if (!target) {
    target = vectors[0];
    start++;
  }

  for (let i = start; i < vectors.length; i++) {
    for (let j = 0; j < vectors[i].length; j++) {
      if (i === 0 && !Number.isFinite(target[j])) {
        target[j] = vectors[i][j];
      } else {
        target[j] += vectors[i][j];
      }
    }
  }
  return target;
}

/**
 * Component-wise subtraction of two arrays/vectors.
 * If target is NOT specified, the first argument will
 * be mutated. Target will be overwritten and NOT included in the sum.
 * @param {number[]} from left operand
 * @param {number[]} vector right operand
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array/vector
 */
export function sub(from, vector, target = null) {
  if (target) {
    if (target.length === 0) target.length = from.length;
  } else {
    target = from;
  }
  for (let i = 0; i < target.length; i++) {
    target[i] = from[i] - vector[i];
  }
  return target;
}

/**
 * Component-wise addition of one vector with a scaled version of another vector.
 * If target is NOT specified, the first argument will
 * be mutated. Target will be overwritten and NOT included in the sum.
 * @param {number[]} from left operand
 * @param {number[]} vector right operand
 * @param {number} factor scaling factor to apply to vector that will be subtracted
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array/vector
 */
export function subScaled(from, vector, factor, target = null) {
  if (target) {
    if (target.length === 0) target.length = from.length;
  } else {
    target = from;
  }
  for (let i = 0; i < target.length; i++) {
    target[i] = from[i] - vector[i] * factor;
  }
  return target;
}

/**
 * Component-wise subtraction of array/vector and all elements in vectors.
 * If target is NOT specified, the first argument will
 * be mutated. Target will be overwritten and NOT included in the sum.
 * @param {number[]} from left operand
 * @param {number[][]} vectors right operand
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array/vector
 */
export function subAll(from, vectors, target = null) {
  if (target) {
    if (target.length === 0) target.length = from.length;
  } else {
    target = from;
  }

  for (let i = 0; i < vectors.length; i++) {
    for (let j = 0; j < vectors[i].length; j++) {
      if (i === 0) {
        target[j] = from[j] - vectors[i][j];
      } else {
        target[j] -= vectors[i][j];
      }
    }
  }
  return target;
}

/**
 * Create a vector from two points. This function will NOT mutate any
 * arguments unless 'target' is the same as 'from'.
 * @param {number[]} from start coordinates
 * @param {number[]} to end coordinates
 * @param {number[]} target optional array/vector to store the resulting vector
 * @return {number[]} vector
 */
export function vec(from, to, target = null) {
  if (!target) {
    target = to.slice();
  } else {
    if (target.length === 0) {
      target.length = to.length;
    }
    for (let i = 0; i < target.length; i++) {
      target[i] = to[i];
    }
  }
  return sub(target, from);
}

/**
 * Component-wise scaling of an array or vector
 * @param {number[]} arr array/vector to scale
 * @param {number} factor scaling factor
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} scaled array/vector
 */
export function scale(arr, factor, target = null) {
  target = target || arr;
  for (let i = 0; i < arr.length; i++) {
    target[i] = arr[i] * factor;
  }
  return target;
}

/**
 * Computes the sum of squares
 * @param {number[]} arr array/vector to compute
 * @return {number}
 */
export function sumsqr(arr) {
  return arr.reduce((sum, v) => sum + v ** 2, 0);
}

/**
 * Computes the scalar value (length) of a vector
 * @param {number[]} vector array/vector to compute
 * @return {number}
 */
export function scalar(vector) {
  const sq = sumsqr(vector);
  if (sq === 0) return sq;
  return Math.sqrt(sq);
}

/**
 * Normalizes an array/vector
 * @param {number[]} vector array/vector to notmalize
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} normalized array/vector
 */
export function norm(vector, target = null) {
  target = target || vector;
  const sc = scalar(vector);
  const f = sc === 0 ? 0 : 1 / sc;
  return scale(vector, f, target);
}

/**
 * Describes relationships between two points.
 * @param {number[]} from start coordinates
 * @param {number[]} to end coordinates
 * @param {number[]} target optional array/vector to store the result
 * @return {{vector: number[], sqr: number, distance: number, unit: number[]}}
 */
export function descr(from, to, target = null) {
  if (!target) {
    target = to.slice();
  } else {
    if (target.length === 0) {
      target.length = to.length;
    }
    for (let i = 0; i < target.length; i++) {
      target[i] = to[i];
    }
  }
  const vector = sub(target, from);
  const sqr = sumsqr(vector);
  const dst = Math.sqrt(sqr);
  const unit = scale(vector, dst > 0 ? 1 / dst : 0, vector.slice());
  return {
    vector,
    sqr,
    dist: dst,
    unit,
  };
}

/**
 * Get a unit vector that is perpendicular to the input vector. Only for 2d vectors!
 * @param {number[]} vector 2d vector
 * @param {number[]} target optional array/vector to store the resulting vector
 * @return {number[]} normalized, perpendicular vector
 */
export function orth2(vector, target = null) {
  target = target || vector;
  const x = -vector[1];
  target[1] = vector[0];
  target[0] = x;
  return norm(target);
}

/**
 * Find the axis aligned angle of a 3d vector
 * @param {number[]} vector
 * @param {number} axis which axis to measure from X=0, Y=1, Z=2 (defaults to 0)
 * @return {number} angle in radians
 */
export function angle(vector, axis = 0) {
  if (axis > 2 || axis < 0) return undefined;

  const [x, y, z] = vector;
  let a, b, c;
  switch (axis) {
    case 0: a = y; b = z; c = x; break;
    case 1: a = x; b = z; c = y; break;
    default: a = x; b = y; c = z;
  }
  const l = Math.sqrt(a ** 2 + b ** 2);
  return Math.atan2(l, c);
}

/**
 * Find the axis aligned angle of a 2d vector
 * @param {number[]} vector
 * @return {number} angle in radians
 */
export function angle2(vector) {
  return Math.atan2(vector[1], vector[0]);
}

/**
 * Get a unit vector between two points/coordinates. This function
 * does not mutate any arguments, but a target may still be used to
 * control the return type or to avoid creating additional arrays.
 * @param {number[]} from start coordinates
 * @param {number[]} to end coordinates
 * @param {number[]} target optional array/vector to store the resulting vector
 * @return {number[]} unit vector between from and to
 */
export function dir(from, to, target = null) {
  return norm(vec(from, to, target));
}

/**
 * Calculate the distance between two points/coordinates.
 * @param {number[]} p1 point/coordinates
 * @param {number[]} p2 point/coordinates
 * @return {number} distance
 */
export function dist(p1, p2) {
  return scalar(vec(p1, p2));
}

/**
 * Calculate the dot product between two vectors
 * @param {number[]} v1 left hand operand
 * @param {number[]} v2 right hand operand
 * @return {number} the dot product
 */
export function dot(v1, v2) {
  return v1.reduce((sum, c, i) => sum + c * v2[i], 0);
}

/**
 * Find the cross product between two 3d vectors
 * @param {number[]} v1 left hand operand (3d vector)
 * @param {number[]} v2 right hand operand (3d vector)
 * @param {number[]} target optional array/vector to store the resulting vector
 * @return {number[]} the cross product vector (normal)
 */
export function cross(v1, v2, target = null) {
  target = target || new Array(3);
  target[0] = (v1[1] * v2[2]) - (v1[2] * v2[1]);
  target[1] = (v1[2] * v2[0]) - (v1[0] * v2[2]);
  target[2] = (v1[0] * v2[1]) - (v1[1] * v2[0]);

  return target;
}

/**
 * Get the triple product between three 3d vectors
 * @param {number[]} v1 left hand operand for the dot product (3d vector)
 * @param {number[]} v2 left hand operand for the cross product (3d vector)
 * @param {number[]} v3 right hand operand for the cross product (3d vector)
 * @return {number} triple product
 */
export function triple(v1, v2, v3) {
  return dot(v1, cross(v2, v3));
}

/**
 * Find the psudo cross product between two 2d vectors
 * @param {number[]} v1 left hand operand (2d vector)
 * @param {number[]} v2 right hand operand (2d vector)
 * @return {number} signed area of the parallellogram defined by v1 and v2
 */
export function cross2(v1, v2) {
  return (v1[0] * v2[1]) - (v1[1] * v2[0]);
}

/**
 * Clamps the value to min or max if value is less than min or greater than max
 * @param {number} value value to clamp
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @return {number} clamped value
 */
export function clampValue(value, min = 0, max = 1) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Clamps each value in array according to min and max.
 * @param {number[]} arr values to clamp
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} array of clamped values
 */
export function clampArray(arr, min = 0, max = 1, target = null) {
  target = target || arr;
  for (let i = 0; i < target.length; i++) {
    target[i] = clampValue(target[i], min, max);
  }
  return target;
}

/**
 * Clamps the argument according to min and max. Arg can be either a numeric
 * value or an array of numeric values.
 * @param {number|number[]} arg value or array of values to clamp
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {number[]} target optional array/vector to store the result
 * @return {number|number[]} clamped version of arg
 */
export function clamp(arg, min = 0, max = 1, target = null) {
  if (Array.isArray(arg)) {
    return clampArray(arg, min, max, target);
  }
  return clampValue(arg, min, max);
}

/**
 * As glsl step function for single numeric values
 * @param {number} edge value to test
 * @param {number} x threshold value
 * @return {number} returns 0 or 1
 */
export function stepValue(edge, x) {
  return x >= edge ? 1 : 0;
}

/**
 * As glsl step function for multiple numeric values
 * @param {number[]} edges values to test
 * @param {number|number[]} x threshold values
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} results for each value in edges
 */
export function stepArray(edges, x, target = null) {
  const m = Array.isArray(x) ? i => x[i] : () => x;
  target = target || edges;
  for (let i = 0; i < target.length; i++) {
    target[i] = stepValue(target[i], m(i));
  }
  return target;
}

/**
 * Implementation of glsl step function. Returns 0 if an edge is less than the
 * threshold x, otherwise 1
 * @param {number|number[]} edge number/array to test
 * @param {number|number[]} x threshold(s)
 * @param {number[]} target optional array/vector to store the result (if edge is array)
 * @return {number|number[]}
 */
export function step(edge, x, target = null) {
  if (Array.isArray(edge)) {
    return stepArray(edge, x, target);
  }
  return stepValue(edge, x);
}

/**
 * Implementation of glsl smoothstep function
 * @param {number} edge0
 * @param {number} edge1
 * @param {number} x threshold
 */
export function smoothstep(edge0, edge1, x) {
  const t = clampValue((x - edge0) / (edge1 - edge0));
  return t * t * (3.0 - 2.0 * t);
}

/**
 * Linear interpolation between two numbers
 * @param {number} a interpolate from
 * @param {number} b interpolate to
 * @param {number} t time 0 = a, 1 = b
 * @return {number} the interpolated value
 */
export function lerp(a, b, t) {
  const m = clampValue(t, 0, 1);
  return a * (1 - m) + b * m;
}

/**
 * Mix (interpolate) numbers or arrays (similar to glsl implementation).
 * Works on both vectors and matrices, since they are both arrays.
 * @param {number[]} a interpolate from
 * @param {number[]} b interpolate to
 * @param {number|number[]} t time 0 = a, 1 = b
 * @param {number[]} target optional array/vector to store the result
 * @return {number[]} interpolated array/vector/matrix
 */
export function mix(a, b, t, target = null) {
  const m = Array.isArray(t) ? i => t[i] : () => t;
  target = target || a;
  for (let i = 0; i < target.length; i++) {
    target[i] = lerp(a[i], b[i], m(i));
  }
  return target;
}

/**
 * Generates a list of interpolated values between from and to,
 * where the number of elements returned are controlled by the
 * steps argument.
 * @param {number|number[]} from value to interpolate from
 * @param {number|number[]} to value to interpolate to
 * @param {number} steps interpolation steps
 * @param {number} start start time of interpolation [0-1]
 * @param {number} end end time of interpolation [0-1]
 */
export function seq(from, to, steps, start = 0, end = 1) {
  let f;
  if (Array.isArray(from)) {
    f = t => mix(from, to, t, from.slice());
  } else {
    f = t => lerp(from, to, t);
  }
  const target = [];
  const incr = (end - start) / (steps - 1);
  for (let i = 0; i < steps - 1; i++) {
    const x = start + i * incr;
    target.push(f(x));
  }
  target.push(f(end));
  return target;
}

/**
 * Generates a list of interpolated values between 0 and 1,
 * where the number of elements returned are controlled by the
 * steps argument.
 * @param {number} steps interpolation steps
 */
export function seqI(steps) {
  const target = [];
  const incr = 1 / (steps - 1);
  for (let i = 0; i < steps - 1; i++) {
    target.push(lerp(0, 1, i * incr));
  }
  target.push(1);
  return target;
}

/**
 * Rounds a number to the specific number of digits. Works with either a
 * single number or an array of numbers, which means it can be used with vectors and
 * matrices as well.
 * @param {number|number[]} v value to round
 * @param {number} digits number of digits to round to
 * @return {number} rounded value
 */
export function round(v, digits = 1) {
  const f = 10 ** digits;
  if (!Array.isArray(v)) {
    return Math.round(v * f) / f;
  }
  for (let i = 0; i < v.length; i++) {
    v[i] = Math.round(v[i] * f) / f;
  }
  return v;
}

/**
 * Convert degrees to radians
 * @param {number} d degrees
 * @returns {number} radians
 */
export function rad(d) {
  return d * DEG2RAD;
}

/**
 * Convert radians to degrees
 * @param {number} r radians
 * @returns {number} degrees
 */
export function deg(r) {
  return r * RAD2DEG;
}

/**
 * Normalise an angle to be between -PI to +PI
 * @param {number} r radians
 * @return {number} normalised angle
 */
export function nrad(r) {
  const v = r % TAU;
  return (v < 0 ? v + TAU : v);
}

/**
 * Test if a vector is a null vector
 * @param {number[]} v vector to test
 * @param {number} epsilon optional epsilon value
 */
export function isNullVec(v, epsilon = 0) {
  return epsilon ? v.every(val => Math.abs(val) - epsilon <= 0) : v.every(val => val === 0);
}
