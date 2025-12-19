import React, { useState, useEffect, useRef } from 'react';
import ArrayVisualizer from '../../visualizers/ArrayVisualizer';
import './AlgorithmController.css';
import { getDataset } from '../../data/sampleData';
import { FaPlay } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoPauseSharp } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";

// Import all sorting algorithms
import { bubbleSort } from '../../algorithms/bubbleSort';
import { quickSort } from '../../algorithms/quickSort';
import { mergeSort } from '../../algorithms/mergeSort';

/**
 * Algorithm registry - maps algorithm names to generator functions
 * Easy to extend: just import the algorithm and add to the appropriate category
 */
const algorithmRegistry = {
  Sorting: {
    'Bubble Sort': bubbleSort,
    'Quick Sort': quickSort,
    'Merge Sort': mergeSort,
    // 'Selection Sort': selectionSort,
    // 'Insertion Sort': insertionSort,
    // 'Heap Sort': heapSort,
  },
  Searching: {
    // 'Binary Search': binarySearch,
    // 'Linear Search': linearSearch,
    // 'Jump Search': jumpSearch,
  },
  Graphs: {
    // 'DFS': dfs,
    // 'BFS': bfs,
    // 'Dijkstra': dijkstra,
  },
  Trees: {
    // 'In-Order Traversal': inOrderTraversal,
    // 'Pre-Order Traversal': preOrderTraversal,
    // 'Post-Order Traversal': postOrderTraversal,
  },
};

/**
 * AlgorithmController Component
 * Manages algorithm execution, step-by-step navigation, and playback
 * 
 * Props:
 * - algorithm: Algorithm name to execute
 * - speed: Playback speed (1-5)
 */
function AlgorithmController({ 
  algorithm = 'Bubble Sort', 
  speed = 2,
  onAlgorithmChange = () => {}
}) {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customSpeed, setCustomSpeed] = useState(speed);
  
  const playInterval = useRef(null);
  const algorithmRef = useRef(null);

  /**
   * Generate algorithm steps
   */
  const generateSteps = (alg) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dataset = getDataset();
      let generator;
      let algorithmFound = false;

      // Search through all categories to find the algorithm
      for (const category in algorithmRegistry) {
        if (algorithmRegistry[category][alg]) {
          algorithmFound = true;
          generator = algorithmRegistry[category][alg](dataset);
          break;
        }
      }

      if (!algorithmFound) {
        throw new Error(`Algorithm not found: ${alg}`);
      }

      // Collect all steps from generator
      const allSteps = [];
      let result = generator.next();
      
      while (!result.done) {
        allSteps.push(result.value);
        result = generator.next();
      }

      setSteps(allSteps);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      algorithmRef.current = null;
    } catch (err) {
      setError(err.message);
      setSteps([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Initialize algorithm when props change
   */
  useEffect(() => {
    generateSteps(algorithm);
  }, [algorithm]);

  /**
   * Playback control
   */
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      const speedMap = { 1: 200, 2: 150, 3: 100, 4: 50, 5: 20 };
      const interval = speedMap[customSpeed] || 100;

      playInterval.current = setInterval(() => {
        setCurrentStepIndex((prevIdx) => {
          if (prevIdx < steps.length - 1) {
            return prevIdx + 1;
          } else {
            setIsPlaying(false);
            return prevIdx;
          }
        });
      }, interval);
    } else if (playInterval.current) {
      clearInterval(playInterval.current);
    }

    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    };
  }, [isPlaying, customSpeed, steps.length]);

  /**
   * Handle play button
   */
  const handlePlay = () => {
    if (steps.length > 0) {
      setIsPlaying(true);
    }
  };

  /**
   * Handle pause button
   */
  const handlePause = () => {
    setIsPlaying(false);
  };

  /**
   * Handle reset button
   */
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  /**
   * Handle previous step
   */
  const handlePrevious = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  /**
   * Handle slider change
   */
  const handleSliderChange = (e) => {
    setIsPlaying(false);
    setCurrentStepIndex(parseInt(e.target.value));
  };

  /**
   * Handle speed change
   */
  const handleSpeedChange = (e) => {
    setCustomSpeed(parseInt(e.target.value));
  };

  return (
    <div className="algorithm-controller">
      {error && (
        <div className="error-message">
          <span>⚠️ Error:</span> {error}
        </div>
      )}

      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating steps...</p>
        </div>
      )}

      {!isLoading && steps.length > 0 && (
        <>
          {/* Controls */}
          <div className="controls-container">
            {/* Playback Controls */}
            <div className="playback-controls">
              <button
                className="control-btn"
                onClick={handleReset}
                title="Reset"
                disabled={isLoading}
              >
                <RiResetLeftLine />
              </button>

              <button
                className={`control-btn ${isPlaying ? 'hidden' : ''}`}
                onClick={handlePlay}
                title="Play"
                disabled={isLoading || currentStepIndex >= steps.length - 1}
              >
                <FaPlay />
              </button>

              <button
                className={`control-btn ${isPlaying ? '' : 'hidden'}`}
                onClick={handlePause}
                title="Pause"
                disabled={isLoading}
              >
                <IoPauseSharp /> 
              </button>

              <button
                className="control-btn"
                onClick={handlePrevious}
                title="Previous Step"
                disabled={isLoading || currentStepIndex === 0}
              >
                <GrFormPrevious />
              </button>

              <button
                className="control-btn"
                onClick={handleNext}
                title="Next Step"
                disabled={isLoading || currentStepIndex >= steps.length - 1}
              >
                <MdOutlineNavigateNext />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <input
                type="range"
                min="0"
                max={Math.max(0, steps.length - 1)}
                value={currentStepIndex}
                onChange={handleSliderChange}
                className="progress-slider"
                disabled={isLoading}
              />
              <span className="progress-text">
                {currentStepIndex + 1} / {steps.length}
              </span>
            </div>

            {/* Speed Control */}
            <div className="speed-section">
              <label htmlFor="speed-control">Speed:</label>
              <div className="speed-input-group">
                <input
                  id="speed-control"
                  type="range"
                  min="1"
                  max="5"
                  value={customSpeed}
                  onChange={handleSpeedChange}
                  className="speed-slider"
                  disabled={isLoading}
                />
                <span className="speed-label">
                  {['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'][customSpeed - 1]}
                </span>
              </div>
            </div>
          </div>
          {/* Visualizer */}
          <ArrayVisualizer
            steps={steps}
            currentStepIndex={currentStepIndex}
            speed={customSpeed}
            isAnimating={isPlaying}
          />
        </>
      )}
    </div>
  );
}

export default AlgorithmController;
