import { useState } from "react";
import FilterBar from "../components/filterBar/Filterbar";
import AlgorithmController from "../components/algorithmController/AlgorithmController";
import './Home.css';

function Home(){
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
    const [selectedSize, setSelectedSize] = useState('small');

    return(
        <div className="home-container">
            <div className="home-header">
                <h1>Visual Algorithms</h1>
                <p>Learn how sorting algorithms work</p>
            </div>
            
            <div className="home-content">
                <FilterBar 
                    onAlgorithmChange={setSelectedAlgorithm}
                    onSizeChange={setSelectedSize}
                />
                
                <AlgorithmController 
                    algorithm={selectedAlgorithm}
                    dataSize={selectedSize}
                />
                
            </div>
        </div>
    );
}

export default Home;