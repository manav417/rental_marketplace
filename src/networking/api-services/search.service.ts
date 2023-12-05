import { UserStore } from "../../stores/userStore";
import axios from "axios";
import type { PropertieSearchParams } from "../../interfaces/PropertieSearchParams";

const userStore = UserStore();

export default {
  async searchCities(query: string): Promise<any> {
    return axios.get(
      `${import.meta.env.VITE_CONIFER_API}/search/cities?query=${query}`,
      {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
  },

  async searchProperties(params: PropertieSearchParams): Promise<any> {
    let url = new URL(`${import.meta.env.VITE_CONIFER_API}/search`)
    for (const [key, value] of Object.entries(this.params)) {
      if (value) {
        url.searchParams.append(key, value)
      }
    }
    return axios.get(String(url), {headers: { Authorization: `Bearer ${userStore.accessToken}` }});
  },

  async incrementCityState(id: string): Promise<any> {
    console.log("increment city state");
    console.log(id)
    return axios.put(
      `${
        import.meta.env.VITE_CONIFER_API
      }/us-cities/${id}/increment`,
      null,
      {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      }
    );
  }
};
