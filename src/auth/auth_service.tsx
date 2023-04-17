import axios from "axios";

const API_URL = "https://localhost:7026/api/login";

class AuthService {
  login(email: string, password:string) {
    return axios
      .post(API_URL, {
        email,
        password
      })
      .then(response => {
       
        if (response.data) {
          localStorage.removeItem("token")
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data.token;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "SignUp", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    let user = localStorage.getItem('token')
    return user!== null ? JSON.parse(user) : null;
  }
}

export default new AuthService();