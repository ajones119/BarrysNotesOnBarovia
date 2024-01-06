import React, { ReactNode, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
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

  for (let i = 0; i < rows * cols; i++) {
    squares.push(<div key={`square-${i}`} className={css.gridOverlaySquare} style={{height: tokenSize, width: tokenSize, borderColor: gridColor }} />)
  }

  const backgroundImageStyles = {
    backgroundImage: `url('${mapImage})`,
    backgroundSize: cover ? "cover" : "contain",
    backgroundRepeat: "no-repeat"
  }

  return (
    <div
      style={{...CustomStyle, backgroundColor: mapColor, height, width, ...styles, ...backgroundImageStyles }}
    >
      <div style={{position: "relative", width, height}}>
        <div className={css.gridOverlay}>
          {!hideGrid && squares}
        </div>
      </div>
      
      {children}
    </div>
  );
}

export default Map;