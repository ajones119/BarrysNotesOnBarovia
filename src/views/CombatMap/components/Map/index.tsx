import React, { ReactNode, useEffect, useRef } from "react";
import css from "./Map.module.scss";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";

const CustomStyle = {
  display: "flex",
  width: "600px",
  height: "600px",
};

const TOKEN_SIZES = {
  small: 16,
  medium: 32,
  large: 48
}

type MapProps = {
  children?: ReactNode,
  cols?: number,
  rows?: number,
  tokenSize?: number,
  styles?: any,
  mapImage?: string,
  cover?: boolean,
  hideGrid?: boolean,
  mapColor?: string,
  gridColor?: string
}

const  Map = ({
  children,
  cols = 15,
  rows = 7,
  tokenSize = 46,
  styles,
  mapImage,
  cover = true,
  hideGrid = false,
  mapColor = COLORS_MAP.White,
  gridColor = COLORS_MAP.Black,
}: MapProps) => {
  const height = rows * tokenSize;
  const width = cols * tokenSize;
  const squares = [];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView()
  },[])

  for (let i = 0; i < rows * cols; i++) {
    squares.push(<div key={`square-${i}`} className={css.gridOverlaySquare} style={{height: tokenSize, width: tokenSize, borderColor: gridColor }} />)
  }

  const backgroundImageStyles = {
    backgroundImage: `url('${mapImage})`,
    backgroundSize: cover ? "cover" : "contain",
    backgroundRepeat: "no-repeat"
  }

  return (
    <div style={{width: width * 1.5}}>
    <div
      ref={ref}
      style={{...CustomStyle, backgroundColor: mapColor, height, width, ...styles, ...backgroundImageStyles, marginLeft: 250}}
    >
      <div style={{position: "relative", width, height}}>
        <div className={css.gridOverlay}>
          {!hideGrid && squares}
        </div>
      </div>
      
      {children}
    </div>
    </div>
  );
}

export default Map;