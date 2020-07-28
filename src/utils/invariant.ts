/**
 * @description Throws an error if condition is falsy
 * @param {boolean} condition Condition
 * @param {string} format Error message
 */
function invariant(condition: boolean, format: string) {
  if (format === undefined) {
    throw new Error('invariant requires an error message argument');
  }

  if (condition) {
    return;
  }

  let error;
  if (format === undefined) {
    error = new Error(
      'Minified exception occurred; use the non-minified dev environment '
        + 'for the full error message and additional helpful warnings.'
    );
  } else {
    error = new Error(format);
    error.name = 'VerifyIQ SDK Error';
  }

  throw error;
}

export default invariant;