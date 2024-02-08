import ArrowRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleUp from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";

export const DRAWER_TRANSFORMS = {
    left: {
        from: { translateX: "-100%" },
        enter: { translateX: "0%" },
        leave: { translateX: "-100%" }
    },
    right: {
        from: {  },
        enter: { },
        leave: {  }
    },
    top: {
        from: { translateY: "-100%" },
        enter: { translateY: "0%" },
        leave: { translateY: "-100%" }
    },
    bottom: {
        from: { translateY: "100%" },
        enter: { translateY: "0%" },
        leave: { translateY: "100%" }
    }
}

export const DRAWER_BUTTON_TRANSFORMS = {
    left: (isOpen: boolean) => { return { left: isOpen ? 455 : 0 } },
    right: (isOpen: boolean) => { return { right: isOpen ? 455 : 0 } },
    top: (isOpen: boolean) => { return { bottom: isOpen ? "5%" : null } },
    bottom: (isOpen: boolean) => { return { top: isOpen ? "5%" : null } },
}

export const DrawerIconButtons = {
    left: {
        open: <ArrowRightIcon />,
        close: <ArrowLeftIcon />
    },
    right: {
        open: <ArrowLeftIcon />,
        close: <ArrowRightIcon />
    },
    bottom: {
        open: <ArrowCircleUp />,
        close: <ArrowCircleDown />
    },
    top: {
        open: <ArrowCircleDown />,
        close: <ArrowCircleUp />
    },
}
