import React, { useEffect, useState } from "react";
import css from "./CopyIcon.module.scss"
import {animated, config} from "@react-spring/web";
import useBoop from "@hooks/AnimationHooks/useBoop";

const CopyIcon = ({isActive = false}) => {
    const [isHovered, setIsHovered] = useState(false);
    const {style: topStyle, trigger: topTrigger} = useBoop({xpos: -2, ypos:-2, timed: false, springConfig: {tension: 160, friction: 13}});
    const {style: bottomStyle, trigger: bottomTrigger} = useBoop({xpos: 2, ypos: 2, timed: false, springConfig: {tension: 160, friction: 13}});

    useEffect(() => {
        topTrigger(isHovered || isActive);
        bottomTrigger(isHovered || isActive);
    }, [isHovered, isActive])

    return (
        <div
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
            className={css.copyIconContainer}
        >
            <animated.div style={{...topStyle}} className={`${css.angledRectangle}`} />
            <animated.div style={{...bottomStyle}} className={`${css.angledRectangle} ${css.bottom}`} />
        </div>
    )
}

export default CopyIcon
