import React from "react";
import { getExtraColorsFilterFromNewColor } from "./utils";

type ExtraTokenContentProps = {
    image: string;
    tokenSize?: number;
    height?: number;
    width?: number;
    cover?: boolean;
    color?: string;
};

const ExtraTokenContent = ({ image, tokenSize = 16, height = 2, width = 2, cover = false, color }: ExtraTokenContentProps) => {
    return (
        <div style={{width: tokenSize * width, height: tokenSize * height}}>
            <img
                src={image}
                width={tokenSize * width}
                height={tokenSize * height}
                style={{objectFit: cover ? "cover" : undefined, filter: color ? getExtraColorsFilterFromNewColor(color) : undefined}}
            />
        </div>
    )
}

export default ExtraTokenContent;