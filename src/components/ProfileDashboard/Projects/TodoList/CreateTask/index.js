import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import createOrUpdateTask from "../hooks/createTask";

const CreateTask = ({ setTasks = () => {}, tasks = [], status = "todo", userData = {} }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: status,
    description: "",
    userId: userData._id,
  });
  const [show, setShow] = useState(false);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validateInputs = () => {
    let isValid = true;

    if (task.name.trim() === "") {
      setNameError("Task title is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (task.description.trim() === "") {
      setDescriptionError("Task description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setTasks((prevTasks) => {
      const list = [task, ...(prevTasks || [])];
      return list;
    });

    createOrUpdateTask(task)
    setShow(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => {
          setShow((prevShow) => !prevShow);
        }}
        className="add-button"
      >
        {show ? "-" : "+"}
      </button>
      {show ? (
        <form onSubmit={handleSubmit}>
          <div className="create-task">
            <input
              className={`input-form ${nameError ? "input-error" : ""}`}
              placeholder="Give your task a title"
              value={task.name}
              onChange={(e) =>
                setTask({ ...task, id: uuidv4(), name: e.target.value })
              }
            />
           
            <textarea
              className={`textarea-form ${descriptionError ? "input-error" : ""}`}
              placeholder="Description.."
              value={task.description}
              onChange={(e) => {
                setTask({ ...task, id: uuidv4(), description: e.target.value });
              }}
            />
            
          </div>
          <button className="add-button">+</button>
        </form>
      ) : null}
    </div>
  );
};

export default CreateTask;
