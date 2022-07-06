import React, { Component } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom" // to assign components to routes in url
import withNavigation from "./WithNavigation.jsx";
import withParams from "./withParams.jsx";

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
                <nav className="navbar navbar-expand-md">
                    <div><a>Janusz Kumor</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link">Home</li>
                        <li className="nav-link">Todo</li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li className="nav-link">Sign in</li>
                        <li className="nav-link">Sign out</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                Footer <hr />
            </div>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
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
            <table>
                <thead>
                    <tr>
                        <th>#</th>
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
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.done.toString()}</td>
                                    <td>{item.targetDate.toString()}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>
            Welcome {this.props.params.name}. You can manage your Todo List <Link to="/todo">here.</Link>
        </div>
    }
}

function ErrorComponent() {
    return <div>Error!</div>
}

// controlled component --> everything dictated by state inside login component
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Enter username here",
            password: "password",
            hasLoginFailed: false,
            showSuccessMessage: false
        }
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
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage} /> */}
                {this.state.showSuccessMessage && <div>Logged in successfully</div>}
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClick}>Log in</button>
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