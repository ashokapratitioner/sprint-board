import { ReactNode } from "react";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

export default function DroppableComponent({ id, children }: DroppableProps) {

  // const dragOver = (e: any) => {
  //   e.preventDefault();
  // };
  

  // function drop(e: any) {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData(id);
  //   //e.target.appendChild(document.getElementById(data));
  // }

  return (
    <div
      className={"droppable"}
      id={id}
      // onDragOver={dragOver}
      data-testid={"droppable_div_" + id}
      // onDrop={drop}
    >
      {children}
    </div>
  );
}
