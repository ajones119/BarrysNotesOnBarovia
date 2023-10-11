import React, {ReactNode, useState} from "react";
import { useSpring, animated, config } from "@react-spring/web";

type FlipProps = {
    front: ReactNode;
    back: ReactNode;
    flipOnHover?: boolean;
    flipOnClick?: boolean;
    perspective?: number;
    springConfig?: {
        tension?: number,
        friction?: number,
        mass?: number,
    }
    cardClassName?: string;
    frontClassName?: string;
    backClassName?: string
}

const Flip = ({ front, back, flipOnHover = false, flipOnClick = false, perspective = 0, springConfig = config.default, cardClassName, frontClassName, backClassName }: FlipProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false)

    const { transform, opacity } = useSpring({
        opacity: (isActive || isHovered) ? 1 : 0,
        transform: `perspective(${perspective}px) rotateY(${(isActive || isHovered) ? 180 : 0}deg)`,
        config: springConfig,
    })

    return (
        <div
            onMouseEnter={() => flipOnHover && setIsHovered(true)}
            onMouseLeave={() => flipOnHover && setIsHovered(false)}
            onClick={() => flipOnClick && setIsActive(!isActive)}
        >
            <animated.div style={{ opacity: opacity.to(o => 1 - o), transform }} className={`${cardClassName} ${frontClassName}`}>
                {front}
            </animated.div>
            <animated.div
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                    }}
                className={`${cardClassName} ${backClassName}`}
                >
                    {back}
            </animated.div>
        </div>
    )
}

export default Flip;