import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar() {
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
    };

    const handleAlgorithmChange = (e) => setSelectedAlgorithm(e.target.value);
    const handleSizeChange = (e) => setSelectedSize(e.target.value);

    return (
        <>
            <div className='container'>

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

                <div className='selection-preview' style={{marginTop:12, padding:8, background:'rgba(0,0,0,0.03)'}}>
                    <strong>Selección actual</strong>
                    <div>Estructura: {selectedStructure}</div>
                    <div>Algoritmo: {selectedAlgorithm}</div>
                    <div>Tamaño: {selectedSize}</div>
                    <pre style={{marginTop:8, fontSize:12}}>{JSON.stringify({ selectedStructure, selectedAlgorithm, selectedSize }, null, 2)}</pre>
                </div>
            </div>
        </>
    );
}

export default FilterBar;