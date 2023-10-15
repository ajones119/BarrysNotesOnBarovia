import { useSpring, animated } from "@react-spring/web";
import React, { ReactNode, useState } from "react";
import css from "../Drawer.module.scss";
import IconButton from "@mui/material/IconButton";
import Drawer, { DrawerProps } from "..";
import { DRAWER_BUTTON_TRANSFORMS, DrawerIconButtons } from "../utils";

declare interface SanityDrawerProps extends DrawerProps {
    children: ReactNode;
    side?: "top" | "bottom" | "right" | "left";
}

const SanityDrawer = ({ side = "left", children }: SanityDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const drawerButtonTransformations = DRAWER_BUTTON_TRANSFORMS[side];
    const buttonStyle = useSpring(drawerButtonTransformations(isOpen));

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {children}
            </Drawer>
            <animated.div
                className={`${css.drawerButton} ${css[side]}`}
                style={buttonStyle}
            >
                <IconButton
                    className={css.icon}
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    {isOpen
                        ? DrawerIconButtons[side].close
                        : DrawerIconButtons[side].open}
                </IconButton>
            </animated.div>
        </>
    );
};

export default SanityDrawer;
