import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
   const { t, i18n } = useTranslation();

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
      else if (e.target.type === "submit") {
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
                     <span className="title">{t("main.welcome")}</span>
                     <span className="subTitle">{t("main.wSub")}</span>
                     <div
                        className={`${
                           i18n.resolvedLanguage === "en"
                              ? "searchInput"
                              : "searchInputFa"
                        }`}
                     >
                        <input
                           type="text"
                           onChange={(e) => setQuery(e.target.value)}
                           onKeyUp={searchQueryHandler}
                           placeholder={t("searchTitle")}
                        />
                        <button onClick={searchQueryHandler}>{t("main.search")}</button>
                     </div>
                  </div>
               </div>
            </ContentWrapper>
         </div>
      </div>
   );
};

export default HeroBanner;
