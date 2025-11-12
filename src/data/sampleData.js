/**
 * Sample datasets for algorithm visualization
 * Contains predefined arrays of different sizes and utility functions
 */

// Small dataset - ideal for step-by-step visualization
export const smallDataset = [64, 25, 12, 22, 11, 90, 88, 45, 50, 32];

// Medium dataset - good for seeing algorithm performance
export const mediumDataset = [
  45, 38, 52, 41, 33, 27, 61, 48, 55, 49,
  35, 58, 42, 29, 63, 51, 37, 44, 30, 57
];

// Large dataset - for stress testing and comparing algorithms
export const largeDataset = [
  85, 42, 78, 61, 23, 91, 54, 34, 67, 89,
  12, 47, 73, 28, 56, 81, 39, 65, 19, 50,
  74, 36, 62, 88, 22, 68, 31, 77, 44, 93,
  15, 59, 71, 26, 84, 48, 69, 33, 55, 87,
  18, 60, 76, 29, 64, 41, 70, 37, 82, 51,
  24, 79, 46, 58, 11, 72, 53, 35, 80, 63
];

// Sorted dataset (for testing best/worst cases)
export const sortedDataset = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

// Reverse sorted dataset (worst case for bubble sort)
export const reverseSortedDataset = Array.from({ length: 20 }, (_, i) => 100 - (i * 5));

// Dataset with duplicates
export const duplicatesDataset = [
  50, 30, 50, 20, 70, 30, 50, 90, 20, 70,
  30, 50, 20, 70, 30, 50, 90, 20, 70, 30
];

/**
 * All datasets organized by size
 */
export const datasetsBySize = {
  small: smallDataset,
  medium: mediumDataset,
  large: largeDataset,
};

/**
 * Special datasets for testing
 */
export const specialDatasets = {
  sorted: sortedDataset,
  reverseSorted: reverseSortedDataset,
  duplicates: duplicatesDataset,
};

/**
 * Get dataset by size name
 * @param {string} size - 'small', 'medium', or 'large'
 * @returns {number[]} - Copy of the dataset
 */
export function getDatasetBySize(size) {
  const dataset = datasetsBySize[size] || smallDataset;
  return [...dataset]; // Return a copy to avoid mutations
}

/**
 * Generate a random dataset of specified size
 * @param {number} length - Number of elements
 * @param {number} maxValue - Maximum value (default: 100)
 * @returns {number[]} - Random dataset
 */
export function generateRandomDataset(length = 20, maxValue = 100) {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * maxValue) + 1
  );
}

/**
 * Shuffle an array (Fisher-Yates shuffle)
 * @param {number[]} arr - Array to shuffle
 * @returns {number[]} - Shuffled copy of the array
 */
export function shuffleDataset(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Linked List node structure
 */
export class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Create a linked list from an array
 * @param {number[]} arr - Array of values
 * @returns {LinkedListNode} - Head of the linked list
 */
export function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const head = new LinkedListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new LinkedListNode(arr[i]);
    current = current.next;
  }
  return head;
}

/**
 * Convert linked list to array for easier manipulation
 * @param {LinkedListNode} head - Head of the linked list
 * @returns {number[]} - Array representation
 */
export function linkedListToArray(head) {
  const arr = [];
  let current = head;
  while (current) {
    arr.push(current.value);
    current = current.next;
  }
  return arr;
}

/**
 * Binary tree node structure
 */
export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * Create a balanced binary search tree from a sorted array
 * @param {number[]} arr - Sorted array
 * @param {number} start - Start index
 * @param {number} end - End index
 * @returns {TreeNode} - Root of the BST
 */
export function createBalancedBST(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const root = new TreeNode(arr[mid]);

  root.left = createBalancedBST(arr, start, mid - 1);
  root.right = createBalancedBST(arr, mid + 1, end);

  return root;
}
