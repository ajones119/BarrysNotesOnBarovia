import { useTransition, useSpring, animated, config } from "@react-spring/web";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Drawer.module.scss"
import { DRAWER_BUTTON_TRANSFORMS, DRAWER_TRANSFORMS, DrawerIconButtons } from "./utils";
import IconButton from "@mui/material/IconButton";

export declare interface DrawerProps {
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode
    side?: "top" | "bottom" | "right" | "left";
}

const Drawer = ({ onClose = () => { }, side = "left", children }: DrawerProps) => {

    const drawerRoot = useRef(document.createElement("div"));

    const drawerTransformations = DRAWER_TRANSFORMS[side];
    const drawerButtonTransformations = DRAWER_BUTTON_TRANSFORMS[side];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const transitions = useTransition(isOpen, {
        from: {
            opacity: 0.3,
            ...drawerTransformations.from
        },
        enter: {
            opacity: 1,
            ...drawerTransformations.enter
        },
        leave: {
            opacity: 0,
            ...drawerTransformations.leave
        },
        config: config.default
    })

    const buttonStyle = useSpring(drawerButtonTransformations(isOpen));

    useEffect(() => {
        document.body.appendChild(drawerRoot.current);

        return () => {
            document.body.removeChild(drawerRoot.current)
        }
    }, [])

    return transitions((style, isOpen) => <>{isOpen && createPortal(
        <animated.div>
            <animated.div style={{ ...style, opacity: undefined }} className={`${css.drawer} ${css[side]}`}>
                {children}
            </animated.div>
            <animated.div style={{ opacity: style.opacity }} className={css.drawerBackdrop} onClick={onClose} />
        </animated.div>,
        drawerRoot.current
    )}
        <animated.div className={`${css.drawerButton} ${css[side]}`} style={buttonStyle}>
            <IconButton onClick={() => { setIsOpen(!isOpen) }} >{isOpen ? DrawerIconButtons[side].close : DrawerIconButtons[side].open}</IconButton>
        </animated.div >
    </>)
}

export default Drawer;
