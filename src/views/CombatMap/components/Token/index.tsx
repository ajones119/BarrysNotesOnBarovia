import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  display: "flex",
};

type TokenProps = {
  id: string;
  content: ReactNode;
  styles: any;
};

function Token({ id, content, styles }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
      {...listeners}
      {...attributes}
    >
      {content}
    </div>
  );
}

export default Token;