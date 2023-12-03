import React, { ReactNode } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import css from "./Map.module.scss";

const CustomStyle = {
  display: "flex",
  width: "600px",
  height: "600px",
  background: "#7f8554"
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
  cover?: boolean
}

const  Map = ({ children, cols = 15, rows = 7, tokenSize = 46, styles, mapImage, cover = true }: MapProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "map"
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  const height = rows * tokenSize;
  const width = cols * tokenSize;
  const squares = [];

  for (let i = 0; i < rows * cols; i++) {
    squares.push(<div className={css.gridOverlaySquare} style={{height: tokenSize, width: tokenSize }} />)
  }

  const backgroundImageStyles = {
    backgroundImage: `url('${mapImage})`,
    backgroundSize: cover ? "cover" : "contain",
    backgroundRepeat: "no-repeat"
  }

  return (
    <div
      ref={setNodeRef}
      style={{...CustomStyle, ...style, height, width, ...styles, ...backgroundImageStyles }}
      {...listeners}
      {...attributes}
    >
      <div style={{position: "relative", width, height}}>
        <div className={css.gridOverlay}>
          {squares}
        </div>
      </div>
      
      {children}
    </div>
  );
}

export default Map;