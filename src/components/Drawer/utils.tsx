
export const DRAWER_TRANSFORMS = {
    left: {
        from: {translateX: "-100%"},
        enter: {translateX: "0%"},
        leave: {translateX: "-100%"}
    },
    right: {
        from: {translateX: "100%"},
        enter: {translateX: "0%"},
        leave: {translateX: "100%"}
    },
    top: {
        from: {translateY: "-100%"},
        enter: {translateY: "0%"},
        leave: {translateY: "-100%"}
    },
    bottom: {
        from: {translateY: "100%"},
        enter: {translateY: "0%"},
        leave: {translateY: "100%"}
    }
}