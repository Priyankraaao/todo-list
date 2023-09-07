import { useDrop } from "react-dnd";
import "./styles.css";
import Header from "../Header";
import CreateTask from "../../CreateTask";
import TaskBody from "../TaskBody";
import createOrUpdateTask from "../../hooks/createTask";

const Section = ({
  status,
  todo = [],
  inProgress = [],
  completed = [],
  setTodos = () => {},
  setInProgress = () => {},
  setCompleted = () => {},
  userData = {},
}) => {
  const STATUS_TYPE_MAPPING = {
    todo: {
      tasksList: todo,
      setFunction: setTodos,
      name: "Todo",
    },
    inProgress: {
      tasksList: inProgress,
      setFunction: setInProgress,
      name: "InProgess",
    },
    completed: {
      tasksList: completed,
      setFunction: setCompleted,
      name: "Completed",
    },
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TaskBody",
    drop: (item) => addItemToSection(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addItemToSection = (item) => {
    const removeFromPrevSection = STATUS_TYPE_MAPPING[item.task.status].setFunction;

    removeFromPrevSection((pv) => {
      const filterList = pv.filter((i) => {
        return i.id !== item.task.id;
      });
      return filterList;
    });

    const setStatusFunction = STATUS_TYPE_MAPPING[status].setFunction;

    createOrUpdateTask({ ...item.task, status: status });

    setStatusFunction((pv) => {
      return [{ ...item.task, status: status, userData: userData }, ...pv];
    });
  };

  return (
    <div ref={drop} className="section-container">
      <Header
        status={STATUS_TYPE_MAPPING[status].name}
        count={STATUS_TYPE_MAPPING[status].tasksList.length}
      />

      <CreateTask
        key={status}
        tasks={STATUS_TYPE_MAPPING[status].tasksList}
        setTasks={STATUS_TYPE_MAPPING[status].setFunction}
        status={status}
        userData={userData}
      />

      <div className="section-content">
        {STATUS_TYPE_MAPPING[status].tasksList?.map((item) => {
          return (
            <TaskBody
              key={item.id}
              task={item}
              setTasks={STATUS_TYPE_MAPPING[status].setFunction}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Section;
