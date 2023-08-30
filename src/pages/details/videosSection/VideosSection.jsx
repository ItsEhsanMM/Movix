import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./style.scss";

// Components
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/img";
import PlayIcon from "../PlayIcon";

const VideosSection = ({ data, loading }) => {
   const { t } = useTranslation();
   const [show, setShow] = useState(false);
   const [videoId, setVideoId] = useState(null);

   const loadingSkeleton = () => {
      return (
         <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
         </div>
      );
   };

   return (
      <div className="videosSection">
         <ContentWrapper>
            <div className="sectionHeading">{t("official")}</div>
            {!loading ? (
               <div className="videos">
                  {data?.results.map((video) => {
                     const imgUrl = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
                     return (
                        <div
                           key={video.id}
                           className="videoItem"
                           onClick={() => {
                              setVideoId(video.key);
                              setShow(true);
                           }}
                        >
                           <div className="videoThumbnail">
                              <Img src={imgUrl} />
                              <PlayIcon />
                           </div>
                           <div className="videoTitle">{video.name}</div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <div className="videoSkeleton">
                  {loadingSkeleton()}
                  {loadingSkeleton()}
                  {loadingSkeleton()}
                  {loadingSkeleton()}
               </div>
            )}
         </ContentWrapper>
         <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
         />
      </div>
   );
};

export default VideosSection;
