/**
 * Helper functions for algorithms
 * Reusable across all visualization algorithms
 */

/**
 * Swaps two elements in an array
 * @param {number[]} arr - Array to modify
 * @param {number} i - First index
 * @param {number} j - Second index
 */
export function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Compares two values
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {number} -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Creates a step for the algorithm generator
 * @param {string} type - Type of operation ('compare', 'swap', 'sorted', etc.)
 * @param {number|number[]} indices - Index(es) being processed
 * @param {*|*[]} values - Value(s) involved
 * @param {string} message - Descriptive message for the user
 * @param {number[]} state - Current state of the array
 * @param {object} metadata - Additional information
 * @returns {object} Formatted step
 */
export function createStep(type, indices, values, message, state, metadata = {}) {
  return {
    type,
    indices: Array.isArray(indices) ? indices : [indices],
    values: Array.isArray(values) ? values : [values],
    message,
    state: [...state], // Copy to avoid mutations
    metadata
  };
}
