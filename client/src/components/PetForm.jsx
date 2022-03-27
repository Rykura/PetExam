import React, { useState } from 'react'
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";


const PetForm = (props) => {
    const [petName, setPetName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})

    const createPet = (e) => {
        e.preventDefault();
        let formInputs = {petName, type, description, skill1, skill2, skill3 };

        axios.post('http://localhost:8000/api/pets/new', formInputs)
            .then(res => {
                console.log(res);
                if(res.data.error){
                    setFormErrors(res.data.error.errors);
                }
                else{
                    props.setLoaded(!props.loaded)
                    setPetName("");
                    setType("");
                    setDescription("");
                    setSkill1("");
                    setSkill2("");
                    setSkill3("");
                    setFormErrors({});
                    history.push("/")
                }
            })    
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={createPet}>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Name: </label><br/>
                        <input type="text" className="form-control" placeholder="Enter Name" onChange={(e)=>setPetName(e.target.value)} value={petName}/>
                        <p className="text-danger">{formErrors.petName?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Type: </label><br/>
                        <input type="text" className="form-control" placeholder="Enter Type" onChange={(e)=>setType(e.target.value)} value={type}/>
                        <p className="text-danger">{formErrors.type?.message}</p>
                    </div>
                </div>
            </div>
                <div class="col">
                    <div class="form-group">
                        <label>Description: </label><br/>
                        <input type="text" row="3" className="form-control" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                        <p className="text-danger">{formErrors.description?.message}</p>
                    </div>
                </div>
            <div class="row">
                <h6>Optional:</h6>
                <div class="col">
                    <div class="form-group">
                        <label>Skill 1: </label><br/>
                        <input type="text" className="form-control" placeholder="Enter Skill" onChange={(e)=>setSkill1(e.target.value)} value={skill1}/>
                        <p className="text-danger">{formErrors.skill1?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Skill 2: </label><br/>
                        <input type="text" className="form-control" placeholder="Enter Skill" onChange={(e)=>setSkill2(e.target.value)} value={skill2}/>
                        <p className="text-danger">{formErrors.skill2?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Skill 3: </label><br/>
                        <input type="text" className="form-control" placeholder="Enter Skill" onChange={(e)=>setSkill3(e.target.value)} value={skill3}/>
                        <p className="text-danger">{formErrors.skill3?.message}</p>
                    </div>
                </div>
            </div>
            <Link className="btn btn-secondary mx-1" to={"/"}>Cancel</Link>
            <button type="submit" className="btn btn-dark mx-1">Add Pet</button>
        </form>
    )
}

export default PetForm;