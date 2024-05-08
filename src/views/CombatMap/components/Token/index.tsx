import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import css from "../../CombatMap.module.scss"

const CustomStyle = {
  display: "flex",
};

type TokenProps = {
  id: string;
  content: ReactNode;
  styles?: React.CSSProperties;
  disabled?: boolean,
  canResize?: boolean,
  //need to add this to other tokens and reduce array searches
  data?: any
};

function Token({ id, content, styles = {}, disabled = false, data = null }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id, disabled, data
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
        //maybe add transition here?
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
      {...listeners}
      {...attributes}
      key={id || ""}
      className={`${css.tokenWrapper} `}
    >
      {content}
    </div>
  );
}

export default Token;

/*
    const {listeners, setNodeRef, setActivatorNodeRef, transform} = useDraggable({
        id: `${token.id}-resize-bottom-right`,
        data: {}
    })
    let calculatedWidth = baseTokenSize * width;
    let calculatedHeight = baseTokenSize * length;
    if (transform) {
        calculatedWidth += transform.x;
        calculatedHeight += transform.y;
    }


    ////


     <div 
            style={{
                position: "absolute",
                
            }}
            ref={setNodeRef}
        >
            <div ref={setActivatorNodeRef} {...listeners}>
                <FontAwesomeIcon
                    icon={faAnglesRight}
                    style={{
                        filter: color ? getExtraColorsFilterFromNewColor(color) : undefined,
                        opacity: opacity || undefined,
                        userSelect: "none",
                    }}
                />
            </div>

        </div>
*/