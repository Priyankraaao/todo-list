import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import ProjectMembersModal from "./ProjectMembersModal";

const AVATAR_MAPPING = [
  "/profileAvatar.svg",
  "/avatar2.svg",
  "/avatar3.svg",
  "/avatar4.svg",
  "/avatar5.svg",
];

const OverlappingAvatars = ({ avatars, setIsModalOpen }) => {
  const maxAvatars = 4;
  const visibleAvatars = avatars.slice(0, maxAvatars);
  const remainingAvatarsCount = avatars.length - maxAvatars;

  return (
    <div className="avatar-container">
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`avatar ${index === 0 ? "left-avatar" : ""}`}
          style={{ left: `${index * 20}px` }}
          onClick={() => setIsModalOpen((pv) => !pv)}
        >
          <div className="avatar-inner">
            <img src={avatar.src} alt={`Avatar ${index + 1}`} />
          </div>
        </div>
      ))}

      {remainingAvatarsCount > 0 && (
        <div className="avatar more">+{remainingAvatarsCount}</div>
      )}
    </div>
  );
};

const Header = ({ user }) => {
  const [search, setSearch] = useState();
  const [allUser, setAllUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/getAllUsers");
    setAllUser(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const avatars = allUser.map((item, index) => {
    return { src: AVATAR_MAPPING[index] || "/profileAvatar.svg" };
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 30,
      }}
    >
      <div>
        <input
          className="input-form"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <OverlappingAvatars avatars={avatars} setIsModalOpen={setIsModalOpen} />

      <ProjectMembersModal
        isOpen={isModalOpen}
        onClose={closeModal}
        projectMembers={allUser}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#3A3A3A",
        }}
      >
        Hi {user.username}
        <div className="avatar1">
          <img src={"/profileAvatar.svg"} alt="Profile Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
