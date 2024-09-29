import { ReactNode } from "react";

type DraggableProps = {
  id: string;
  key: string | number;
  children: ReactNode;
};

export default function DraggableComponent({
  key,
  id,
  children,
}: DraggableProps) {
  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div id={id} onDragOver={onDragOver} data-testid={"droppable_div_" + key}>
      {children}
    </div>
  );
}
