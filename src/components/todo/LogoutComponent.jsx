import React, { Component } from "react"

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

export default LogoutComponent;