/**
 * Returns true if the given value is null, false or undefined
 * @param value {*}
 */
export function isFalsy(value: any): boolean {
  return value === undefined
    || value === null
    || value === false;
}