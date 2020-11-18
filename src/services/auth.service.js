import axios from "axios";

const API_URL = "https://revamp.fast-pay.cash/api/v1/auth/";

class AuthService {
  login(mobile_number, password) {
    return axios
      .post(API_URL + "signin", {
        mobile_number,
        password
      })
      .then(response => {
        if (response.data.data.token) {
         localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("surname");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
