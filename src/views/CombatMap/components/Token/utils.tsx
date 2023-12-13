import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";

export const ConditionsOverlayMap = {
    default: "transparent",
    poisoned: "green",
    charmed: "gold",
}

export const PreConditions = [
    "burning",
    "petrified",
]

export const WrapperConditions = [
    "flying"
];

export const getExtraColorsFilterFromNewColor = (color: string) => {
    let filters = `brightness(0) saturate(100%) `

    switch (color) {
        case COLORS_MAP.Blue:
            filters += `invert(11%) sepia(92%) saturate(5095%) hue-rotate(247deg) brightness(96%) contrast(135%)`;
            break;

        case COLORS_MAP.Green:
            filters += `invert(67%) sepia(85%) saturate(3927%) hue-rotate(75deg) brightness(99%) contrast(126%)`;
            break;

        case COLORS_MAP.Lime:
            filters += `invert(77%) sepia(100%) saturate(1265%) hue-rotate(27deg) brightness(97%) contrast(115%)`;
            break;
        
        case COLORS_MAP.Orange:
            filters += `invert(37%) sepia(80%) saturate(4714%) hue-rotate(6deg) brightness(102%) contrast(98%)`;
            break;

        case COLORS_MAP.Pink:
            filters += `invert(32%) sepia(95%) saturate(1466%) hue-rotate(309deg) brightness(99%) contrast(86%)`;
            break;
        
        case COLORS_MAP.Red:
            filters += `invert(18%) sepia(94%) saturate(7484%) hue-rotate(360deg) brightness(107%) contrast(106%)`;
            break;

        case COLORS_MAP.Sky:
            filters += `invert(71%) sepia(51%) saturate(2415%) hue-rotate(180deg) brightness(101%) contrast(101%)`;
            break;

        case COLORS_MAP.White:
            filters += `invert(100%) sepia(0%) saturate(7408%) hue-rotate(302deg) brightness(128%) contrast(108%)`;
            break;

        case COLORS_MAP.Yellow:
            filters += `invert(77%) sepia(57%) saturate(1919%) hue-rotate(355deg) brightness(98%) contrast(108%)`;
            break;
        
        case COLORS_MAP.Gray:
            filters += `invert(57%) sepia(0%) saturate(209%) hue-rotate(159deg) brightness(91%) contrast(79%)`;
            break;

        case COLORS_MAP.Brown:
            filters += `invert(19%) sepia(99%) saturate(1965%) hue-rotate(31deg) brightness(94%) contrast(101%)`;
            break;
    }



    return filters;
}