import React from "react";
import css from "./HealthBar.module.scss";

type HealthBarProps = {
    health?: number,
    maxHealth?: number,
    tempHealth?: number,
    height?: number
};

export const getHealthBarColor = (percent: number) => {
    if (percent > 100) return "purple"
    else if (percent > 80) return "green"
    else if (percent > 60) return "olivedrab"
    else if (percent > 40) return "orange"
    else if (percent > 20) return "orangered"
    else return "red"
}

const HealthBar = ({health = 0, maxHealth = 1, tempHealth = 0, height = 12}: HealthBarProps) => {
    return(
        <div className={css.healthBarWrapper}>
            <div className={css.healthBar} style={{height}}>
                <div
                    className={css.healthFill}
                    style={{backgroundColor: getHealthBarColor((health/maxHealth)*100), width: `${(health/maxHealth)*100}%`}}    
                />
                <div
                    className={css.tempFill}
                    style={{backgroundColor: "slategrey", width: `${(tempHealth/maxHealth)*100}%`}}    
                />

            </div>
        </div>
    )
}

export default HealthBar;