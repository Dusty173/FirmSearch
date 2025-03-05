import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class FirmSearchApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FirmSearchApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("Api Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // User related requests -----------------------------

  // GET for getting current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Login route
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // Signup route
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    console.log(res);
    return res.token;
  }

  // DELETE for removing users ADMIN/CURRENT USER ONLY (Checked in backend)
  static async removeUser(username) {
    let res = await this.request(`users/${username}`, "", "delete");
    return res.deleted;
  }

  // PATCH route for updating user data
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // About page related requests -----------------------------

  // GET for About Us info
  static async getAbout() {
    let res = await this.request("/aboutus");
    return res.about;
  }

  // PATCH for editing About Us info
  static async editAbout(data) {
    let res = await this.request("/updabout", data, "patch");
    return res.about;
  }

  // Data Collection routes -----------------------------

  // Under Construction
}
export default FirmSearchApi;
