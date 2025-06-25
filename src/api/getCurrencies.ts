import axios from "axios";

const baseURL = "https://v6.exchangerate-api.com/v6";
const endpoint = "/latest";
const access_key = "d4618fc9eddd02227f6e7f4d";

export const getCurrencies = async (currency = "USD") => {
  const url = baseURL + `/${access_key}` + endpoint + `/${currency}`;
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};
