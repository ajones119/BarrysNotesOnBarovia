import React, { MouseEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import css from "./Map.module.scss";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import { CombatMap } from "@model/CombatMap";
import GridCanvas from "@components/Canvas/Grid";
import DrawableCanvas from "@components/Canvas/Drawable";
import { useSearchParams } from "react-router-dom";

const CustomStyle = {
  display: "flex",
  width: "600px",
  height: "600px",
};

type MapProps = {
  children?: ReactNode,
  map: CombatMap,
  styles?: any,
  scale?: number,
  onSaveDraw: (data: string) => void,
  onFogOfWarSaveDraw: (data: string) => void,
  lines?: string,
  fogOfWar?: string,
  isPlayer?: boolean
}

const  Map = ({
  children,
  map,
  styles,
  scale = 1,
  onSaveDraw,
  onFogOfWarSaveDraw,
  lines,
  fogOfWar,
  isPlayer
}: MapProps) => {

  const {
    columns: cols = 15,
    rows = 7,
    tokenSize: mapTokenSize = 30,
    hideGrid = false,
    mapColor = COLORS_MAP.White,
    gridColor = COLORS_MAP.Black,
    mapImage,
    gridOffsetX = 0,
    gridOffsetY = 0,
    cover = false,
    gridLineWidth = 1,
    autoGrid = false,
  } = map
  const tokenSize = mapTokenSize * scale
  const ref = useRef<HTMLDivElement>(null);
  const height = rows * tokenSize;
  const width = cols * tokenSize;
  const squares = [];
  const [searchParams] = useSearchParams();
  const drawing = String(searchParams.get("drawing")) || "";
  const color = String(searchParams.get("color")) || "black";
  const drawSize = Number(searchParams.get("drawSize")) || 1;
  const eraserOn = searchParams.get("eraserOn") === "on" || false;
  const isDrawing = drawing === "drawing" || drawing === "fogOfWar"

  if (!hideGrid) {
    for (let i = 0; i < rows * cols; i++) {
      squares.push(<div key={`square-${i}`} className={css.gridOverlaySquare} style={{height: tokenSize, width: tokenSize, borderColor: gridColor }} />)
    }
  }

  const backgroundImageStyles = {
    backgroundImage: `url('${mapImage})`,
    backgroundSize: cover ? "cover" : "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: cover || !mapImage ?  mapColor: "transparent",
  }


  return (
    <div style={{width: width * 1.5,}}>
      <div
        ref={ref}
        className={`${isDrawing && css.hideCursor}`}
        style={{...CustomStyle, height, width, ...styles, ...backgroundImageStyles, marginLeft: "20%", marginTop: "20%"}}
      >
        

        <div style={{position: "absolute", width, height, marginLeft: gridOffsetX * tokenSize, marginTop: gridOffsetY * tokenSize}}>
          <div className={css.gridOverlay} style={{paddingLeft: gridOffsetX, paddingTop: gridOffsetY}}>

            {!hideGrid && <GridCanvas lineWidth={gridLineWidth || 1} gridColor={gridColor} width={width} height={height} sideLength={tokenSize} />}

          </div>
        </div>
        <div style={{position: "absolute", width, height, pointerEvents: drawing !== "drawing" ? "none" : undefined}}>
            <DrawableCanvas scale={scale} pointColor={color} pointSize={drawSize} isErasing={eraserOn} disabled={drawing !== "drawing"} width={width} height={height} onDrawEnd={(data) => onSaveDraw(data || "")} loadData={lines || ""} />
        </div>
        <div style={{position: "absolute", opacity: isPlayer ? 1 : 0.5, width, height, zIndex: 10, pointerEvents: drawing !== "fogOfWar" ? "none" : undefined}}>
            <DrawableCanvas scale={scale} pointColor={color} pointSize={drawSize}  isErasing={eraserOn} disabled={drawing !== "fogOfWar"} width={width} height={height} onDrawEnd={(data) => onFogOfWarSaveDraw(data || "")} loadData={fogOfWar || ""} />
        </div>
        
        {children}
      </div>
    </div>
  );
}

export default Map;