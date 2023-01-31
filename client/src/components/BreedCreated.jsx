import React from "react";
import { Link, useParams } from "react-router-dom";
import breedCreatedStyles from "../css modules/breedCreated.module.css"

function BreedCreated () {
    const { id } = useParams()

    const backToHome = () => {
        window.location.href = "/home";
    }

    return (
        <div className={breedCreatedStyles.allBreed}>
            <h2 className={breedCreatedStyles.titleBreed}>Created!!</h2>
            <Link className={breedCreatedStyles.underline_off} to={`/detail/${id}`}><button className={breedCreatedStyles.seeBreed}>See Created Breed</button></Link>
            <Link className={breedCreatedStyles.underline_off} to='/form'><button className={breedCreatedStyles.seeBreed}>Create other breed</button></Link>
            <button className={breedCreatedStyles.seeBreed} onClick={backToHome}>Back to home page</button>
        </div>
    )
}

export default BreedCreated