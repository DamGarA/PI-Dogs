import React from "react";
import { Link, useParams } from "react-router-dom";
import breedCreatedStyles from "../css modules/breedCreated.module.css"

function BreedCreated () {
    const { id } = useParams()

    return (
        <div className={breedCreatedStyles.allBreed}>
            <h2 className={breedCreatedStyles.titleBreed}>Created!!</h2>
            <Link className={breedCreatedStyles.underline_off} to={`/detail/${id}`}><button className={breedCreatedStyles.seeBreed}>See Created Breed</button></Link>
            <Link className={breedCreatedStyles.underline_off} to='/form'><button className={breedCreatedStyles.seeBreed}>Create other breed</button></Link>
            <Link className={breedCreatedStyles.underline_off} to='/home'><button className={breedCreatedStyles.seeBreed}>Back to home page</button></Link>
        </div>
    )
}

export default BreedCreated