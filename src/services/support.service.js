import axios from "axios";
import authHeader from "./auth-header";

const Base_URL = "https://revamp.fast-pay.cash/";
const APIsupport_URL = "api/v1/private/";

class SupportService {
  support() {
    return axios.get(Base_URL + APIsupport_URL + "support-content", {
      headers: authHeader(),
    });
  }
}

export default new SupportService();
