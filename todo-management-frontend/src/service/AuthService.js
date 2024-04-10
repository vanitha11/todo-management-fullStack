import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/auth';

export const registerAPICall = (registerForm) => axios.post(BASE_REST_API_URL + '/register', registerForm)

export const loginAPICall = (usernameOrEmail, password) => axios.post(BASE_REST_API_URL + '/login', {usernameOrEmail, password})

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null) {
        return false;
    }    
    else {
        return true;
    }   
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {

    let role = sessionStorage.getItem("role");

    if(role != null && role === 'ROLE_ADMIN') {
        return true;
    } else {
        return false;
    }
}