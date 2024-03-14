import {  animated, config, useSpring } from "@react-spring/web";
import React, { ReactNode, useEffect, } from "react";
import { DRAWER_TRANSFORMS } from "../utils";
import css from "../Drawer.module.scss"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@components/Typography/Typography";
import useSetTheme from "@hooks/useSetTheme";

export type TrayContent = {
    icon: IconDefinition,
    contents: ReactNode,
    key: string
}

export interface TrayProps {
    openTab?: string;
    onClose?: () => void,
    onOpen?: (tab: string) => void,
    side: "right" | "left",
    height?: string,
    contents: TrayContent[]
}

const Tray = ({ onClose = () => { }, onOpen=() => {}, side = "left", openTab = "", height = "20%", contents = [] }: TrayProps) => {
    const {theme} = useSetTheme()
    const drawerTransformations = DRAWER_TRANSFORMS[side];
    const spring = openTab ? drawerTransformations.enter : drawerTransformations.leave
    const springs = useSpring({
        config: config.default,
        ...spring
    })

    useEffect(() => {
        if (contents.length < 1) {
            onClose();
        }
    }, [contents.length])

    return(
        <animated.div>
            <animated.div className={`${css.tray} ${css[side]}`} style={{ ...springs, top: height }} >
                {contents.map((tab, index) => 
                    <div className={css.openTab} onClick={openTab === tab.key ? onClose : () => onOpen(tab.key)} style={{
                            ...springs,
                            position: "absolute",
                            left: -30,
                            top: index * 60,
                            height: 60,
                            width: 30,
                            backgroundColor: openTab === tab.key ? theme.primary : theme.floatingContainer,
                            opacity: 1
                        }}>
                        <Typography><FontAwesomeIcon icon={tab.icon} /></Typography>
                    </div>
                )}
                
                <div className={css.trayContents}>
                    {openTab && contents?.find(tab => tab.key === openTab)?.contents || null}
                </div>
            </animated.div>

        </animated.div>
    )
}

export default Tray;
