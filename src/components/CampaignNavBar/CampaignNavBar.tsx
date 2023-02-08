import { faBook, faC, faDragon, faJedi, faMapLocationDot, faPeopleLine, faScroll, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CampaignNavBar.css';
import { CHARATCERS, DM_NOTES, FACTIONS, LOCATIONS, OVERVIEW, PARTY_NOTES, QUESTS } from './CampaignNavBarConstants';

export const CampaignNavBar = ({ currentPane, setCurrentPane }: any) => {
    return (
        <div className='campaign-navbar'>
            <div 
                className={`campaign-navbar-button ${currentPane === OVERVIEW ? "selected" : ""}`}
                onClick={() => {setCurrentPane(OVERVIEW)}}
                >
                    <FontAwesomeIcon icon={faBook} /> {" "}
                    Overview
            </div>
            <div
                className={`campaign-navbar-button ${currentPane === CHARATCERS ? "selected" : ""}`}
                onClick={() => {setCurrentPane(CHARATCERS)}}
                >
                    <FontAwesomeIcon icon={faUsers} /> {" "}
                    Characters
            </div>
            <div
                className={`campaign-navbar-button ${currentPane === QUESTS ? "selected" : ""}`}
                onClick={() => {setCurrentPane(QUESTS)}}
                >
                    <FontAwesomeIcon icon={faDragon} /> {" "}
                    Quests
            </div>
            <div
                className={`campaign-navbar-button ${currentPane === DM_NOTES ? "selected" : ""}`}
                onClick={() => {setCurrentPane(DM_NOTES)}}
                >
                    <FontAwesomeIcon icon={faScroll} /> {" "}
                    DM Notes
            </div>
             <div
                className={`campaign-navbar-button ${currentPane === PARTY_NOTES ? "selected" : ""}`}
                onClick={() => {setCurrentPane(PARTY_NOTES)}}
                >
                    <FontAwesomeIcon icon={faPeopleLine} /> {" "}
                    Party Notes
            </div>
            <div
                className={`campaign-navbar-button ${currentPane === FACTIONS ? "selected" : ""}`}
                onClick={() => {setCurrentPane(FACTIONS)}}
                >
                    <FontAwesomeIcon icon={faJedi} /> {" "}
                    Factions
            </div>
            <div
                className={`campaign-navbar-button ${currentPane === LOCATIONS ? "selected" : ""}`}
                onClick={() => {setCurrentPane(LOCATIONS)}}
                >
                    <FontAwesomeIcon icon={faMapLocationDot} /> {" "}
                    Locations
            </div>
        </div>
    );
}