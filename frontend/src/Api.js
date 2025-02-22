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

  // User related requests

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async removeUser(username) {
    let res = await this.request(`users/${username}`, "", "delete");
    return res.deleted;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}
export default FirmSearchApi;
