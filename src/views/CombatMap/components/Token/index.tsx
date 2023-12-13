import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  display: "flex",
};

type TokenProps = {
  id: string;
  content: ReactNode;
  styles: any;
  disabled?: boolean,
};

function Token({ id, content, styles, disabled = false }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id, disabled
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
      key={id || ""}
    >
      {content}
    </div>
  );
}

export default Token;