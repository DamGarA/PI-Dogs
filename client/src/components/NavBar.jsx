import React from "react";
import { Link } from "react-router-dom";
import navStyles from "../css modules/navBar.module.css"

function NavBar() {
    return (
        <div className={navStyles.divBar}>
            <Link className={navStyles.underline_off} to="/home"><button className={navStyles.button_formAndHome}>Home</button></Link>
            <Link className={navStyles.underline_off} to="/form"><button className={navStyles.button_formAndHome}>Form</button></Link>
        </div>
    )
}

export default NavBar