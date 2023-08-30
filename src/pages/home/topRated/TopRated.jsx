import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

// custom hook
import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
   const { t } = useTranslation();

   const [endpoint, setEndpoint] = useState("movie");

   const { data, loading } = useFetch(`/${endpoint}/top_rated`);

   const onTabChange = (tab) => {
      setEndpoint(tab === "Movies" ? "movie" : "tv");
   };

   return (
      <div className="carouselSection">
         <ContentWrapper>
            <span className="carouselTitle">{t("top")}</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
         </ContentWrapper>
         <Carousel data={data?.results} loading={loading} />
      </div>
   );
};

export default TopRated;
