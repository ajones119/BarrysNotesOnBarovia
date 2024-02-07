import React from "react";
import "./NavBar.css"
import css from "./NavBar.module.scss"
import Barry from "@images/barry-cartoon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDungeon, faHatWizard, faSpaghettiMonsterFlying } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Typography } from "../Typography/Typography";

export const NavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleScroll=() => {
      const offset=window.scrollY;
      if(offset > 1 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }

  React.useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  return (
    <div className={`${css.navbarContainer} ${scrolled ?  css.scrolled : ""}`}>
      <div className={css.logoContainer}>
        <div onClick={() => navigate("/")}>
          <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
        </div>
      </div>
      <div className={css.linkContainer}>
        <a className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`} href="/#/Campaigns/">
          <FontAwesomeIcon icon={faDungeon} />
          <Typography className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`}>Campaigns</Typography>
        </a>
        <a className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`} href="/#/Characters/">
          <FontAwesomeIcon icon={faHatWizard} />
          <Typography className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`}>Characters</Typography>
        </a>
        <a className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`} href="/#/Monsters/">
          <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
          <Typography className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`}>Monsters</Typography>
        </a>
      </div>
    </div>
  );
}

/*
<div className="navbar-grid">
        <div className="navbar-link" onClick={() => navigate("/")}>
          <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
        </div>
        <div className="navbar-link" onClick={() => { navigate("/Campaigns/"); }}>
          <FontAwesomeIcon icon={faDungeon} />
          <Typography>Campaigns</Typography>
        </div>
        <div className="navbar-link" onClick={() => { navigate("/Characters/"); }}>
          <FontAwesomeIcon icon={faHatWizard} />
          <Typography>Characters</Typography>
        </div>
        <div className="navbar-link" onClick={() => { navigate("/Monsters/"); }}>
          <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
          <Typography>Monsters</Typography>
        </div>
      </div>
*/
