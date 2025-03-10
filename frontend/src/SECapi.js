import axios from "axios";

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

  // Search Requests -----------------------------

  //   Search by zipcode
  static async getByZipcode(zipcode) {
    let dataObj = {
      query: `MainAddr.PostlCd:${zipcode}`,
      from: "0",
      size: "10",
    };

    let data = JSON.stringify(dataObj);

    let res = await this.request(BASE_URL, data, "post");

    return res;
  }

  //   Search by State
  static async getByState(stateCode) {
    let dataObj = {
      query: `MainAddr.State:${stateCode}`,
      from: "0",
      size: "10",
    };

    let data = JSON.stringify(dataObj);

    let res = await this.request(BASE_URL, data, "post");

    return res;
  }

  //   Search By City
  static async getByCity(cityName) {
    let dataObj = {
      query: `MainAddr.City:${cityName}`,
      from: "0",
      size: "10",
    };

    let data = JSON.stringify(dataObj);

    let res = await this.request(BASE_URL, data, "post");

    return res;
  }

  // Brochure requests -----------------------------

  //   Get Brochure for firm in details page
  static async getBrochure(crdNum) {
    let res = await this.request(`${BASE_URL}/form-adv/brochures/${crdNum}`);

    return res;
  }
}

export default SECApi;
