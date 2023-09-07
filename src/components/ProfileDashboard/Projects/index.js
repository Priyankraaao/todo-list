"use client";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Header from "./Header";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import "./styles.css";


const ProjectsComponent = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/getuser");
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if(isLoading){
    return null;
  }

  return (
    <div className="container">
      <Header user={user} />

      <div className="section-header">
        <p className="project-title">Projects</p>
        <p className="filter">
          <FaFilter />
          Filter
        </p>
      </div>
      <TodoList userData={user} className="todo-list" />
    </div>
  );
};

export default ProjectsComponent;
