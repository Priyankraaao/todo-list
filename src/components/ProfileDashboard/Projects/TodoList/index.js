import React, { useEffect, useState } from "react";
import ListTask from "./ListTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import getTasks from "./hooks/getTask";

const TodoList = ({ userData = {} }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((result) => {
        setTasks(result.tasks)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <ListTask userData={userData} alltasks={tasks} />
    </DndProvider>
  );
};

export default TodoList;
