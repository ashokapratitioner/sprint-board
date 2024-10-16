import { ComponentType } from "react";

export const getPlaceholderMarkup = (
  WrappedComponent: ComponentType<any>,
  id: string
) => {
  return () => {
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData(id);
      console.log(data);
    };

    return <WrappedComponent onDragOver={dragOver} onDrop={drop} />;
  };
};
