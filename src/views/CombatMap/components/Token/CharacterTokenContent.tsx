import { CombatCharacter } from "@model/CombatCharacter";
import { Avatar, Badge, LinearProgress } from "@mui/material";
import BACKUP from "@images/barry-cartoon.png"
import React, { useState } from "react";
import { BASE_CHARACTER_IMAGE_MAP } from "utils/getBaseCharacterGenericImage";
import { CharacterTypeLowercase } from "@model/BaseCharacter";
import css from "../../CombatMap.module.scss"
import { FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole } from "@floating-ui/react";
import { Typography } from "@components/Typography/Typography";
import { getHealthIcon, getIconList } from "@views/PlayerInitiative/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faFaceAngry, faBrain,} from "@fortawesome/free-solid-svg-icons";
import { ConditionsOverlayMap, PreConditions, WrapperConditions } from "./utils";
import HealthBar, { getHealthBarColor } from "@components/HealthBar";

type CharacterTokenContentProps = {
    character: CombatCharacter;
    tokenSize?: number;
    visibility?: string;
    isCurrentTurn?: boolean,
    isPlayer: boolean
};

const TOKEN_SIZE_MULTIPLIERS = {
    small: 1,
    medium: 1,
    large: 2,
    huge: 3,
    gargantuan: 4,
    colossal: 6

};

const CharacterTokenContent = ({ character, tokenSize = 16, isCurrentTurn = false, isPlayer = false }: CharacterTokenContentProps) => {
    const characterType: CharacterTypeLowercase = (character?.type?.toLowerCase() || "unknown") as CharacterTypeLowercase;
    const defaultImage = BASE_CHARACTER_IMAGE_MAP[characterType] 
    const image = character?.imageURL || defaultImage;
    const size = TOKEN_SIZE_MULTIPLIERS[character?.size || "medium"] * tokenSize;

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "top",
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({
                fallbackAxisSideDirection: "start"
            }),
            shift()
        ],
    })

    // Event listeners to change the open state
    const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    // Role props for screen readers
    const role = useRole(context, { role: "tooltip" });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role
    ]);

    const {health = 0, maxHealth = 1, tempHealth = 0} = character
    const healthBarAmount = (health/maxHealth)*100;
    const { conditions } = character;

    const wrapperConditions = conditions?.filter(cond => WrapperConditions.includes(cond)) || [];
    let wrapperConditionsClassString = wrapperConditions.map(cond => `${css[cond]}`).join(" ");

    const preConditions = conditions?.filter(cond => PreConditions.includes(cond)) || [];

    let postConditionsClass = "";
    const postConditions = conditions?.filter(cond => Object.keys(ConditionsOverlayMap).includes(cond)) || [];
    if (postConditions.length > 0) {
        postConditionsClass = postConditions[0];
    }

    const lowerLeftBadgeConditions = conditions?.filter(cond => cond === "concentration" || cond === "rage") || [];

    return (
        <div>
            <div className={`${css.characterTokenContainer} ${wrapperConditionsClassString}`} style={{backgroundColor: character?.color || "", fontSize: size/2, opacity: conditions?.includes("invisible") ? 0.5 : 1,}} ref={refs.setReference} {...getReferenceProps()} >
                {
                    preConditions.map(condition => 
                    <div key={condition} className={`${css[condition]}`} />
                    )
                }
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                        isCurrentTurn && <div className={css.healthIndicator} style={{fontSize: size/3, color: "yellow", backgroundColor: "black",}}><FontAwesomeIcon icon={faStar} /></div>
                    }
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        badgeContent={
                            lowerLeftBadgeConditions?.length > 0 && 
                            <div style={{display: "flex", columnGap: 4}}>
                                { lowerLeftBadgeConditions.includes("concentration") &&<div className={css.conditionsBadge} style={{fontSize: size/4, color: "aqua", backgroundColor: "transparent",}}>
                                    <FontAwesomeIcon icon={faBrain} />
                                </div>}
                                { lowerLeftBadgeConditions.includes("rage") &&<div className={css.conditionsBadge} style={{fontSize: size/4, color: "crimson", backgroundColor: "transparent",}}>
                                    <FontAwesomeIcon icon={faFaceAngry} />
                                </div>}
                            </div>
                        }
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <div className={css.healthIndicator} style={{fontSize: size/3, color: "white", backgroundColor: "black",}}><FontAwesomeIcon icon={getHealthIcon(healthBarAmount)} /></div>
                            }
                        >
                            <Avatar
                                src={image || BACKUP}
                                alt="boo"
                                sx={{width: size, height: size}}
                                style={{ 
                                    filter: `
                                        contrast(${Math.max(healthBarAmount, 100)}%)
                                        brightness(${Math.max(healthBarAmount, 100)}%)
                                        ${conditions?.includes("blinded") ? " blur(1px)" : ""}
                                        ${conditions?.includes("deafened") ? " grayscale(1)" : ""}
                                    `,
                                }}
                            />
                        </Badge>
                    </Badge>
                </Badge>
                <div
                    className={`${ css.overlay }`}
                    style={{
                        height: size, 
                        width: size,
                        opacity: postConditionsClass ? 0.5 : 0,
                        backgroundColor: ConditionsOverlayMap[postConditionsClass as keyof typeof ConditionsOverlayMap]
                    }}
                />
            </div>
            <FloatingPortal>
                {isOpen && (
                <div
                    className={css.tooltipContainer}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    <Typography>{isPlayer ? "" : `${character?.uniqueId || ""} - `}{character?.name}</Typography>
                    {
                        character?.shouldShowHealthBar && 
                        <div><HealthBar height={6} health={health} maxHealth={maxHealth} tempHealth={tempHealth}/></div>
                    }
                    { getIconList(character).map(value => <FontAwesomeIcon className={css.tooltipCondIcon} icon={value?.icon} />) }
                </div>
                )}
            </FloatingPortal>
        </div>
    )
}

export default CharacterTokenContent;