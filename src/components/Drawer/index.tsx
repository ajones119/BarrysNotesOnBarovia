import { useTransition, animated, config } from "@react-spring/web";
import React, { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Drawer.module.scss"
import { DRAWER_TRANSFORMS } from "./utils";

export declare interface DrawerProps {
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode
    side?: "top"| "bottom"| "right"| "left";
}

const Drawer = ({ isOpen = false, onClose = () => {}, side="left", children}: DrawerProps) => {

    const drawerRoot = useRef(document.createElement("div"));

    const drawerTransformations = DRAWER_TRANSFORMS[side];

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

    useEffect(() => {
        document.body.appendChild(drawerRoot.current);

        return () => {
            document.body.removeChild(drawerRoot.current)
        }
    }, [])

    return transitions((style, isOpen) => isOpen && createPortal(
        <animated.div>
            <animated.div style={{...style, opacity: undefined }} className={`${css.drawer} ${css[side]}`}>
                    {children}
            </animated.div>
            <animated.div style={{opacity: style.opacity}} className={css.drawerBackdrop} onClick={onClose} />
        </animated.div>,
            drawerRoot.current
        ))
}

export default Drawer;