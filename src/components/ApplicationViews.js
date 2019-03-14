import { Route, Redirect } from 'react-router-dom'
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
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owners/OwnerForm'
import Login from './authentication/Login'
import Register from './register/Register'
import AnimalEditForm from './animal/AnimalEditForm'


class ApplicationViews extends Component {

  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  };
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  // deleteAnimal = id => {
  //   return fetch(`http://localhost:5002/animals/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(e => e.json())
  //     .then(() => fetch(`http://localhost:5002/animals`))
  //     .then(e => e.json())
  //     .then(animals => this.setState({
  //       animals: animals
  //     })
  //     )
  // }

  deleteAnimal = id => {
    return AnimalAPIManager.deleteAnimal(id).then(animals =>
      this.setState({
        animals: animals
      })
    );
  };

  addAnimal = animalObject =>
    AnimalAPIManager.postAnimal(animalObject)
      .then(() => AnimalAPIManager.getAll()).then(animals =>
        this.setState({
          animals: animals
        })
      );

      updateAnimal = (editedAnimalObject) => {
        return AnimalAPIManager.put(editedAnimalObject)
        .then(() => AnimalAPIManager.getAll())
        .then(animals => {
          this.setState({
            animals: animals
          })
        });
      };

  deleteOwner = id => {
    return ownerAPIManager.deleteOwner(id).then(owners =>
      this.setState({
        owners: owners
      })
    );
  };

  addOwner = ownerObject =>
    ownerAPIManager.postOwner(ownerObject)
      .then(() => ownerAPIManager.getAll()).then(owners =>
        this.setState({
          owners: owners
        })
      );

  addEmployee = employeeObject =>
    employeeAPIManager.postEmployee(employeeObject)
      .then(() => employeeAPIManager.getAll()).then(employees =>
        this.setState({
          employees: employees
        })
      );

  deleteEmployee = id => {
    return employeeAPIManager.deleteEmployee(id).then(employees =>
      this.setState({
        employees: employees
      })
    );
  };

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



  render() {
    return (
      <div className="container-div">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations} />
        }} />
        <Route exact path="/animals" render={props => {
          if (this.isAuthenticated()) {
            return <AnimalList
              animals={this.state.animals} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
            addAnimal={this.addAnimal}
            employees={this.state.employees} />
        }} />
        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
        }} />
        <Route
          path="/animals/:animalId(\d+)/edit" render={props => {
            return <AnimalEditForm {...props} employees={this.state.employees} updateAnimal={this.updateAnimal} />
          }}
        />
        <Route exact path="/employees" render={props => {
          if (this.isAuthenticated()) {
            return <EmployeeList
              employees={this.state.employees} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/employees/new" render={(props) => {
          return <EmployeeForm {...props}
            addEmployee={this.addEmployee}
            employees={this.state.employees} />
        }} />
        <Route path="/employees/:employeeId(\d+)" render={(props) => {
          return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
        }} />
        <Route exact path="/owners" render={props => {
          if (this.isAuthenticated()) {
            return <OwnerList
              owners={this.state.owners} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/owners/new" render={(props) => {
          return <OwnerForm {...props}
            addOwner={this.addOwner}
            owners={this.state.owners} />
        }} />
        <Route path="/owners/:ownerId(\d+)" render={(props) => {
          return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
        }} />
      </div>
    )
  }
}

export default ApplicationViews