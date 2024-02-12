import React, { useState } from "react";
import { Button, ButtonProps } from "../../Button";
import css from "./CopyButton.module.scss"
import CopyIcon from "../../../CopyIcon";
import { Typography } from "../../../Typography/Typography";

interface CopyButtonProps extends ButtonProps {
    copiedText: string
}

const CopyButton = ({children, color, borderColor, animatedHover, copiedText, onClick}: CopyButtonProps) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
        >
            <Button animatedHover={animatedHover} borderColor={borderColor} color={color} onClick={() => {
                navigator.clipboard.writeText(copiedText);
                onClick && onClick();
            }}>
                <div className={css.copyButtonInner}>
                    <CopyIcon isActive={isHovered} />
                    {children}{isHovered}
                </div>
            </Button>
        </div>
    )
}

export default CopyButton;