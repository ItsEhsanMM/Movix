import { useParams } from "react-router-dom";

// Components
import DetailsBanner from "./detailsBanner/DetailsBanner";
import useFetch from "../../hooks/useFetch";

import "./style.scss";

const Details = () => {
   const { mediaType, id } = useParams();
   const { data, loading } = useFetch(`/${mediaType}/${id}`);

   return (
      <div>
         <DetailsBanner />
      </div>
   );
};

export default Details;
