import React, { Component } from "react"
import AuthenticationService from "./AuthenticationService.js"

// controlled component --> everything is dictated by the state inside login component
// i.e, form data handled by state of component!
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Enter username here",
            password: "password",
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // need to bind functions to component instance, i.e in constructor
        // this is so that these "event handler" functions can have access
        // to the parent component (LoginComponent in this case!)
        this.handleChange = this.handleChange.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }


    // function to handle user typing in input
    // works for any field as it uses event.target.name
    // only works if form elements (in render) have same names as in states in component
    handleChange(event) {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    // log in authentication
    loginClick() {
        if (this.state.username === 'username' && this.state.password === 'password') {
            // store authenticated user into session storage
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.navigate(`/welcome/${this.state.username}`)
            //this.setState({ showSuccessMessage: true })
        }
        else {
            this.setState({ hasLoginFailed: true })
        }
    }

    render() {
        return (
            // {ifConditionTrue && message to display if true} --> format for boolean 1 liners
            <>
                <h1>Sign in</h1>
                <div className="container">
                    {/* show an alert when wrong credentials input */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn=s" onClick={this.loginClick}>Log in</button>
                </div>
            </>
        );
    }
}

export default LoginComponent