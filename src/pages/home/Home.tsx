import { lazy, Suspense, useCallback, useState } from "react";
import DialogTask from "../../components/Dialog/DialogTask";

const CreateBoardComponent = lazy(
  () => import("../../components/CreateBoard/CreateBoardComponent")
);

const DialogBoardComponent = DialogTask(CreateBoardComponent);

const buttonStyle =
  "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Heading</h2>
        <p className="text-gray-700 mb-2">Configure your board.</p>
        <p className="text-gray-600 mb-4">
          Min columns: Todo, In-Progress & Done
        </p>
        <p className="text-gray-600 mb-6">
          Max could be 6 with their desciptive name as per your requirement.
        </p>
        <button className={buttonStyle} onClick={toggleDialog}>
          Create
        </button>
        {isOpen && (
          <Suspense fallback="Loading...">
            <DialogBoardComponent toggleDialog={toggleDialog} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Home;
