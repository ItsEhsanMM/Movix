import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
   const { t, i18n } = useTranslation();

   const [selectedTab, setSelectedTab] = useState(0);
   const [left, setLeft] = useState(0);

   const activeTab = (tab, index) => {
      setLeft(index * 100);
      setTimeout(() => {
         setSelectedTab(index);
      }, 300);
      onTabChange(tab, index);
   };

   return (
      <div className="switchingTabs">
         <div className="tabItems">
            {data.map((tab, index) => (
               <span
                  key={index}
                  className={`tabItem ${selectedTab === index ? "active" : ""}`}
                  onClick={() => activeTab(tab, index)}
               >
                  {(tab === "Day" && t("tabs.day")) ||
                     (tab === "Week" && t("tabs.week")) ||
                     (tab === "Movies" && t("header.movies")) ||
                     (tab === "TV Shows" && t("header.tv"))}
               </span>
            ))}
            <span
               className={`${i18n.resolvedLanguage === "en" ? "movingBg" : "movingBgFa"}`}
               style={{ left, right: left }}
            />
         </div>
      </div>
   );
};

export default SwitchTabs;
