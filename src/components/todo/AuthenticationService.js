// class used to store authenticated user into session storage
class AuthenticationService {

    registerSuccessfulLogin(username, password) {
        console.log("registerSuccessfulLogin")
        sessionStorage.setItem("authenticatedUser", username);
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser");
        // if user is null, then the user isn't logged in
        return user !== null; // i.e, if not null then they're logged in
    }
}

export default new AuthenticationService();