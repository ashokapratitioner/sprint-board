import TaskQuickView from "../Tasks/TaskQuickView";
import PaperContentComponent from "./PaperContentComponent";
import PaperPlaceholderComponent from "./PaperPlaceholderComponent";
import styles from "./paper.style.module.css";

const defaultColumn = [{ name: "Default", value: "default", order: null }];

function allowDrop(e: any) {
  e.preventDefault();
}

function drop(e: any) {
  let data = e.dataTransfer.getData("Task");
  console.log(data);
  // e.target.appendChild(document.getElementById(data));
  e.preventDefault();
}

export default function PaperContainerComponent({
  columns = defaultColumn,
  data,
}: any) {
  return (
    <div
      onDrop={drop}
      onDragOver={allowDrop}
      className={styles.paperContainer}
      data-testid="paper-container"
    >
      {columns.map(({ name, value }: any) => (
        <PaperPlaceholderComponent
          key={"paper-placeholder_" + value}
          title={name}
          value={value}
        >
          {data?.map(
            (task: any) =>
              task.status === value && (
                <PaperContentComponent key={task.id}>
                  <TaskQuickView {...task} />
                </PaperContentComponent>
              )
          )}
        </PaperPlaceholderComponent>
      ))}
    </div>
  );
}
