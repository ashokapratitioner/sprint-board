import { ComponentType, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const DialogTask = (WrappedComponent: ComponentType<any>) => {
  const DialogTaskWrapper = (props: any) => {
    const { id } = useParams();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    }, [id]);

    const handleClose = () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };

    return (
      <dialog ref={dialogRef} className="p-2 rounded">
        <h3>{props.title ?? "Title"}</h3>
          <WrappedComponent {...props} />
          <button  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200" type="button" onClick={handleClose}>
            Close
          </button>
      </dialog>
    );
  };
  return DialogTaskWrapper;
};

export default DialogTask;
