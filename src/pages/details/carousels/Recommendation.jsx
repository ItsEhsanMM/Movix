import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";

const Recommendation = ({ mediaType, id }) => {
   const { t } = useTranslation();
   const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

   return (
      <Carousel
         title={t("recommend")}
         data={data?.results}
         loading={loading}
         endpoint={mediaType}
      />
   );
};

export default Recommendation;
