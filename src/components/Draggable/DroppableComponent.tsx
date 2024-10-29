import { useRef } from "react";
import { DroppableProps } from "./model";

export default function DroppableComponent({ id, children }: DroppableProps) {

  return (
    <div
      className={"droppable"}
      id={id}
      data-testid={"droppable_div_" + id}
    >
      {children}
    </div>
  );
}
