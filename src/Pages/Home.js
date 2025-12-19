import { useState } from "react";
import FilterBar from "../components/filterBar/Filterbar";
import AlgorithmController from "../components/algorithmController/AlgorithmController";
import './Home.css';

function Home(){
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');

    return(
        <div className="home-container">
            <div className="home-header">
                <h1>Visual Algorithms</h1>
                <p>Learn how algorithms work with visual step-by-step execution</p>
            </div>
            
            <div className="home-content">
                <FilterBar 
                    onAlgorithmChange={setSelectedAlgorithm}
                />
                
                <AlgorithmController 
                    algorithm={selectedAlgorithm}
                />
                
            </div>
        </div>
    );
}

export default Home;