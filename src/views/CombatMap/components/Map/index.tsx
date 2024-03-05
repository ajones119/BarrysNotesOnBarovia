import React, { ReactNode, useEffect, useRef } from "react";
import css from "./Map.module.scss";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { CombatMap } from "@model/CombatMap";

const CustomStyle = {
  display: "flex",
  width: "600px",
  height: "600px",
};

type MapProps = {
  children?: ReactNode,
  map: CombatMap,
  styles?: any,
  scale?: number
}

const  Map = ({
  children,
  map,
  styles,
  scale = 1
}: MapProps) => {

  const {
    columns: cols = 15,
    rows = 7,
    tokenSize: mapTokenSize = 46,
    hideGrid = false,
    mapColor = COLORS_MAP.White,
    gridColor = COLORS_MAP.Black,
    mapImage,
    gridOffsetX = 0,
    gridOffsetY = 0,
    cover = false,
  } = map
  const tokenSize = mapTokenSize * scale
  const ref = useRef<HTMLDivElement>(null);
  const height = rows * tokenSize;
  const width = cols * tokenSize;
  const squares = [];
  for (let i = 0; i < rows * cols; i++) {
    squares.push(<div key={`square-${i}`} className={css.gridOverlaySquare} style={{height: tokenSize, width: tokenSize, borderColor: gridColor }} />)
  }

  const backgroundImageStyles = {
    backgroundImage: `url('${mapImage})`,
    backgroundSize: cover ? "cover" : "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: cover || !mapImage ?  mapColor: "transparent",
  }

  return (
    <div style={{width: width * 1.5}}>
      <div
        ref={ref}
        style={{...CustomStyle, height, width, ...styles, ...backgroundImageStyles, marginLeft: "20%", marginTop: "20%"}}
      >
        <div style={{position: "absolute", width, height, marginLeft: gridOffsetX * tokenSize, marginTop: gridOffsetY * tokenSize}}>
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