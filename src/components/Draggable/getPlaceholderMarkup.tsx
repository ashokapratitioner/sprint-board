import { ComponentType, useRef, useState } from "react";
import { addAttributes, removeStyleProperties } from "./config.properties";

export const getPlaceholderMarkup = (
  WrappedComponent: ComponentType<any>,
  id: string
) => {
  return () => {
    const tarRef = useRef<HTMLDivElement>(null);
    // const [order, setOrder] = useState<string[]>([])

    console.log("Rendered");

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      if (tarRef.current && data && tarRef?.current.id !== id) {
        const element = document.getElementById(data);
        if (element) {
          const parentNode = tarRef.current.parentNode as HTMLDivElement;
          parentNode.replaceChild(element, tarRef.current);
          removeStyleProperties(tarRef.current);
          addAttributes<{ [key: string]: string }>(tarRef.current, {
            id: data,
          });
          e.dataTransfer.setData("text/plain", "");
        }
      }
    };

    return (
      <WrappedComponent ref={tarRef} onDragOver={dragOver} onDrop={drop} />
    );
  };
};
