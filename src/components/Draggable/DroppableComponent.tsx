import { ReactNode } from "react";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

export default function DroppableComponent({ id, children }: DroppableProps) {
  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      className={"droppable"}
      id={id}
      onDragOver={onDragOver}
      data-testid={"droppable_div_" + id}
    >
      {children}
    </div>
  );
}
