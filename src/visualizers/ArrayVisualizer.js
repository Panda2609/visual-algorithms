import React, { useEffect, useState } from 'react';
import './ArrayVisualizer.css';

/**
 * ArrayVisualizer Component
 * Visualizes array-based algorithm steps with bars and highlighting
 * 
 * Props:
 * - steps: Array of step objects from algorithm generator
 * - currentStepIndex: Current step being displayed
 * - onStepChange: Callback when step changes
 * - speed: Animation speed (1-5, where 1 is fastest)
 */
function ArrayVisualizer({ 
  steps = [], 
  currentStepIndex = 0, 
  onStepChange = () => {}, 
  speed = 2,
  isAnimating = false 
}) {
  const [visualData, setVisualData] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [maxValue, setMaxValue] = useState(100);

  // Initialize with current step
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      setCurrentStep(step);
      
      // Find max value for scaling bars
      if (step.state) {
        const max = Math.max(...step.state);
        setMaxValue(max);
        
        // Prepare visualization data
        const vizData = step.state.map((value, idx) => ({
          value,
          index: idx,
          isHighlighted: step.indices.includes(idx),
          status: getStatusForIndex(idx, step),
        }));
        setVisualData(vizData);
      }
    }
  }, [steps, currentStepIndex]);

  /**
   * Determine the status/color of an element based on the step type
   */
  const getStatusForIndex = (index, step) => {
    if (!step.indices.includes(index)) {
      return 'normal';
    }

    switch (step.type) {
      case 'compare':
        return 'comparing';
      case 'swap':
        return 'swapping';
      case 'sorted':
        return 'sorted';
      case 'complete':
        return 'sorted';
      default:
        return 'normal';
    }
  };

  if (!currentStep) {
    return (
      <div className="array-visualizer empty">
        <p>No data to visualize</p>
      </div>
    );
  }

  const barHeight = 300; // pixels
  const barWidth = Math.min(30, 500 / visualData.length); // responsive width

  return (
    <div className="array-visualizer">
      {/* Header with step info */}
      <div className="visualizer-header">
        <div className="step-info">
          <span className="step-counter">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className={`step-type ${currentStep.type}`}>
            {currentStep.type.toUpperCase()}
          </span>
        </div>
        <div className="step-message">{currentStep.message}</div>
      </div>

      {/* Visualization canvas */}
      <div className="visualization-container">
        <div className="bars-container" style={{ gap: `${Math.max(2, 10 - barWidth)}px` }}>
          {visualData.map((bar, idx) => (
            <div key={idx} className="bar-wrapper">
              <div
                className={`bar ${bar.status}`}
                style={{
                  height: `${(bar.value / maxValue) * barHeight}px`,
                  width: `${barWidth}px`,
                  minWidth: '8px',
                }}
                title={`Index: ${bar.index}, Value: ${bar.value}`}
              >
                {/* Show value for small arrays */}
                {visualData.length <= 15 && (
                  <span className="bar-value">{bar.value}</span>
                )}
              </div>
              {visualData.length <= 15 && (
                <span className="bar-index">{bar.index}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Metadata/Statistics */}
      <div className="visualizer-footer">
        <div className="metadata">
          {currentStep.metadata && (
            <>
              {currentStep.metadata.comparisons !== undefined && (
                <div className="stat">
                  <span className="stat-label">Comparisons:</span>
                  <span className="stat-value">{currentStep.metadata.comparisons}</span>
                </div>
              )}
              {currentStep.metadata.swaps !== undefined && (
                <div className="stat">
                  <span className="stat-label">Swaps:</span>
                  <span className="stat-value">{currentStep.metadata.swaps}</span>
                </div>
              )}
              {currentStep.metadata.pass !== undefined && (
                <div className="stat">
                  <span className="stat-label">Pass:</span>
                  <span className="stat-value">{currentStep.metadata.pass}/{currentStep.metadata.totalPasses}</span>
                </div>
              )}
              {currentStep.metadata.sortedElements !== undefined && (
                <div className="stat">
                  <span className="stat-label">Sorted Elements:</span>
                  <span className="stat-value">{currentStep.metadata.sortedElements}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArrayVisualizer;
