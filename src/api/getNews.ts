import axios from "axios";

const api_key = "08226eeb1b9e414d96830ffe69235d0a";
const baseURL = "https://newsapi.org/v2";
const endpoint = "/top-headlines?country=us";

export const getNews = async () => {
  const url = baseURL + endpoint + `&apiKey=${api_key}`;
  try {
    const resp = await axios.get(url);
    return resp.data.articles;
  } catch (error) {
    console.error(error);
  }
};
