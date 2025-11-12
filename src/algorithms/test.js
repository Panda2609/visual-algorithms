/**
 * Test file to verify bubbleSort works correctly
 * You can run this in the browser console to see the steps
 */

import { bubbleSort } from './bubbleSort';

/**
 * Test bubbleSort and log all steps
 */
export function testBubbleSort() {
  const testArray = [64, 25, 12, 22, 11];
  console.log('Starting array:', testArray);
  console.log('-----------------------------------');

  const generator = bubbleSort(testArray);
  let stepNumber = 0;

  while (true) {
    const result = generator.next();
    if (result.done) {
      console.log('Sort completed!');
      break;
    }

    stepNumber++;
    const step = result.value;

    console.log(`\nStep ${stepNumber}: ${step.type.toUpperCase()}`);
    console.log(`Message: ${step.message}`);
    console.log(`Indices: ${step.indices.join(', ')}`);
    console.log(`Values: ${step.values.join(', ')}`);
    console.log(`Array: [${step.state.join(', ')}]`);
    console.log(`Metadata:`, step.metadata);
  }
}

// To run in browser console:
// import { testBubbleSort } from './src/algorithms/test';
// testBubbleSort();
