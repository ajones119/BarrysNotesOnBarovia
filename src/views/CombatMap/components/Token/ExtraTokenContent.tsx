import React, { useState } from "react";
import { getExtraColorsFilterFromNewColor } from "./utils";
import css from "../../CombatMap.module.scss"
import { FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useFocus, useInteractions, useRole } from "@floating-ui/react";
import { Button } from "@components/Button/Button";
import { useDeleteCombatToken, useMutateCombatToken } from "@services/CombatMapService";
import { Typography } from "@components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleRight, faLock, faLockOpen, faRotate, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Token from ".";
import { useDraggable } from "@dnd-kit/core";
import ColorPicker from "@components/ColorPicker/ColorPicker";


export function normalizeAngle(angle: number) {
    // Normalize angle to be within the range of 0 to 360 degrees
    return (angle % 360 + 360) % 360;
}

export function calculateAngleFromOrigin(x: number, y: number) {
    // Calculate the angle in radians using Math.atan2
    const angleRadians = Math.atan2(y, x);

    // Convert radians to degrees
    let angleDegrees = angleRadians * (180 / Math.PI);

    // Ensure the angle is positive
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }

    return angleDegrees;
}

type ExtraTokenContentProps = {
    token: {
        id: string,
        disabled?: boolean,
        data: {
            image?: string,
            width?: number,
            length?: number,
            rotation?: number,
            color?: string,
            opacity?: number,
            cover?: boolean,
            position?: {
                x?: number,
                y?: number
            },
            playerAdded?: boolean
        }
    },
    scale: number,
    baseTokenSize: number,
    isPlayer: boolean,
    isSelected: boolean
};

const ExtraTokenContent = ({ token, scale, baseTokenSize, isPlayer, isSelected = false }: ExtraTokenContentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {image = "", width = 1, length = 1, rotation = 0, color, opacity, cover, position, playerAdded = true} = token?.data;
    const { id, disabled } = token;
    const {mutate} = useMutateCombatToken()
    const {mutate: remove} = useDeleteCombatToken()

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "right",
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({
                fallbackAxisSideDirection: "start"
            }),
            shift()
        ],
    })

    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "menu" });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
        focus,
        dismiss,
        role
    ]);

    const {active: xActive, listeners: listenersX, setNodeRef: setRefX, setActivatorNodeRef: setActiveX, transform: transformX} = useDraggable({
        id: `${token.id}-resize-x`,
        data: {}
    })
    const {active: yActive, listeners: listenersY, setNodeRef: setRefY, setActivatorNodeRef: setActiveY, transform: transformY} = useDraggable({
        id: `${token.id}-resize-y`,
        data: {}
    })

    const {active: rotateActive, listeners: listenersRotate, setNodeRef: setRefRotate, setActivatorNodeRef: setActiveRotate, transform: transformRotate} = useDraggable({
        id: `${token.id}-rotate`,
        data: {}
    })

    let calculatedWidth = baseTokenSize * width;
    let calculatedHeight = baseTokenSize * length;
    let normalizedRotation: number = normalizeAngle(rotation) || 0;
    const radians = normalizedRotation * (Math.PI/180);

    if (rotateActive && transformRotate) {
        normalizedRotation = calculateAngleFromOrigin(transformRotate.x,transformRotate.y) + rotation;
    }

    if (xActive && transformX) {
        const xMultiplier = transformX.x < 0 ? -1 : 1;
        const flip = normalizedRotation < 180 ? 1 : -1;
        let totalDistance = Math.sqrt((transformX.x * transformX.x) + (transformX.y * transformX.y));
        calculatedWidth += totalDistance * Math.cos(radians) * xMultiplier * flip;
        calculatedHeight += totalDistance * Math.sin(radians) * xMultiplier * flip;
    }
    if (yActive && transformY) {
        const yMultiplier = transformY.y < 0 ? -1 : 1;
        let totalDistance = Math.sqrt((transformY.x * transformY.x) + (transformY.y * transformY.y))
        const flip = normalizedRotation < 180 ? 1 : -1;
        calculatedWidth += totalDistance * Math.sin(radians) * yMultiplier * flip;
        calculatedHeight += totalDistance * Math.cos(radians) * yMultiplier * flip;
    }

    return (
        <div>
            <Token
                styles={{
                    position: "absolute",
                    left: `${(position?.x || 0) * scale}px`,
                    top: `${(position?.y || 0) * scale}px`
                }}
                id={token.id}
                disabled={token?.disabled}
                content={
                    <div style={{}}>
                        <div style={{transform: `rotate(${normalizedRotation}deg)`}}>
                            <div
                                style={{width: calculatedWidth, height: calculatedHeight}}
                                className={`${isSelected && css.tokenBorder}`}
                                ref={refs.setReference} 
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setIsOpen(true);
                                }}
                                {...getReferenceProps()}
                            >
                                <img
                                    src={image}
                                    width={calculatedWidth}
                                    height={calculatedHeight}
                                    style={{
                                        objectFit: cover ? "cover" : undefined,
                                        filter: color ? getExtraColorsFilterFromNewColor(color) : undefined,
                                        opacity: opacity || undefined,
                                        userSelect: "none",
                                    }}
                                />
                            </div>
                            {
                                isSelected && 
                                <div>
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: calculatedHeight/2 - 12,
                                            left: calculatedWidth + 12,
                                            transform: `rotate(${-normalizedRotation}deg)`
                                        }}
                                        className={css.tokenLengthIndicator}
                                    >
                                        <div>
                                            {Math.floor(calculatedHeight/baseTokenSize * 5)} ft
                                        </div>
                                    </div>
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: calculatedHeight + 8,
                                            left: calculatedWidth/2 - 24,
                                            transform: `rotate(${-normalizedRotation}deg)`
                                        }}
                                        className={css.tokenLengthIndicator}
                                    >
                                        <div>
                                            {Math.floor(calculatedWidth/baseTokenSize * 5)} ft
                                        </div>
                                    </div>
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: -32,
                                            left: calculatedWidth/2 - 12,
                                            transform: `rotate(${-normalizedRotation}deg)`
                                        }}
                                        ref={setRefRotate}
                                        className={css.tokenLengthIndicator}
                                    >
                                        <div ref={setActiveRotate} {...listenersRotate}>
                                            <FontAwesomeIcon icon={faRotate} />
                                        </div>
                                    </div>
                                </div>}
                            </div>

                            {
                                isSelected && 
                                <div>
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: calculatedHeight/2 - 12,
                                            left: calculatedWidth + 60,
                                        }}
                                        ref={setRefX}
                                        className={css.tokenLengthIndicator}
                                    >
                                        <div ref={setActiveX} {...listenersX}>
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} />

                                        </div>
                                    </div>
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: calculatedHeight + 50,
                                            left: calculatedWidth/2 - 12,
                                        }}
                                        ref={setRefY}
                                        className={css.tokenLengthIndicator}
                                    >
                                        <div ref={setActiveY} {...listenersY}>
                                            <FontAwesomeIcon icon={faArrowAltCircleDown} />
                                        </div>
                                    </div>
                                </div>}
                    </div>
                
            }
            />
            <FloatingPortal>
                {isOpen && (
                    <div
                        className={css.menuContainer}
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <Button onClick={(e) => mutate({id, token: {disabled: !disabled}})}>
                            <Typography>
                                {disabled ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />}
                            </Typography>
                        </Button>
                        { (!isPlayer || playerAdded) && 
                            <Button color="error" onClick={(e) => remove(id)}>
                                <Typography>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Typography>
                            </Button>
                        }
                        { (!isPlayer || playerAdded) && token.data.color && !disabled && 
                        //@ts-ignore
                            <ColorPicker outlined width={48} value={token.data.color} onChange={(value) => mutate({id, token: {data: {...token.data, color: value}}})} />
                        }
                    </div>
                )}
            </FloatingPortal>
        </div>
    );
}

export default ExtraTokenContent;
