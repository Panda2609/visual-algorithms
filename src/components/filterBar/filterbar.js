import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ onAlgorithmChange = () => {}, onSizeChange = () => {} }) {
    const dataStructures = ['Array', 'Linked List', 'Tree'];
    const algorithmsByStructure = {
        Array: ['Bubble Sort', 'Quick Sort', 'Binary Search'],
        'Linked List': ['Insertion', 'Merge', 'Search'],
        Tree: ['DFS', 'BFS'],
    };
    const sizes = ['small', 'medium', 'large'];

    const [selectedStructure, setSelectedStructure] = useState(dataStructures[0]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithmsByStructure[dataStructures[0]][0]);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const handleStructureChange = (e) => {
        const s = e.target.value;
        setSelectedStructure(s);
        const firstAlg = (algorithmsByStructure[s] && algorithmsByStructure[s][0]) || '';
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
                    Structure:
                    <select value={selectedStructure} onChange={handleStructureChange}>
                        {dataStructures.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Algorithm:
                    <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                        {(algorithmsByStructure[selectedStructure] || []).map((a) => (
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