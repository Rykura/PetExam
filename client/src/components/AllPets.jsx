import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    Link
} from "react-router-dom";

    
const AllPets = (props) => {
    const [petList, setPetList] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets')
            .then(res=>{
                setPetList(res.data.results.sort((a,b) => a.type.localeCompare(b.type)));
            })
            .catch(err => console.error(err));
    },[props.loaded]);
    
    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pets/delete/' + petId)
            .then(res => {
                let filteredList = petList.filter((pet)=>{
                    return pet._id != petId
                })
                setPetList(filteredList)
            })
            .catch(err => console.error(err));
    }
    return (
        <div class="container">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {petList.map((pet) =>
                    <tr key={pet._id}>
                        <th scope="row">
                            {pet.petName}</th>
                        <td>{pet.type}</td>
                        <td>
                            <Link className="btn btn-sm btn-dark mx-1" to={"/pet/details/" + pet._id}>Details</Link>
                            <Link className="btn btn-sm btn-secondary mx-1" to={"/pet/edit/" + pet._id}>Edit</Link>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <Link to="/add" className="btn btn-primary">Add Pet!</Link>
        </div>
    )
}
    
export default AllPets;
