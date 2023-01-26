import React from "react"
import { Link } from "react-router-dom";
import '../App.css';
import landingStyles from '../css modules/landing.module.css'

 function Landing() {
    return (
        <div className={landingStyles.allLanding}>
            <div className={landingStyles.titleLanding}>
                <h2>PI Henry Dogs</h2>
            </div>
            <h3 className={landingStyles.name}>by Damian Garcia Abreu</h3>
        <Link to={"/home"} className={landingStyles.underline_off}><button className={landingStyles.welcomeBtn}>Welcome!!!</button></Link>
        </div>
        
    )
}

export default Landing