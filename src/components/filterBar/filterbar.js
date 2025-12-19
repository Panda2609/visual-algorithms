import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onAlgorithmChange = () => {}, onSizeChange = () => {} }) {
    // Algorithm categories instead of data structures
    const algorithmCategories = ['Sorting', 'Searching', 'Graphs', 'Trees'];
    
    // Algorithms organized by category for scalability
    const algorithmsByCategory = {
        Sorting: [
            'Bubble Sort',
            'Quick Sort',
            'Merge Sort',
            // 'Selection Sort',
            // 'Insertion Sort',
            // 'Heap Sort',
        ],
        Searching: [
            // 'Binary Search',
            // 'Linear Search',
            // 'Jump Search',
        ],
        Graphs: [
            // 'DFS',
            // 'BFS',
            // 'Dijkstra',
        ],
        Trees: [
            // 'In-Order Traversal',
            // 'Pre-Order Traversal',
            // 'Post-Order Traversal',
        ],
    };
    
    const sizes = ['small', 'medium', 'large'];

    const [selectedCategory, setSelectedCategory] = useState(algorithmCategories[0]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmsByCategory[algorithmCategories[0]][0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        const firstAlg = (algorithmsByCategory[category] && algorithmsByCategory[category][0]) || '';
        setSelectedAlgorithm(firstAlg);
        onAlgorithmChange(firstAlg);
    };

    const handleAlgorithmChange = (e) => {
        const alg = e.target.value;
        setSelectedAlgorithm(alg);
        onAlgorithmChange(alg);
    };

    const handleSizeChange = (e) => {
        const sz = e.target.value;
        setSelectedSize(sz);
        onSizeChange(sz);
    };

    return (
        <>
            <div className='bar-container'>
                <label>
                    Category:
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        {algorithmCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Algorithm:
                    <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                        {(algorithmsByCategory[selectedCategory] || []).map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Size:
                    <select value={selectedSize} onChange={handleSizeChange}>
                        {sizes.map((sz) => (
                            <option key={sz} value={sz}>{sz}</option>
                        ))}
                    </select>
                </label>
            </div>
    </>
    );
}

export default FilterBar;