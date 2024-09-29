import { render, screen } from "@testing-library/react";
import DialogTask from "./DialogTask";

const DialogTasksTest = () => {
  //Arrange
  const Dummy = () => <>Dummy</>;
  const HOC = DialogTask(Dummy);
  render(<HOC />);

  //Act
};
