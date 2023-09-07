import React from "react";
import "./styles.css";

const ProjectMembersModal = ({ isOpen, onClose, projectMembers }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Project Members</h2>
        <ul className="member-list">
          {projectMembers.map((member, index) => (
            <li key={index} className="member-item">
              <img
                src={member.avatar || "/profileAvatar.svg"}
                alt={member.name}
                className="avatar"
              />
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.email}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="cancel-icon" onClick={onClose}>
          <span>&times;</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectMembersModal;
