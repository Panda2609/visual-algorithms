/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Stable: Yes
 * 
 * Divide-and-conquer sorting algorithm that divides array into halves,
 * recursively sorts them, and merges the sorted halves back together.
 */

import { createStep, compare } from '../helpers/algorithmHelpers';

export function* mergeSort(data) {
  const n = data.length;
  let comparisons = 0;
  let swaps = 0;

  /**
   * Recursive merge sort generator
   * Yields steps for visualization
   */
  function* mergeSortHelper(arr, left, right, depth = 0) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // Recursively sort left half
      yield* mergeSortHelper(arr, left, mid, depth + 1);

      // Recursively sort right half
      yield* mergeSortHelper(arr, mid + 1, right, depth + 1);

      // Merge the two halves
      yield* merge(arr, left, mid, right, depth);
    }
  }

  /**
   * Merge two sorted subarrays
   */
  function* merge(arr, left, mid, right, depth) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Merge comparing elements from both subarrays
    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;

      const leftIdx = left + i;
      const rightIdx = mid + 1 + j;

      // Yield comparison step
      yield createStep(
        'compare',
        [leftIdx, rightIdx],
        [leftArr[i], rightArr[j]],
        `Comparing ${leftArr[i]} and ${rightArr[j]}`,
        arr,
        {
          comparisons,
          swaps,
          depth,
          mergePhase: true,
        }
      );

      if (compare(leftArr[i], rightArr[j]) <= 0) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      swaps++;

      // Yield placement step
      yield createStep(
        'swap',
        [k],
        [arr[k]],
        `Placing ${arr[k]} at position ${k}`,
        arr,
        {
          comparisons,
          swaps,
          depth,
          mergePhase: true,
        }
      );

      k++;
    }

    // Copy remaining elements from left subarray
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;

      yield createStep(
        'swap',
        [k],
        [arr[k]],
        `Placing ${arr[k]} at position ${k}`,
        arr,
        {
          comparisons,
          swaps,
          depth,
          mergePhase: true,
        }
      );

      i++;
      k++;
    }

    // Copy remaining elements from right subarray
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;

      yield createStep(
        'swap',
        [k],
        [arr[k]],
        `Placing ${arr[k]} at position ${k}`,
        arr,
        {
          comparisons,
          swaps,
          depth,
          mergePhase: true,
        }
      );

      j++;
      k++;
    }
  }

  // Execute merge sort
  yield* mergeSortHelper(data, 0, n - 1);

  // Yield final sorted state
  const sortedIndices = Array.from({ length: n }, (_, i) => i);
  yield createStep(
    'sorted',
    sortedIndices,
    data,
    'Array is sorted!',
    data,
    {
      comparisons,
      swaps,
      complete: true,
    }
  );
}
