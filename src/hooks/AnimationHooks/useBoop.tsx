import { useSpring } from "@react-spring/web";
import { useCallback, useEffect, useState } from "react";

export type BoopProps = {
    xpos?: number,
    ypos?: number,
    rotation?: number,
    scale?: number,
    timing?: number,
    timed?: boolean,
    springConfig?: {
        tension?: number,
        friction?: number
    }
    disabled?: boolean
}

const useBoop = ({
    xpos = 0,
    ypos = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    timed = true,
    springConfig = {
      tension: 300,
      friction: 10,
    },
    disabled = false,
  }: BoopProps) => {
    const [isBooped, setIsBooped] = useState(false);
    const style = useSpring({
      transform: isBooped && !disabled
        ? `translate(${xpos}px, ${ypos}px)
           rotate(${rotation}deg)
           scale(${scale})`
        : `translate(0px, 0px)
           rotate(0deg)
           scale(1)`,
      config: springConfig,
    });
    useEffect(() => {
        if (!isBooped) {
          return;
        }

        const timeoutId = window.setTimeout(() => {
          timed && setIsBooped(false);
        }, timing);

        return () => {
          window.clearTimeout(timeoutId);
        };

      }, [isBooped, timing]);

    const trigger = useCallback((newValue = true) => {
      setIsBooped(newValue);
    }, []);
    return {style, trigger};
  }

  export default useBoop