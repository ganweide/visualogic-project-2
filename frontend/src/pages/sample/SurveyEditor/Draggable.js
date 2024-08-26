import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable({ id, data, children, type }) {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { data, type },
  });

  const style = transform
    ? {
        display: "block",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: "grabbing",
        userSelect: "none",
        opacity: isDragging ? 0.5 : 1,
        width: "100%",
        backgroundColor: isDragging ? "#f0f0f0" : "white",
      }
    : undefined;

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      ref={setNodeRef}
      style={style}
      // eslint-disable-next-line
      {...attributes}
      // eslint-disable-next-line
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}


Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

