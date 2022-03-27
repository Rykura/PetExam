import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
    
const PetDetail = () => {
    const { _id } = useParams();
    const [pet, setPet] = useState({})
    const history = useHistory();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res => setPet(res.data.results))
            .catch(err => console.error(err));
    }, []);

    const deletePet = ()=>{
        axios.delete(`http://localhost:8000/api/pets/delete/${_id}`)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log(err)
            })
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='col-9'>Details about: {pet.petName}</h1>
                <button onClick = {deletePet} className='btn btn-danger col'>Adopt {pet.petName}</button>
            </div>
            <br />
            <div className="card mb-1">
                    <div className="card-body">
                        <h1 className="card-title">{pet.petName}</h1>
                        <h3 className="card-subtitle mb-2 text-muted">{pet.type}</h3>
                        <h4 className="card-text">Description: {pet.description}</h4>
                        <br />
                        <h4>Skill 1: {pet.skill1}</h4>
                        <h4>Skill 2: {pet.skill2}</h4>
                        <h4>Skill 3: {pet.skill3}</h4>
                        
                    </div>
                </div>
        </div>
    )
}
    
export default PetDetail;