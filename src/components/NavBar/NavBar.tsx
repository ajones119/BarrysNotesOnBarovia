import React, {useState} from "react";
import "./NavBar.css"
import css from "./NavBar.module.scss"
import Barry from "@images/barry-cartoon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDungeon, faGripHorizontal, faHatWizard, faSpaghettiMonsterFlying, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography } from "../Typography/Typography";
import { useWindowWidth } from "@react-hook/window-size";
import Drawer from "@components/Drawer";
import { Button } from "@components/Button/Button";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { Divider } from "@mui/material";

export type NavBarLink = {
  name: string;
  icon: Icon;
  url: string;
};

type NavBarProps = {
  additionalLinks?: NavBarLink[]
};

export const NavBar = ({additionalLinks = []}: NavBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const width = useWindowWidth();;

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

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    navigate(url);
  }

  const desktopNavBar = (
    <div className={`${css.navbarContainer} ${scrolled ?  css.scrolled : ""}`}>
      <div onClick={() => navigate("/")} className={css.logoContainer}>
        <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
      </div>
        <div className={css.linkContainer}>
          <Link className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`} to="/Campaigns/">
            <FontAwesomeIcon icon={faDungeon} />
            <Typography className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`}>Campaigns</Typography>
          </Link>
          <Link className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`} to="/Characters/">
            <FontAwesomeIcon icon={faHatWizard} />
            <Typography className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`}>Characters</Typography>
          </Link>
          <Link className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`} to="/Monsters/">
            <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
            <Typography className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`}>Monsters</Typography>
          </Link>
          { additionalLinks.length > 0 && 
            <div className={css.menuButton}>
              <Button onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faGripHorizontal} /></Button>
            </div>
          }
        </div>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={css.mobileLinkContainer}>
            {additionalLinks.map(link => (
              <a className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`} onClick={() => handleNavigate(link.url)}>
                <FontAwesomeIcon icon={link.icon} />
                <Typography className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`}>{link.name}</Typography>
              </a>
            ))}
          </div>
        </Drawer>
    </div>
  )

  const mobileNavBar = (
    <div className={`${css.navbarContainer} ${scrolled ?  css.scrolled : ""} ${css.mobile}`}>
      <div onClick={() => navigate("/")} className={css.logoContainer}>
        <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
      </div>
      <Button onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faGripHorizontal} /></Button>

       <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={css.mobileLinkContainer}>
          <div className={`${css.navBarLink}`} onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
            <Typography className={`${css.navBarLink}`}>Close</Typography>
          </div>
          <a className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`} onClick={() => handleNavigate("/Campaigns/")}>
            <FontAwesomeIcon icon={faDungeon} />
            <Typography className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`}>Campaigns</Typography>
          </a>
          <a className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`} onClick={() => handleNavigate("/Characters/")}>
            <FontAwesomeIcon icon={faHatWizard} />
            <Typography className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`}>Characters</Typography>
          </a>
          <a className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`} onClick={() => handleNavigate("/Monsters/")}>
            <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
            <Typography className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`}>Monsters</Typography>
          </a>
          <Divider />
          { additionalLinks.length > 0 &&
            additionalLinks.map(link => (
                <a className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`} onClick={() => handleNavigate(link.url)}>
                  <FontAwesomeIcon icon={link.icon} />
                  <Typography className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`}>{link.name}</Typography>
                </a>
              ))
          }
        </div>
       </Drawer>
    </div>
  );

  return width >= 550 ? desktopNavBar :  mobileNavBar;
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
