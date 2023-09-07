'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./styles.css";
import { toast } from "react-hot-toast";

const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const SignUp = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setEmailError("");
    } else if (name === "username") {
      setUsernameError("");
    }
  };

  const onSignUp = async () => {
    try {
      if (!userData.email) {
        setEmailError("Please fill Email");
        return;
      }

      if (!validateEmail(userData.email)) {
        setEmailError("Invalid email format");
        return;
      }

      if (userData.username.length < 3) {
        setUsernameError("Username must be at least 3 characters long");
        return;
      }

      setIsLoading(true);

      const response = await axios.post("/api/users/signup/", userData);
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="line" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
          paddingTop: 34,
        }}
      >
        <div>
          <input
            className={`input-control ${usernameError ? "input-error" : ""}`}
            id="username"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Type your name"
          />
          {usernameError ? <div className="error">{usernameError}</div> : null}
        </div>
        <div>
          <input
            className={`input-control ${emailError ? "input-error" : ""}`}
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Type your email"
          />
          {emailError ? <div className="error">{emailError}</div> : null}
        </div>

        <input
          className="input-control"
          id="password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Type your password"
        />

        <button
          className="submit-button"
          onClick={() => onSignUp()}
          disabled={isLoading} 
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
