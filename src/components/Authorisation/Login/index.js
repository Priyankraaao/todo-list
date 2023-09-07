import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./styles.css";

const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

function Login() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setEmailError("");
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const onLogin = async () => {
    try {
      if (!userData.email) {
        setEmailError("Please fill email");
        return;
      }
      if (!validateEmail(userData.email)) {
        setEmailError("Invalid email format");
        return;
      }

      setLoading(true);

      const response = await axios.post("/api/users/login", userData);
      toast.success("Login success");
      setError("");
      router.push(`/profile/${response.data.user_id}/projects`);
    } catch (error) {
      setError(error?.response?.data.error);
      toast.error(error?.response?.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="line" />
      <span className="primary-text">To Continue</span>
      <span className="secondary-text">We need your Name & Email</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
          paddingTop: 20,
        }}
      >
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
          {emailError && <div className="error">{emailError}</div>}
        </div>

        <div>
          <input
            className="input-control"
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Type your password"
          />
        </div>
        <div>
          <button
            className="submit-button"
            onClick={onLogin}
            disabled={loading} 
          >
            {loading ? "Logging..." : "Log in"}
          </button>
          {error && <div className="error">{error}</div>}
        </div>

        {/* <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember Me
          </label>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
