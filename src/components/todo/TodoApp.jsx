import React, { Component } from "react"

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <LoginComponent />
            </div>
        );
    }
}

// controlled component --> everything dictated by state inside login component
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Enter username here",
            password: "password"
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

    // function to handle user typing username in
    // handleUsernameChange(event) { // any action performed in HTML is an event, in react it is a synthetic event
    //     console.log(event.target.value)
    //     this.setState(
    //         {
    //             [event.target.name]
    //                 :event.target.value
    //         }
    //     )
    // }

    // function to handle user typing password in
    // handlePasswordChange(event) { // any action performed in HTML is an event, in react it is a synthetic event
    //     console.log(event.target.value)
    //     this.setState(
    //         {
    //             [event.target.name]
    //                 :event.target.value
    //         }
    //     )
    // }

    render() {
        return (
            <>
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                <button>Log in</button>
            </>
        );
    }
}
export default TodoApp