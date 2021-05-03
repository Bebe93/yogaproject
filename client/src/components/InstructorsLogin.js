import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";

export default function InstructorsLogin() {
  const [instructor, setInstructor] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setInstructor((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label className="form-label" htmlFor="mail">
          Email:
          <input
            name="email"
            value={instructor.email}
            type="text"
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            value={instructor.password}
            type="password"
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <button className="btn mt-2 mx-3">Login</button>
      </form>
    </div>
  );
}
