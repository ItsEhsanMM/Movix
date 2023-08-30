import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url,fa) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading("loading...");
      setData(null);
      setError(null);

      fetchDataFromApi(url,fa)
         .then((res) => {
            setLoading(false);
            setData(res);
         })
         .catch(() => {
            setLoading(false);
            setError("Somthing went wrong");
         });
   }, [url]);

   return { data, loading, error };
};

export default useFetch;
