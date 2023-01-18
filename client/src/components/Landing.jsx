import React from "react"
import { Link } from "react-router-dom";
import '../App.css';

 function Landing() {
    return (
        <>
        <div className="App">
            <h1>Henry Dogs</h1>
        </div>
        <Link to={"/home"}><button>home</button></Link>
        </>
        
    )
}

export default Landing