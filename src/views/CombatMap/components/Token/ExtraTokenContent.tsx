import React from "react";
import { getExtraColorsFilterFromNewColor } from "./utils";

type ExtraTokenContentProps = {
    image: string;
    tokenSize?: number;
    height?: number;
    width?: number;
    cover?: boolean;
    color?: string;
    opacity?: number;
    rotate?: number;
    onClick?: () => void;
};

const ExtraTokenContent = ({ image, tokenSize = 16, height = 2, width = 2, cover = false, color, opacity, rotate, onClick }: ExtraTokenContentProps) => {
    return (
        <div style={{width: tokenSize * width, height: tokenSize * height}} onClick={onClick}>
            <img
                src={image}
                width={tokenSize * width}
                height={tokenSize * height}
                style={{
                    objectFit: cover ? "cover" : undefined,
                    filter: color ? getExtraColorsFilterFromNewColor(color) : undefined,
                    opacity: opacity || undefined,
                    transform: `rotate(${rotate}deg)`
                }}
            />
        </div>
    )
}

export default ExtraTokenContent;