import axios from "axios";

const BASE_URL = "https://api.sec-api.io/form-adv";
const SEC_API = process.env.REACT_APP_API_KEY;

class SECApi {
  static async request(endpoint, data = {}, method = "get") {
    // console.debug("SEC_API call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `${SEC_API}` };
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
    let data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.PostlCd:${zipcode}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("firm", data, "post");

    return res;
  }

  //   Search by State
  static async getByState(stateCode) {
    let data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.State:${stateCode}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("firm", data, "post");

    return res;
  }

  //   Search By City
  static async getByCity(cityName) {
    if (cityName === "" || cityName === undefined)
      throw Error("City cannot be empty");
    let data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.City:${cityName}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("", data, "post");

    return res;
  }

  // Search by Firm Name
  static async getByName(firmName) {
    if (firmName === "" || firmName === undefined)
      throw Error("Business name cannot be empty");

    let data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND Info.BusNm:${firmName}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("firm", data, "post");

    return res;
  }

  // Bulk search Logic (combination search runs query => cityName AND statecode)
  static async getCombination(inData) {
    const { BusNm, city } = inData;
    if (city === "") throw Error("City cannot be empty");
    if (BusNm === "") throw Error("Business Name cannot be empty!");

    const data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.City:${city} AND Info.BusNm:${BusNm}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("firm", data, "post");
    return res;
  }

  static async getStateCity(inData) {
    const { state, city } = inData;
    if (city === "") throw Error("City cannot be empty");
    if (state === "") throw Error("State cannot be empty!");

    const data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.City:${city} AND MainAddr.State:${state}`,
      from: "0",
      size: "50",
    };

    let res = await this.request("firm", data, "post");
    return res;
  }

  // Search logic for looking up by name as the SEC limits to 50 returns
  static async getBySearch(inData) {
    const { BusNm, city, state } = inData;
    if (city === "") throw Error("City cannot be empty");
    if (BusNm === "") throw Error("Please type a Business name to search");
    if (state === "") throw Error("Please Select a State");
    // console.log("INDATA:", inData);
    const data = {
      query: `FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered AND MainAddr.State:${state} AND Info.BusNm:${BusNm} AND MainAddr.City:${city}`,
      from: "0",
      size: "50",
      sort: [{ "Filing.Dt": { order: "desc" } }],
    };

    let res = await this.request("firm", data, "post");
    return res;
  }

  // Brochure requests -----------------------------

  static async getByCrd(crdNum) {
    const data = {
      query: `Info.FirmCrdNb:${crdNum}`,
      from: "0",
      size: "10",
    };

    let res = await this.request("firm", data, "post");
    return res;
  }
}

export default SECApi;
