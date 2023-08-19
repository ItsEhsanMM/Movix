// Components
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";

const Trending = () => {
   const onTabChange = (tab) => {};

   return (
      <div className="carouselSection">
         <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
         </ContentWrapper>
      </div>
   );
};

export default Trending;
