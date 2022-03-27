import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
    
const UpdateForm = (props) => {
    const [petInfo, setPetInfo] = useState({
        petName: "",
        type: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });
    const [formErrors, setFormErrors] = useState({})
    const { _id } = useParams();
    const history = useHistory();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res => {
                if(res.data.error){
                    history.push('/error')
                }
                else{
                    setPetInfo(res.data.results);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const changeHandler = (e)=>{
        setPetInfo({
            ...petInfo,
            [e.target.name]: e.target.value
        })
    }
    
    const updatePet = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/update/${_id}`, petInfo)
            .then(res => {
                if(res.data.error){
                    setFormErrors(res.data.error.errors);
                }
                else{
                    setPetInfo(res.data.results);
                    setFormErrors({});
                    history.push('/')
                }
            })    
            .catch(err => console.error(err));
    }
    
    return (
        <form onSubmit={updatePet} className="container">
            <h2>Edit {petInfo.petName}:</h2>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Name: </label><br />
                        <input type="text" name="petName" className="form-control" placeholder="Enter Name" value={petInfo.petName} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.petName?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Type: </label><br />
                        <input type="text" name="type" className="form-control" placeholder="Enter Type" value={petInfo.type} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.type?.message}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Description: </label><br />
                        <input type="text" name="description" className="form-control" placeholder="Enter Description" value={petInfo.description} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.description?.message}</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Skill 1: </label><br />
                        <input type="text" name="skill1" className="form-control" placeholder="Enter Skill" value={petInfo.skill1} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.skill1?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Skill 2: </label><br />
                        <input type="text" name="skill2" className="form-control" placeholder="Enter Skill" value={petInfo.skill2} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.skill2?.message}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Skill 3: </label><br />
                        <input type="text" name="skill3" className="form-control" placeholder="Enter Skill" value={petInfo.skill3} onChange={changeHandler} />
                        <p className="text-danger">{formErrors.skill3?.message}</p>
                    </div>
                </div>
                </div>
            </div>
            <Link className="btn btn-secondary mx-1" to={"/"}>Cancel</Link>
            <button type="submit" class="btn btn-dark mx-1">Update Pet!</button>
        </form>
    )
}
    
export default UpdateForm;