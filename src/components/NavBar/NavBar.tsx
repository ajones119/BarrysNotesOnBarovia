import React, {useState} from "react";
import css from "./NavBar.module.scss"
import Barry from "@images/barry-cartoon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDungeon, faGripHorizontal, faHatWizard, faHomeAlt, faSpaghettiMonsterFlying, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography } from "../Typography/Typography";
import { useWindowWidth } from "@react-hook/window-size";
import Drawer from "@components/Drawer";
import { Button } from "@components/Button/Button";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { Divider } from "@mui/material";
import { Spacer } from "@components/Spacer/Spacer";

export type NavBarLink = {
  name: string;
  icon: Icon;
  url: string;
};

type NavBarProps = {
  additionalLinks?: NavBarLink[]
  sectionHomeLink?: NavBarLink
};

export const NavBar = ({additionalLinks = [], sectionHomeLink = null}: NavBarProps) => {
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
      <Link to="/" className={css.logoContainer}>
        <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
      </Link>
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
            <div className={css.menuButtons}>
              {sectionHomeLink && <Button hollow onClick={() => navigate(sectionHomeLink.url)}><FontAwesomeIcon icon={faHomeAlt} /></Button>}
              <Button hollow onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faGripHorizontal} /></Button>
              
            </div>
          }
        </div>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={css.mobileLinkContainer}>
            <div className={`${css.navBarLink}`} onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink}`}><FontAwesomeIcon icon={faXmark} />{" "}Close</Typography>
            </div>
            <Link className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`} to="/Campaigns/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faDungeon} />{" "}Campaigns</Typography>
            </Link>
            <Link className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`} to="/Characters/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faHatWizard} />{" "}Characters</Typography>
            </Link>
            <Link className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`} to="/Monsters/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faSpaghettiMonsterFlying} />{" "}Monsters</Typography>
            </Link>
            <Spacer height={24} />
            { additionalLinks.length > 0 &&
              additionalLinks.map(link => (
                  <Link className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`} to={link.url} onClick={() => setIsOpen(false)}>
                    <Typography size="default" className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`}><FontAwesomeIcon icon={link.icon} />{" "}{link.name}</Typography>
                  </Link>
                ))
            }
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
              <Typography size="large" className={`${css.navBarLink}`}><FontAwesomeIcon icon={faXmark} />{" "}Close</Typography>
            </div>
            <Link className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`} to="/Campaigns/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Campaigns/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faDungeon} />{" "}Campaigns</Typography>
            </Link>
            <Link className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`} to="/Characters/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Characters/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faHatWizard} />{" "}Characters</Typography>
            </Link>
            <Link className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`} to="/Monsters/" onClick={() => setIsOpen(false)}>
              <Typography size="large" className={`${css.navBarLink} ${pathname === "/Monsters/" ? css.activeLink : ""}`}><FontAwesomeIcon icon={faSpaghettiMonsterFlying} />{" "}Monsters</Typography>
            </Link>
            <Spacer height={24} />
            { additionalLinks.length > 0 &&
              additionalLinks.map(link => (
                  <Link className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`} to={link.url} onClick={() => setIsOpen(false)}>
                    <Typography size="default" className={`${css.navBarLink} ${pathname === link.url ? css.activeLink : ""}`}><FontAwesomeIcon icon={link.icon} />{" "}{link.name}</Typography>
                  </Link>
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
