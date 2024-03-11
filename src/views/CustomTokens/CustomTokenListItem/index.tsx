import React from "react";
import css from "./CustomTokenListItem.module.scss"
import { CustomToken } from "@model/CombatMap";
import { getExtraColorsFilterFromNewColor } from "@views/CombatMap/components/Token/utils";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { Typography } from "@components/Typography/Typography";
import { Spacer } from "@components/Spacer/Spacer";

type CustomTokenListItemProps = {
    token: CustomToken;
    onClick: () => void
};

const CustomTokenListItem = ({token, onClick}: CustomTokenListItemProps) => {
    return (
        <div className={css.listItem} onClick={onClick}>
            <img
                src={token.image as string}
                
                style={{
                    filter: token?.canChangeColor ? getExtraColorsFilterFromNewColor(COLORS_MAP.Gray) : undefined,
                    opacity: token?.opacity,
                    maxHeight: 200,
                    maxWidth: 200
                }}
            />
            <Spacer height={16} />
        </div>
    );
}

export default CustomTokenListItem;