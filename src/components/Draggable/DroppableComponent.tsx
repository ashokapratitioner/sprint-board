import { DroppableProps } from "./model";

export default function DroppableComponent({ id, children }: DroppableProps) {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={"droppable"}
      id={id}
      onDrop={onDrop}
      data-testid={"droppable_div_" + id}
    >
      {children}
    </div>
  );
}
