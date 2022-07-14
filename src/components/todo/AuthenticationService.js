// class used to store authenticated user into session storage
class AuthenticationService {

    registerSuccessfulLogin(username, password) {
        console.log("registerSuccessfulLogin")
        sessionStorage.setItem("authenticatedUser", username);
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
    }
}

export default new AuthenticationService;