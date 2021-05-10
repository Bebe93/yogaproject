import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function Register() {
  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInstructor((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInstructor();
  };

  const addInstructor = async () => {
    const { name, email, password, photo } = instructor;
    try {
      const instructor = await axios.post("/instructor/register", {
        name,
        email,
        password,
        photo,
      });
      history.push("/login");
      console.log("Your information has been registered!", instructor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registerForm">
      <h2>Register as an instructor</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Name
          <input
            onChange={handleChange}
            name="name"
            value={instructor.name}
            type="text"
            id="name"
            className="form-control"
          />
        </label>

        <br />
        <label className="form-label" htmlFor="email">
          Email
          <input
            onChange={handleChange}
            name="email"
            value={instructor.email}
            type="text"
            id="email"
            className="form-control"
          />
        </label>
        <br />
        <label className="form-label" htmlFor="password">
          Password
          <input
            onChange={handleChange}
            name="password"
            value={instructor.password}
            type="password"
            id="password"
            className="form-control"
          />
        </label>
        <br />
        <label className="form-label" htmlFor="username">
          Photo
          <input
            onChange={handleChange}
            name=""
            value={instructor.photo}
            type="text"
            id=""
            className="form-control"
          />
        </label>
        <br />
        <button className="loginButton btn mb-5">Register</button>
      </form>
    </div>
  );
}
