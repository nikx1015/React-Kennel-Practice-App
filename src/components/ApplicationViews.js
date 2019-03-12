import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'
import AnimalAPIManager from '../modules/AnimalManager'
import employeeAPIManager from '../modules/EmployeeManager'
import ownerAPIManager from '../modules/OwnerManager'
import locationAPIManager from '../modules/LocationManager'
import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owners/OwnerDetail'


class ApplicationViews extends Component {

  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  };

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals => this.setState({
        animals: animals
      })
      )
  }

  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(e => e.json())
      .then(owners => this.setState({
        owners: owners
      })
      )
  }

  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/employees`))
      .then(e => e.json())
      .then(employees => this.setState({
        employees: employees
      })
      )
  }

  componentDidMount() {
    const newState = {};
    return employeeAPIManager.getAll()
      .then(parsedEmployees => {
        newState.employees = parsedEmployees;
        return locationAPIManager.getAll()
      })
      .then(parsedLocations => {
        newState.locations = parsedLocations;
        return ownerAPIManager.getAll();
      })
      .then(parsedOwners => {
        newState.owners = parsedOwners;
        // fetching from the api manager
        return AnimalAPIManager.getAll();
      })
      .then(parsedAnimals => {
        newState.animals = parsedAnimals;
        this.setState(newState);
      })
  }
  // componentDidMount() {
  //     const newState = {}

  //     fetch("http://localhost:5002/animals")
  //         .then(r => r.json())
  //         .then(animals => newState.animals = animals)
  //         .then(() => fetch("http://localhost:5002/employees")
  //         .then(r => r.json()))
  //         .then(employees => newState.employees = employees)
  //         .then(()=> fetch("http://localhost:5002/animalOwners")
  //         .then(r=>r.json()))
  //         .then(animalOwners => newState.animalOwners = animalOwners)
  //         .then(()=> fetch("http://localhost:5002/owners")
  //         .then(r => r.json()))
  //         .then(owners => newState.owners = owners)
  //         .then(()=> fetch("http://localhost:5002/locations")
  //         .then(r=>r.json()))
  //         .then(locations => newState.locations = locations)
  //         .then(() => this.setState(newState))
  // }


  render() {
    return (
      <div className="container-div">
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route exact path="/animals" render={(props) => {
          return <AnimalList animals={this.state.animals} />
        }} />
        <Route path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route exact path="/employees" render={(props) => {
          return <EmployeeList employees={this.state.employees} />
        }} />
        <Route path="/employees/:employeeId(\d+)" render={(props) => {
          return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
        }} />
        <Route exact path="/owners" render={(props) => {
          return <OwnerList owners={this.state.owners} />
        }} />
        <Route path="/owners/:ownerId(\d+)" render={(props) => {
          return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
        }} />
      </div>
    )
  }
}

export default ApplicationViews