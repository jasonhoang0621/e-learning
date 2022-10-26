import { axiosClient } from ".";

class Auth {
  async login(data) {
    return axiosClient.post("/api/login", data);
  }

  async register(data) {
    return await axiosClient.post("/api/register", data);
  }
}

export default new Auth();
