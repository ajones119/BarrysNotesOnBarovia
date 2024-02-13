import React, { useState } from "react";
import css from "../../../SingleCampaign.module.scss";
import { Link } from "react-router-dom";
import BACKUP from "@images/homeBackground.jpg";
import { Typography } from "@components/Typography/Typography";
import { useSpring, config, animated } from "@react-spring/web";

type OverviewCardProps = {
    title: string,
    url: string,
    image: string,
}

const OverviewCard = ({title, url, image}: OverviewCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const style = useSpring({
        transform: isHovered
        ? `scale(1.01)
        `
        : `scale(1)
        `,
        config: config.wobbly,
    })

    return (
        <animated.div style={{...style}}
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
        >
            <Link className={css.overviewCard} to={url}>
                <img
                    className={css.overviewCardImage}
                    src={image}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=BACKUP;
                    }}
                    alt="boo"
                />
                <div className={css.overviewCardTextContainer}>
                    <Typography fontStyle="secondary" size="xtraLarge">
                        {title}
                    </Typography>
                </div>
            </Link>
        </animated.div>
    )
};

export default OverviewCard;