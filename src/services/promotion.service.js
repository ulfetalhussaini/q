import axios from "axios";
import authHeader from "./auth-header";

const Base_URL = "https://revamp.fast-pay.cash/";
const APIpromotion_URL = "api/v1/private/promotional-offers/";

class PromotionService {
  promotions() {
    return axios.get(Base_URL + APIpromotion_URL + "show-all", {
      headers: authHeader(),
    });
  }

  topPromotions() {
    return axios.get(Base_URL + APIpromotion_URL + "top-5", {
      headers: authHeader(),
    });
  }
}

export default new PromotionService();
