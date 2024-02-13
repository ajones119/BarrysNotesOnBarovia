import { useWindowSize } from "usehooks-ts";

const mobile = 600;
const tablet = 1080;

const useDeviceSizeHook = () => {
    const {width} = useWindowSize();

    return {
        isMobile: width <= mobile,
        isTablet: width > mobile && width < tablet,
        isDesktop: width >= tablet
    }
}

export default useDeviceSizeHook;