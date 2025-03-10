import axios, { formToJSON } from "axios";

const BASE_URL = "https://api.sec-api.io/form-adv/firm";
const SEC_API = process.env.SEC_API_KEY;

class SECApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SEC_API}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("Api Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Search Requests

  //   Search by zipcode
  static async getByZipcode(zipcode) {
    let data = {
      query: `MainAddr.PostalCd:${zipcode}`,
      from: "0",
      size: "10",
      sort: [{ "MainAddr.PostalCd": { order: "desc" } }],
    };

    let res = await this.request(BASE_URL, data, "post");

    return res.filings;
  }

  //   Search by State
  static async getByState(stateCode) {
    let data = {
      query: `MainAddr.State:${stateCode}`,
      from: "0",
      size: "10",
      sort: [{ "MainAddr.State": { order: "desc" } }],
    };

    let res = await this.request(BASE_URL, data, "post");

    return res.filings;
  }
}
