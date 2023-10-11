import React from "react";
import { CombatCharacter } from "@model/CombatCharacter";
import { Avatar, LinearProgress, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import css from "../PlayerInitiative.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import BACKUP from "../../../images/barry-cartoon.png"
import { Typography } from "@components/Typography/Typography";
import { getHealthBarColor, getHealthIcon, getIconList } from "../utils";
import { Spacer } from "@components/Spacer/Spacer";
import { useSpring, animated } from "@react-spring/web";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

type CharacterRowProps = {
    healthBarAmount?: number;
    playerCharacterImageUrl?: string;
    combatCharacter: CombatCharacter;
    isCurrentTurn?: boolean;
    isNextTurn?: boolean;
};

const CharacterRow = ({
    healthBarAmount,
    playerCharacterImageUrl,
    combatCharacter,
    isCurrentTurn = false,
    isNextTurn = false,
}: CharacterRowProps) => {

    const rotate = useSpring({ 
        loop: true, 
        from: { rotateZ: -360 }, 
        to: { rotateZ: 0 }, 
        duration: 2000,
        delay: 5000,
    });

    /*const point = useSpring({ 
        loop: { reverse: true}, 
        from: { x: -10 }, 
        to: { x: 0 }, 
        duration: 5000,
    });*/


    return (
        <div className={css.healthBar}>
            <div className={css.nameRowContainer}>
                { isNextTurn ? <animated.div style={{...rotate}}><FontAwesomeIcon className={`
                    ${isNextTurn && css.showWarning}
                    ${css.nextRowIcon}
                    `}
                    icon={faExclamationCircle} 
                /></animated.div>
                : <animated.div><FontAwesomeIcon className={`
                    ${isCurrentTurn && css.show}
                    ${css.nextRowIcon}
                    `}
                    icon={faArrowRight} 
                /></animated.div>}
                <div className={css.nameRow}>
                    { playerCharacterImageUrl && <Avatar
                        src={playerCharacterImageUrl || BACKUP}
                        alt="boo"
                        sx={{width: 32, height: 32}}
                    />}
                    <Typography style={{color: combatCharacter.color || "white"}}>{combatCharacter?.name || "Unknown"}</Typography>
                    <FontAwesomeIcon icon={getHealthIcon(healthBarAmount || 0)} />
                    { getIconList(combatCharacter).map(value => <BootstrapTooltip placement="top" arrow title={value?.label}><FontAwesomeIcon icon={value?.icon} /></BootstrapTooltip>) }
                </div>
            </div>
        {combatCharacter?.shouldShowHealthBar && <LinearProgress variant={healthBarAmount || 0 < 101 ? "determinate" : "indeterminate"} value={healthBarAmount} color={getHealthBarColor(healthBarAmount || 0)} />}
        <Spacer height={8} />
    </div>
    )
}

export default CharacterRow;