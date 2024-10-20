import { forwardRef } from "react";

const CustomPlaceholder = forwardRef(
  ({ onDragOver, onDrop, id, width, height }: any, ref: any) => (
    <div
      id={id}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={ref}
      data-testid={`placeholder_div_${id}`}
      style={{ width, height, border: "3px dashed #000" }}
    />
  )
);

export default CustomPlaceholder;
