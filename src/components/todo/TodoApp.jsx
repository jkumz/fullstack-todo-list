import React, { Component } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom" // to assign components to routes in url
import withNavigation from "./WithNavigation.jsx";
import withParams from "./withParams.jsx";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ListTodosComponent from "./ListTodosComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponentWithNavigation />
                        <Routes>
                            <Route path="/" element={<LoginComponentWithNavigation />} />
                            <Route path="/login" element={<LoginComponentWithNavigation />} />
                            {/*display welcome component on /welcome of url*/}
                            <Route path="/welcome/:name" element={
                                <AuthenticatedRoute>
                                    <WelcomeComponentWithParams />
                                </AuthenticatedRoute>} />
                            <Route path="/todo" element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>} />
                            <Route path="/logout" element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>} />
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

export default TodoApp