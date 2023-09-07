import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignUp from "./SignUp";
import Login from "./Login";
import "./styles.css";

const componentMapping = {
  signup: SignUp,
  login: Login,
};

const Authorization = ({ type = "signup" }) => {
  const FormComponent = componentMapping[type];
  const router = useRouter();

  return (
    <div className="parent">
      <div className="left-component">
        <Image
          src={"/homeScreen.svg"}
          alt="Vercel Logo"
          className="logo"
          width={"500"}
          height={"500"}
          priority
        />
      </div>

      <div className="right-component">
        <span className="tab">
          <button
            className={`text ${type === "login" ? "active" : ""}`}
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
          <button
            className={`text ${type === "signup" ? "active" : ""}`}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        </span>

        <div className="form-component">
          <FormComponent key={type} />
        </div>
      </div>
    </div>
  );
};

export default Authorization;
