import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";

const Similar = ({ mediaType, id }) => {
   const { t } = useTranslation();
   const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

   const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

   return (
      <Carousel
         title={title === "tv" ? t("similarTv") : t("similarMovie")}
         data={data?.results}
         loading={loading}
         endpoint={mediaType}
      />
   );
};

export default Similar;
