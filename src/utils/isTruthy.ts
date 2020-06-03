import { isFalsy } from './isFalsy';

/**
 * Returns true if the given value is not null, false and undefined
 * @param value {*}
 */
export function isTruthy(value: any): boolean {
  return !isFalsy(value);
}