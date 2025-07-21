import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class FirmSearchApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API call:", endpoint, data, method);

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

  // GET User by ID
  static async getUserById(id) {
    let res = await this.request(`users/${id}`);
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
    // console.log(res);
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

  // Home page related requests -----------------------------

  // GET for mission statement
  static async getHome() {
    let res = await this.request("/");
    return res;
  }

  // PATCH for updating mission statement
  static async editHome(data) {
    let res = await this.request("/updhome", data, "patch");
    return res;
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
    // console.log(res);
    return res;
  }

  // Review Page Related Requests ---------------------------

  // GET for page info
  static async getReviews() {
    let res = await this.request("/reviews");
    return res.reviews;
  }

  // GET certain review
  static async getReview(id) {
    let res = await this.request(`/reviews/${id}`);
    return res.review;
  }

  // POST for adding a review
  static async addReview(data) {
    const { authId, title, textdata, link } = data;
    if (!authId) throw Error("Invalid Author ID, Submission Aborted.");
    if (title === "") throw Error("Title cannot be empty!");
    if (textdata === "") throw Error("Summary cannot be empty!");
    if (link === "") throw Error("Link cannot be empty");

    let res = await this.request("/add-review", data, "post");
    return res.review;
  }

  // DELETE for removing a review
  static async deleteReview(data) {
    console.log("Data at API:", data)
    const res = await this.request(`/remove-review`, data, "delete");
    return res.deleted;
  }
}

export default FirmSearchApi;
