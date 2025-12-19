/**
 * Quick Sort Algorithm
 * Divides array into partitions and recursively sorts them
 * 
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) due to recursion
 */

import { createStep, swap, compare } from '../helpers/algorithmHelpers';

/**
 * Quick Sort Generator - Returns a generator that produces execution steps
 * @param {number[]} arr - Array to sort
 * @returns {Generator} Generator of steps
 */
export function* quickSort(arr) {
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  function* quickSortHelper(low, high, depth = 0) {
    if (low < high) {
      // Partition and get pivot index
      const pivotIndex = yield* partition(low, high, depth);
      
      // Recursively sort left partition
      yield* quickSortHelper(low, pivotIndex - 1, depth + 1);
      
      // Recursively sort right partition
      yield* quickSortHelper(pivotIndex + 1, high, depth + 1);
    }
  }

  function* partition(low, high, depth) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      
      // Step: Comparing with pivot
      yield createStep(
        'compare',
        [j, high],
        [array[j], pivot],
        `Comparing ${array[j]} with pivot ${pivot}`,
        array,
        { comparisons, swaps, depth, low, high }
      );

      if (compare(array[j], pivot) < 0) {
        i++;
        swap(array, i, j);
        swaps++;

        // Step: Swapping elements
        yield createStep(
          'swap',
          [i, j],
          [array[i], array[j]],
          `Swapping ${array[j]} and ${array[i]}`,
          array,
          { comparisons, swaps, depth, low, high }
        );
      }
    }

    swap(array, i + 1, high);
    swaps++;

    // Step: Pivot in final position
    yield createStep(
      'sorted',
      [i + 1],
      [array[i + 1]],
      `Pivot ${array[i + 1]} in final position`,
      array,
      { comparisons, swaps, depth, low, high, pivotPosition: i + 1 }
    );

    return i + 1;
  }

  // Execute the recursive sort
  yield* quickSortHelper(0, array.length - 1);

  // Array completely sorted
  yield createStep(
    'complete',
    Array.from({ length: array.length }, (_, i) => i),
    array,
    'Array completely sorted!',
    array,
    { comparisons, swaps, totalOperations: comparisons + swaps }
  );
}
