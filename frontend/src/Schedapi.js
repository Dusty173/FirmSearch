import axios from "axios";

const BASE_URL = "https://api.sec-api.io/form-adv";
const SEC_API = process.env.REACT_APP_API_KEY;

class SchedApi {
  static async request(endpoint) {
    const method = "get";
    const url = `${BASE_URL}/${endpoint}`;

    // console.debug("SEC_API call:", endpoint, method);

    try {
      return await axios({ url, method });
    } catch (err) {
      console.error("SchedApi Error:", err);
    }
  }

  // Search Requests -----------------------------

  //   Get SchedA information. -> SchedA.js
  static async getSchedA(crd) {
    let res = await this.request(
      `schedule-a-direct-owners/${crd}?token=${SEC_API}`
    );

    return res.data;
  }

  //   Get SchedB information. -> SchedB.js
  static async getSchedB(crd) {
    let res = await this.request(
      `schedule-b-indirect-owners/${crd}?token=${SEC_API}`
    );

    return res.data;
  }

  //   Get SchedD1B information -> OthBusNms.js
  static async getSchedD1B(crd) {
    let res = await this.request(`schedule-d-1-b/${crd}?token=${SEC_API}`);

    return res.data;
  }

  //   Get SchedD5K information -> Custodians.js
  static async getSchedD5K(crd) {
    let res = await this.request(`schedule-d-5-k/${crd}?token=${SEC_API}`);

    return res.data;
  }

  // Get Brochures -> Brochure.js
  static async getBrochures(crd) {
    let res = await this.request(`brochures/${crd}?token=${SEC_API}`);

    return res.data.brochures;
  }
}
export default SchedApi;
