import React from "react";

type ExtraTokenContentProps = {
    image: string;
    tokenSize?: number;
    height?: number;
    width?: number;
    cover?: boolean;
};

const ExtraTokenContent = ({ image, tokenSize = 16, height = 2, width = 2, cover = false }: ExtraTokenContentProps) => {
    return (
        <div style={{width: tokenSize * width, height: tokenSize * height}}>
            <img
                src={image}
                width={tokenSize * width}
                height={tokenSize * height}
                style={{objectFit: cover ? "cover" : undefined}}
            />
        </div>
    )
}

export default ExtraTokenContent;