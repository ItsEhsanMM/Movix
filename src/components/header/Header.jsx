import React, { useState, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// svg
import fa from "../../assets/ir.svg";
import en from "../../assets/us.svg";

// react router dom
import { useLocation, useNavigate } from "react-router-dom";

// React-Icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./style.scss";

// components
import ContentWrapper from "../contentWrapper/ContentWrapper";

// images
import logo from "../../assets/movix-logo.svg";

const Header = () => {
   const { t, i18n } = useTranslation();

   const [show, setShow] = useState("top");
   const [lastScrollY, setLastScrollY] = useState(0);
   const [mobileMenu, setMobileMenu] = useState(false);
   const [query, setQuery] = useState("");
   const [showSearch, setShowSearch] = useState("");
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);

   const controlNavbar = () => {
      if (window.scrollY > 200) {
         if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
         } else {
            setShow("show");
         }
      } else {
         setShow("top");
      }
      setLastScrollY(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
         window.removeEventListener("scroll", controlNavbar);
      };
   }, [lastScrollY]);

   const searchQueryHandler = (e) => {
      if (e.key === "Enter" && query.length) {
         navigate(`/search/${query}`);
         setTimeout(() => {
            setShowSearch(false);
         }, 1000);
      }
   };

   const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
   };

   const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
   };

   const navigationHandler = (type) => {
      if (type === "movie") {
         navigate("/explore/movie");
      } else {
         navigate("/explore/tv");
      }
      setMobileMenu(false);
   };
   return (
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
         <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
               <img src={logo} alt="logo" />
            </div>
            <div
               className="lang"
               onClick={() => (
                  window.location.reload(),
                  i18n.resolvedLanguage === "en"
                     ? i18n.changeLanguage("fa")
                     : i18n.changeLanguage("en")
               )}
            >
               {i18n.resolvedLanguage === "en" ? (
                  <>
                     <img src={en} />
                     <p>en</p>
                  </>
               ) : (
                  <>
                     <img src={fa} />
                     <p>fa</p>
                  </>
               )}
            </div>
            <ul className="menuItems">
               <li className="menuItem" onClick={() => navigationHandler("movie")}>
                  {t("header.movies")}
               </li>
               <li className="menuItem" onClick={() => navigationHandler("tv")}>
                  {t("header.tv")}
               </li>
               <li className="menuItem">
                  <HiOutlineSearch onClick={openSearch} />
               </li>
            </ul>

            <div className="mobileMenuItems">
               <HiOutlineSearch onClick={openSearch} />
               {mobileMenu ? (
                  <VscChromeClose onClick={() => setMobileMenu(false)} />
               ) : (
                  <SlMenu onClick={openMobileMenu} />
               )}
            </div>
         </ContentWrapper>
         {showSearch && (
            <div className="searchBar">
               <ContentWrapper>
                  <div className="searchInput">
                     <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder={t("searchTitle")}
                     />
                     <VscChromeClose onClick={() => setShowSearch(false)} />
                  </div>
               </ContentWrapper>
            </div>
         )}
      </header>
   );
};

export default Header;
