import { useState, useEffect } from "react";

// react-redux
import { useSelector } from "react-redux";

// React-Router-Dom
import { useNavigate } from "react-router-dom";

import "./style.scss";

// custom hook
import useFetch from "../../../hooks/useFetch";

// lazy image loader
import Img from "../../../components/lazyLoadImage/img";

// content wrapper
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
   const [background, setBackground] = useState("");
   const [query, setQuery] = useState("");
   const navigate = useNavigate();

   const { url } = useSelector((state) => state.home);

   const { data, loading } = useFetch("/movie/upcoming");

   useEffect(() => {
      const bg =
         url.backdrop +
         data?.results?.[Math.floor(Math.random() * data.results.length)]?.backdrop_path;
      setBackground(bg);
   }, [data]);

   const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length) {
         navigate(`/search/${query}`);
      }
   };

   return (
      <div className="heroBanner">
         {!loading && (
            <div className="backdrop-img">
               <Img src={background} />
            </div>
         )}
         <div className="opacity-layer">
            <ContentWrapper>
               <div className="wrapper">
                  <div className="heroBannerContent">
                     <span className="title">Welcome.</span>
                     <span className="subTitle">
                        Millions of movies, TV shows and people to discover. Explore now.
                     </span>
                     <div className="searchInput">
                        <input
                           type="text"
                           onChange={(e) => setQuery(e.target.value)}
                           onKeyUp={searchQueryHandler}
                           placeholder="Search for a movie or tv show..."
                        />
                        <button>Search</button>
                     </div>
                  </div>
               </div>
            </ContentWrapper>
         </div>
      </div>
   );
};

export default HeroBanner;
