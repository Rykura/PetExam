import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";
import AllPets from './components/AllPets';
import PetForm from './components/PetForm';
import UpdateForm from './components/UpdateForm';
import PetDetail from './components/PetDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
      <nav class="navbar navbar-dark bg-dark px-5">
          <h1 className='text-white'>Adopt.com</h1>
          <Link to="/" className="btn btn-primary">Home</Link>
        </nav>
        <br></br>
      </div>
      <Switch>
        <Route exact path="/">
          <h2 class="text-center">Our Shelter</h2>
          <br></br>
          <AllPets loaded = {loaded}></AllPets>
        </Route>
        <Route exact path="/add">
            <div class="d-flex justify-content-around">
              <div class="container">
                <h2 class="text-center">Add a Pet!</h2>
                <br></br>
                <PetForm loaded = {loaded} setLoaded = {setLoaded}></PetForm>
              </div>
              <br></br>
            </div>
        </Route>
        <Route exact path="/pet/details/:_id">
          <PetDetail loaded = {loaded}></PetDetail>
        </Route>
        <Route path="/pet/edit/:_id">
          <UpdateForm></UpdateForm>
        </Route>
        <Route exact path="/error">
            <div class="alert alert-primary container" role="alert">
              <h4 class="alert-heading">We're sorry, but we could not find the pet you are looking for.</h4>
              <p>Would you like to add this pet to our database?</p>
              <hr />
              <Link to="/add" className="btn btn-primary">Add Pet</Link>
            </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
