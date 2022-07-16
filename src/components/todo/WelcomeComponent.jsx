import React, { Component } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom" // to assign components to routes in url

// to be displayed on welcome page
class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome {this.props.params.name}!</h1>
                <div className="container">
                    You can manage your Todo List < Link to="/todo" > here.</Link >
                </div>
            </>
        )
    }
}

export default WelcomeComponent;