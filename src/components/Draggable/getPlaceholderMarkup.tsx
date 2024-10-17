import { ComponentType, useRef } from "react";

export const getPlaceholderMarkup = (
  WrappedComponent: ComponentType<any>,
  id: string
) => {
  return () => {
    const tarRef = useRef<HTMLDivElement>(null);

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/html");
      if (tarRef.current && data) {
        tarRef.current.innerHTML = data;
      }
    };

    return (
      <WrappedComponent ref={tarRef} onDragOver={dragOver} onDrop={drop} />
    );
  };
};
