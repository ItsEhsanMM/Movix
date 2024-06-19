import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
   Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, fa = false) => {
   try {
      const { data } = await axios.get(
         `${BASE_URL}${url}${fa ? "?language=fa" : ""}`,
         {
            headers,
         }
      );
      return data;
   } catch (error) {
      return error;
   }
};
