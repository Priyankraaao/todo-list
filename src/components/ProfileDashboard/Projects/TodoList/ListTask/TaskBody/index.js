import { useDrag } from "react-dnd";
import "./styles.css";
import createOrUpdateTask from "../../hooks/createTask";
import { useState } from "react";

const TaskBody = ({ task, setTasks }) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      type: "TaskBody",
      item: { task: task },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      previewOptions: {
        captureDraggingState: true,
      },
    }));
    const [isHovered, setIsHovered] = useState(false);
  
    const handleRemove = () => {
      setTasks((pv) => {
        const newList = pv.filter((item) => task.id !== item.id);
        return newList;
      });
      createOrUpdateTask({id:task.id,status:"inactive"})
    };
  
    return (
      <>
        <div
          ref={drag}
          className={`card ${isHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="card-content">
            <div className="display-name">{task.name}</div>
            <div className="description">{task.description}</div>
          </div>
          <div className="avatar-div">
          <img src={'/profileAvatar.svg'} alt="Profile Avatar" />
          </div>
          {isHovered && (
            <div className="cancel-icon" onClick={handleRemove}>
              <span>&times;</span>
            </div>
          )}
        </div>
      </>
    );
  };

  export default TaskBody;