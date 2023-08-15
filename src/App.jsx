import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

//rtk
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./features/home/homeSlice";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      apiTesting();
   }, []);

   const apiTesting = () => {
      fetchDataFromApi("/movie/popular").then((res) => {
         console.log(res);
         dispatch(getApiConfiguration(res));
      });
   };

   return <>App </>;
}

export default App;
