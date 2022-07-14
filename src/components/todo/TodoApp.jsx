import React, { Component } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom" // to assign components to routes in url
import withNavigation from "./WithNavigation.jsx";
import withParams from "./withParams.jsx";
import AuthenticationService from "./AuthenticationService.js";

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent />
                        <Routes>
                            <Route path="/" element={<LoginComponentWithNavigation />} />
                            {/*display login component on /login of url*/}
                            <Route path="/login" element={<LoginComponentWithNavigation />} />
                            {/*display welcome component on /welcome of url*/}
                            <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                            <Route path="/todo" element={<ListTodosComponent />} />
                            <Route path="/logout" element={<LogoutComponent />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                        <FooterComponent />
                    </>
                </Router>

                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        );
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/jkumz" className="navbar-brand">Janusz Kumor</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link"><Link to="/welcome/Janusz">Home</Link></li>
                        <li className="nav-link"><Link to="/todo" onClick={AuthenticationService.logout}>Todo</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li className="nav-link"><Link to="/login">Sign in</Link></li>
                        <li className="nav-link"><Link to="/logout">Sign out</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">A simple to-do list web app made by Janusz Kumor.</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <div>
                    <h1>You have successfully signed out!</h1>
                    <div className="container">
                        Thank you for using my todo list application.
                    </div>
                </div>
            </>
        )
    }
}

class ListTodosComponent extends Component {
    // pass props onto constructor
    constructor(props) {
        // in react, all consturctors need to call super(props)
        super(props)
        this.state = {
            todos:
                [
                    { id: 1, description: "d1", done: false, targetDate: new Date() },
                    { id: 2, description: "d2", done: false, targetDate: new Date() },
                    { id: 3, description: "d3", done: false, targetDate: new Date() }
                ]
        }
    }

    render() {
        return <div>
            <h1>List todos</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Desc.</th>
                            <th>Done?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                item =>
                                    <tr>
                                        <td>{item.description}</td>
                                        <td>{item.done.toString()}</td>
                                        <td>{item.targetDate.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
}

// to be displayed on welcome page
class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome {this.props.params.name}!</h1>
                <div class="container">
                    You can manage your Todo List < Link to="/todo" > here.</Link >
                </div>
            </>
        )
    }
}

// to be displayed if user attempts to access an undefined route
function ErrorComponent() {
    return <div>Error!</div>
}

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

// below functions not needed - done in one liners in render method

// function ShowLoginSuccessMessage(props) {
//     if (props.showSuccessMessage) {
//         return <div>Logged in successfully</div>
//     }
//     return null
// }

// function ShowInvalidCredentials(props) {
//     if (props.hasLoginFailed) {
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }
export default TodoApp