import axios from "axios";
import { useTranslation } from "react-i18next";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
   Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params, fa = false) => {
   try {
      const { data } = await axios.get(`${BASE_URL}${url}${fa ? fa : ''}`, {
         headers,
         params,
      });
      return data;
   } catch (error) {
      return error;
   }
};
