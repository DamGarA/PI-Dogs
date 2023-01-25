import React from "react"
import { Link } from "react-router-dom";
import '../App.css';

 function Landing() {
    return (
        <>
        <div className="App">
            <h2>Henry Dogs</h2>
        </div>
        <Link to={"/home"}><button>home</button></Link>
        </>
        
    )
}

export default Landing