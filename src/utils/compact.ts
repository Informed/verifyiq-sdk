import { isTruthy } from './isTruthy';

/**
 * Returns new array without falsy value items
 * @param arr {Array}
 */
export function compact<T>(arr?: T[]): T[] {
  if (!arr) {
    return [];
  }

  return arr.filter((value) => isTruthy(value));
}