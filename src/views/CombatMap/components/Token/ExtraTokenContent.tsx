import React, { useState } from "react";
import { getExtraColorsFilterFromNewColor } from "./utils";
import css from "../../CombatMap.module.scss"
import { FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useFocus, useInteractions, useRole } from "@floating-ui/react";
import { Button } from "@components/Button/Button";
import { mutateCombatToken, useDeleteCombatToken, useMutateCombatToken } from "@services/CombatMapService";
import { Typography } from "@components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Token from ".";

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
    isPlayer: boolean
};

const ExtraTokenContent = ({ token, scale, baseTokenSize, isPlayer }: ExtraTokenContentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {image = "", width = 1, length = 1, rotation, color, opacity, cover, position, playerAdded = true} = token?.data;
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
                    <div
                        style={{width: baseTokenSize * width, height: baseTokenSize * length}}
                        ref={refs.setReference} 
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setIsOpen(true);
                        }}
                        {...getReferenceProps()}
                    >
                    <img
                        src={image}
                        width={baseTokenSize * width}
                        height={baseTokenSize * length}
                        style={{
                            objectFit: cover ? "cover" : undefined,
                            filter: color ? getExtraColorsFilterFromNewColor(color) : undefined,
                            opacity: opacity || undefined,
                            transform: `rotate(${rotation}deg)`,
                            userSelect: "none",
                        }}
                    />
                    
                </div>
                
        }
        />
        <FloatingPortal>
            {isOpen && (!isPlayer || playerAdded) && (
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
                    <Button color="error" onClick={(e) => remove(id)}>
                        <Typography>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Typography>
                    </Button>
                </div>
            )}
        </FloatingPortal>
        </div>
    );
}

export default ExtraTokenContent;
