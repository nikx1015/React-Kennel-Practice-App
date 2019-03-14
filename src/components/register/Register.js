  // Set initial state
  import React, { Component } from "react"


export default class Register extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        location: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleRegister = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />

                <button type="submit">
                    Create Account
                </button>
            </form>
        )
    }
}