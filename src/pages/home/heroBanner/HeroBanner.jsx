import { useState } from "react";

// React-Router-Dom
import { useNavigate } from "react-router-dom";

import "./style.scss";

const HeroBanner = () => {
   const [background, setBackground] = useState("");
   const [query, setQuery] = useState("");
   const navigate = useNavigate();

   const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length) {
         navigate(`/search/${query}`);
      }
   };

   return (
      <div className="heroBanner">
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
      </div>
   );
};

export default HeroBanner;
