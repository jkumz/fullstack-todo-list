import React, { Component } from "react"
import AuthenticationService from "./AuthenticationService";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/jkumz" className="navbar-brand">Janusz Kumor</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-link"><Link to="/welcome/:name">Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/todo">Todo</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-link"><Link to="/login">Sign in</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Sign out</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent;