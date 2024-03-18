import React, { useState } from "react";
import css from "../../CombatMap.module.scss"
import { useSpring, animated } from "@react-spring/web";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import { useSearchParams } from "react-router-dom";
import { Button } from "@components/Button/Button";
import ColorPicker from "@components/ColorPicker/ColorPicker";
import { TextInput } from "@components/TextInput/TextInput";
import SettingsDrawer from "../SettingsDrawer";
import TokensDrawer from "../TokensDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@components/Typography/Typography";
import { FullScreenHandle } from "react-full-screen";

type UtilButtons = {
    isPlayer?: boolean;
    mapContainer: FullScreenHandle;
    combatId: string;
}

const UtilButtons = ({isPlayer = false, mapContainer, combatId}: UtilButtons) => {
    const [isHovered, setHovered] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const scale = Number(searchParams.get("scale")) || 1;
    const drawing = String(searchParams.get("drawing")) || "";
    const color = String(searchParams.get("color")) || "black";
    const drawSize = Number(searchParams.get("drawSize")) || 0;
    const eraserOn = searchParams.get("eraserOn") === "on" || false;

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [isTokenDrawerOpen, setIsTokenDrawerOpen] = useState(false);

    const springs = useSpring({
        translateY: isHovered ? -40 : 0,
        opacity: isHovered ? 1 : 0
    });
    
    const getDrawingTitle = () => {
        let title = "Drawing Off";
        if (drawing === "drawing") {
            title = "Drawing";
        }
        if (drawing === "fogOfWar") {
            title = "Fog Of War"
        }

        return title;
    }

    return (
        <div>
            <FloatingButtonContainer>
                <div className={css.buttonsContainer}>
                    {!mapContainer.active && !isPlayer && <Button onClick={() => setIsSettingsDrawerOpen(true)} color="secondary" animatedHover><Typography color="light">Settings</Typography></Button>}
                    {!mapContainer.active && <Button onClick={() => setIsTokenDrawerOpen(true)} color="secondary" animatedHover><Typography color="light">Tokens</Typography></Button>}
                    { !isPlayer && 
                    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        <div style={{position: "relative", marginBottom: -50, zIndex: 2, display: "flex"}}>
                            <Button onClick={() => setSearchParams(searchParams => {
                                const nextState = drawing === "drawing" ? "fogOfWar" : drawing === "fogOfWar" ? "" : "drawing";

                                searchParams.set("drawing", nextState);
                                return searchParams;
                            })
                            } color={drawing ? "tertiary" : "secondary"} animatedHover><Typography color="light">{getDrawingTitle()}</Typography></Button>
                            <Button onClick={() => setSearchParams(searchParams => {

                                searchParams.set("eraserOn", eraserOn ? "off" : "on");
                                return searchParams;
                                })
                            } color={eraserOn ? "success" : "error"} animatedHover><Typography color="light">{<FontAwesomeIcon icon={faEraser} />}</Typography></Button>
                        </div>
                        <animated.div style={springs}>
                            <div className={css.hoveredDrawButtons}>
                            <ColorPicker width={50} value={color} onChange={(value) => {
                                setSearchParams(searchParams => {
                                    searchParams.set("color", String(value));
                                    return searchParams;
                                })
                            }}/>
                            <TextInput className={css.drawSizeInput} number placeholder="Size" value={drawSize} onChange={(value) => setSearchParams(searchParams => {
                                searchParams.set("drawSize", String(value));
                                return searchParams;
                                })
                            } />
                            </div>
                        </animated.div>
                    </div>
                }


                <Button animatedHover onClick={() => mapContainer.active ? mapContainer.exit() : mapContainer.enter()}><Typography color="light">FullScreen</Typography></Button>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", columnGap: 4}}>
                    <Button onClick={
                        () => setSearchParams(searchParams => {
                            searchParams.set("scale", String((scale - 0.1).toFixed(2)));
                            return searchParams;
                        })
                        }><FontAwesomeIcon icon={faMinus} /></Button>
                        <Typography weight="bold" color="light">Zoom</Typography>
                    <Button onClick={
                        () => setSearchParams(searchParams => {
                            searchParams.set("scale", String((scale + 0.1).toFixed(2)));
                            return searchParams;
                        })
                        }><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                    { isPlayer && 
                    <div>
                        <Button animatedHover onClick={() => setSearchParams(searchParams => {
                            searchParams.set("tab", "initiative");
                            return searchParams
                        })}><Typography>Health</Typography></Button>
                    </div>
                    }
                </div>
            </FloatingButtonContainer>
            <SettingsDrawer
                isOpen={isSettingsDrawerOpen}
                onClose={() => setIsSettingsDrawerOpen(false)}
                combatId={combatId}
            />
            <TokensDrawer
                isOpen={isTokenDrawerOpen}
                onClose={() => setIsTokenDrawerOpen(false)}
                combatId={combatId}
                isPlayer={isPlayer}
            />
        </div>
    )
};

export default UtilButtons;