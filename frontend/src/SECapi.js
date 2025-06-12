import axios from "axios";

const BASE_URL = "https://api.sec-api.io/form-adv/firm";
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
      query: `MainAddr.PostlCd:${zipcode} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "50",
    };

    let res = await this.request("", data, "post");

    return res;
  }

  //   Search by State
  static async getByState(stateCode) {
    let data = {
      query: `MainAddr.State:${stateCode} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "50",
    };

    let res = await this.request("", data, "post");

    return res;
  }

  //   Search By City
  static async getByCity(cityName) {
    if (cityName === "" || cityName === undefined)
      throw Error("City cannot be empty");
    let data = {
      query: `MainAddr.City:${cityName} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
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
      query: `Info.BusNm:${firmName} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "50",
    };

    let res = await this.request("", data, "post");

    return res;
  }

  // Bulk search Logic (combination search runs query => cityName AND statecode)
  static async getCombination(inData) {
    const { state, city } = inData;
    if (state === "") throw Error("State cannot be empty!");
    if (city === "") throw Error("City cannot be empty");

    const data = {
      query: `MainAddr.City:${city} AND MainAddr.State:${state} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "50",
    };

    let res = await this.request("", data, "post");
    return res;
  }

  // Search logic for looking up by name as the SEC limits to 50 returns
  static async getBySearch(inData) {
    const { BusNm, city } = inData;
    if (BusNm === "") throw Error("Please type a Business name to search");
    if (city === "") throw Error("City cannot be empty");
    // console.log("INDATA:", inData);
    const data = {
      query: `Info.BusNm:${BusNm} AND MainAddr.City:${city} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "50",
      sort: [{ "Filing.Dt": { order: "desc" } }],
    };

    let res = await this.request("", data, "post");
    return res;
  }

  // Brochure requests -----------------------------

  static async getByCrd(crdNum) {
    const data = {
      query: `Info.FirmCrdNb:${crdNum} AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item7B.Q7B:N AND FormInfo.Part1A.Item5F.Q5F2F:>0 AND Rgstn.FirmType:Registered`,
      from: "0",
      size: "10",
    };

    let res = await this.request("", data, "post");
    return res;
  }
}

export default SECApi;
