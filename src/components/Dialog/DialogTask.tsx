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
      <dialog ref={dialogRef}>
        <h3>Title</h3>
        <form method="dialog">
          <WrappedComponent {...props} />
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </form>
      </dialog>
    );
  };
  return DialogTaskWrapper;
};

export default DialogTask;
