import { DroppableProps } from "./model";

export default function DroppableComponent({ id, children, onDrop, onDragEnd }: DroppableProps) {
  return (
    <div className={"droppable"} id={id} onDrop={onDrop} onDragEnd={onDragEnd} data-testid={"droppable_div_" + id}>
      {children}
    </div>
  );
}
