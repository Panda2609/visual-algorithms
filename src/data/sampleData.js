/**
 * Sample datasets for algorithm visualization
 * Standard size: 20 elements for consistent visualization
 */

// Standard dataset - 20 elements for algorithm visualization
export const standardDataset = [
  45, 38, 52, 41, 33, 27, 61, 48, 55, 49,
  35, 58, 42, 29, 63, 51, 37, 44, 30, 57
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
 * Special datasets for testing
 */
export const specialDatasets = {
  sorted: sortedDataset,
  reverseSorted: reverseSortedDataset,
  duplicates: duplicatesDataset,
};

// ============================================
// DATASET UTILITY FUNCTIONS
// ============================================

/**
 * Get standard dataset
 * @returns {number[]} - Copy of the standard dataset
 */
export function getDataset() {
  return [...standardDataset];
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
