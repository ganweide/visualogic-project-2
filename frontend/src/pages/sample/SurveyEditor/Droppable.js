import React from "react";
import PropTypes from "prop-types";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, id, hovered }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    border: isOver || hovered ? "2px solid green" : null,
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

Droppable.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  hovered: PropTypes.bool,
};
