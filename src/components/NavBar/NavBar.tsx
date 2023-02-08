import React from "react";
import "./NavBar.css"
import Barry from "../../images/barry-cartoon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDungeon, faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();

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
    <div className={`navbar-container ${scrolled ?  "scrolled" : ""}`}>
      <div className="navbar-grid">
        <div className="navbar-link">
          <img src={ Barry } alt="barry" style={{ height: "75px" }}/>
        </div>
        <div className="navbar-link" onClick={() => { navigate("/Campaigns/"); }}>
          <FontAwesomeIcon icon={faDungeon} />
          {" "}Campaigns
        </div>
        <div className="navbar-link" onClick={() => { navigate("/Characters/"); }}>
          <FontAwesomeIcon icon={faHatWizard} />
          {" "}Characters
        </div>
        <div className="navbar-link">
          Tools
        </div>
        <div className="navbar-link">
          Rules
        </div>
      </div>
    </div>
  );
}
