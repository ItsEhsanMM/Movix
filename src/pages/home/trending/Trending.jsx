import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

// custom hook
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
   const { t } = useTranslation();

   const [endpoint, setEndpoint] = useState("day");

   const { data, loading } = useFetch(`/trending/all/${endpoint}`);

   const onTabChange = (tab) => {
      setEndpoint(tab === "Day" ? "day" : "week");
   };

   return (
      <div className="carouselSection">
         <ContentWrapper>
            <span className="carouselTitle">{t("trending")}</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
         </ContentWrapper>
         <Carousel data={data?.results} loading={loading} />
      </div>
   );
};

export default Trending;
