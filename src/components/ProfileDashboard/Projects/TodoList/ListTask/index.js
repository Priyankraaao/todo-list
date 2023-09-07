import React, { useEffect, useState } from "react";
import Section from "./Section";
import "./styles.css";

const statuses = ["todo", "inProgress", "completed"];

const ListTask = ({ userData = {}, alltasks = [] }) => {
  const [todos, setTodos] = useState(() =>
    alltasks.filter((item) => item.status === "todo")
  );
  const [inProgress, setInProgress] = useState(() =>
    alltasks.filter((item) => item.status === "inProgress")
  );
  const [completed, setCompleted] = useState(() =>
    alltasks.filter((item) => item.status === "completed")
  );

  useEffect(() => {
    setTodos(() => alltasks.filter((item) => item.status === "todo"));
    setInProgress(() =>
      alltasks.filter((item) => item.status === "inProgress")
    );
    setCompleted(() => alltasks.filter((item) => item.status === "completed"));
  }, [alltasks]);

  return (
    <div className="list-task-container">
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            todo={todos}
            inProgress={inProgress}
            completed={completed}
            setTodos={setTodos}
            setInProgress={setInProgress}
            setCompleted={setCompleted}
            userData={userData}
          />
        );
      })}
    </div>
  );
};

export default ListTask;
