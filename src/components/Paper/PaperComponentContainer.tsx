import { ReactNode } from "react";
import TaskQuickView from "../Tasks/TaskQuickView";
import PaperContentComponent from "./PaperContentComponent";
import PaperPlaceholderComponent from "./PaperPlaceholderComponent";
import styles from "./paper.style.module.css";
import DroppableComponent from "../Draggable/DroppableComponent";
import DraggableComponent from "../Draggable/DraggableComponent";

const defaultColumn = [{ name: "Default", value: "default", order: null }];

type DroppableProps = {
  key: string;
  value: string;
  name: string;
  draggable: boolean;
  children: ReactNode;
};

const DroppableContainer = ({
  value,
  name,
  draggable,
  children,
}: DroppableProps): JSX.Element => {
  if (draggable) {
    return (
      <DroppableComponent id={value}>
        <PaperPlaceholderComponent title={name} value={value}>
          {children}
        </PaperPlaceholderComponent>
      </DroppableComponent>
    );
  } else {
    return (
      <PaperPlaceholderComponent title={name} value={value}>
        {children}
      </PaperPlaceholderComponent>
    );
  }
};

const DraggableItem = ({ id, draggable, updateDraggable, children }: any) => {
  if (draggable) {
    return (
      <DraggableComponent id={id} updateDraggable={updateDraggable}>
        <PaperContentComponent key={id}>{children}</PaperContentComponent>
      </DraggableComponent>
    );
  }
  return <PaperContentComponent key={id}>{children}</PaperContentComponent>;
};

export default function PaperContainerComponent({
  columns = defaultColumn,
  data,
  dragSupport = false,
}: any) {
  const updateDraggable = (id: string) => {
    console.log(id);
  };

  return (
    <div className={styles.paperContainer} data-testid="paper-container">
      {columns.map(({ name, value }: any) => (
        <DroppableContainer
          key={value}
          value={value}
          name={name}
          draggable={dragSupport}
        >
          {data?.map(
            (task: any) =>
              task.status === value && (
                <DraggableItem
                  key={task.id}
                  id={task.id}
                  draggable={dragSupport}
                  updateDraggable={updateDraggable}
                >
                  <TaskQuickView {...task} />
                </DraggableItem>
              )
          )}
        </DroppableContainer>
      ))}
    </div>
  );
}
