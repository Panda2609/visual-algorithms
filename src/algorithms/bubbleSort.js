/**
 * Bubble Sort Algorithm
 * Compares adjacent elements and swaps if they are in the wrong order
 * 
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 */

import { createStep, swap, compare } from '../helpers/algorithmHelpers';

/**
 * Bubble Sort Generator - Returns a generator that produces execution steps
 * @param {number[]} arr - Array to sort
 * @returns {Generator} Generator of steps
 * 
 * Each step contains:
 * - type: 'compare' | 'swap' | 'sorted' | 'complete'
 * - indices: array of indices involved
 * - values: values being compared/swapped
 * - message: description of the operation
 * - state: current state of the array
 * - metadata: additional info (comparisons, swaps, etc.)
 */
export function* bubbleSort(arr) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Copy of array to avoid mutating the original
  const array = [...arr];

  // Outer loop - passes through the array
  for (let i = 0; i < n - 1; i++) {
    let swappedInThisPass = false;

    // Inner loop - comparisons
    for (let j = 0; j < n - i - 1; j++) {
      // Step 1: Indicate we are comparing
      comparisons++;
      yield createStep(
        'compare',
        [j, j + 1],
        [array[j], array[j + 1]],
        `Comparing ${array[j]} and ${array[j + 1]}`,
        array,
        { comparisons, swaps, pass: i + 1, totalPasses: n - 1 }
      );

      // Compare and swap if necessary
      if (compare(array[j], array[j + 1]) > 0) {
        swap(array, j, j + 1);
        swaps++;
        swappedInThisPass = true;

        // Step 2: Indicate we swapped
        yield createStep(
          'swap',
          [j, j + 1],
          [array[j], array[j + 1]],
          `Swapping ${array[j + 1]} and ${array[j]}`,
          array,
          { comparisons, swaps, pass: i + 1, totalPasses: n - 1 }
        );
      }
    }

    // At the end of each pass, the largest element is in its final position
    yield createStep(
      'sorted',
      [n - i - 1],
      [array[n - i - 1]],
      `Element ${array[n - i - 1]} is in its final position`,
      array,
      { comparisons, swaps, pass: i + 1, totalPasses: n - 1, sortedElements: i + 1 }
    );

    // If no swaps, the array is sorted
    if (!swappedInThisPass) {
      break;
    }
  }

  // Array completely sorted
  yield createStep(
    'complete',
    Array.from({ length: n }, (_, i) => i),
    array,
    'Array completely sorted!',
    array,
    { comparisons, swaps, totalOperations: comparisons + swaps }
  );
}
