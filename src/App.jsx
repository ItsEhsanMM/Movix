import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useTranslation } from "react-i18next";

// React-Router-Dom
import { Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/404/NotFound";

//rtk
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres as genres } from "./features/home/homeSlice";

function App() {
   const { i18n } = useTranslation();
   useEffect(() => {
      i18n.resolvedLanguage === "en" ? (document.dir = "ltr") : (document.dir = "rtl");
   }, [i18n.resolvedLanguage]);

   const dispatch = useDispatch();

   useEffect(() => {
      apiTesting();
      getGenres();
   }, []);

   const apiTesting = () => {
      fetchDataFromApi("/configuration").then((res) => {
         const url = {
            backdrop: res.images.secure_base_url + "original",
            poster: res.images.secure_base_url + "original",
            profile: res.images.secure_base_url + "original",
         };
         dispatch(getApiConfiguration(url));
      });
   };

   const getGenres = async () => {
      let promises = [];
      let endpoints = ["tv", "movie"];
      let allGenres = [];

      endpoints.forEach((url) => {
         promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);

      data.map(({ genres }) => {
         return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(genres(allGenres));
   };

   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
         <Footer />
      </>
   );
}

export default App;
