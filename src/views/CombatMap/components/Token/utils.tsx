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

    }



    return filters;
}