import React, { Component } from "react"
import AuthenticationService from "./AuthenticationService.js"
import { Navigate } from "react-router-dom"

/* makes it so that certain routes are only accessible once user is authenticated
uses spread operator ({...this.props}) to take props from <Route> in HeaderComponentWithNavigation
then if user is authenticated it will call the route method with the props
else it will redirect user to login page */
class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return { ...this.props.children }
        } else {
            return <Navigate to="/login" />
        }
    }
}

export default AuthenticatedRoute