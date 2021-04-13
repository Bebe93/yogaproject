import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Classes() {
  let history = useHistory();
  let pathname = history.location.pathname;
  let query = history.location.search;

  const [classes, setClasses] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selection, setSelection] = useState({
    style: "",
    day: "",
  });

  const fetchClasses = async () => {
    let response;
    if (query !== "") {
      response = await fetch(`${pathname}${query}`);
    } else {
      response = await fetch(`${pathname}`);
    }

    const data = await response.json();
    setClasses(data);
  };

  const fetchStyles = async () => {
    const response = await fetch(`/yogastyles`);
    const data = await response.json();
    setStyles(data);
  };

  useEffect(() => {
    console.log(history.location);
    //test
    if (query) {
      setSelection({
        style: query.charAt(query.length - 1),
        day: "",
      });
    }
    fetchClasses();
    fetchStyles();
  }, []);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setSelection((selection) => ({
      ...selection,
      [key]: value,
    }));
  };

  const filter = async (event) => {
    event.preventDefault();
    const path = [];
    for (let item in selection) {
      if (selection[item] !== "") {
        path.push(`${item}=${selection[item]}`);
      }
    }
    history.push(`/classes/?${path.join("&")}`);
    const response = await fetch(`/classes/?${path.join("&")}`);
    const data = await response.json();
    setClasses(data);
  };

  const clearFilter = () => {
    history.push(`/classes`);
    query = "";
    setSelection({
      style: "",
      day: "",
    });
    fetchClasses();
  };

  return (
    <div>
      <h4>Currently Available Classes</h4>

      <form onSubmit={filter}>
        <label htmlFor="style">Style: </label>
        <select
          id="style"
          name="style"
          value={selection.style}
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled>
            Select one
          </option>
          {styles.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label htmlFor="day"> Weekday: </label>
        <select
          id="day"
          name="day"
          value={selection.day}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <span>
          <button>Filter</button>
        </span>
      </form>

      {/* {pathname !== "/classes" && ( */}
      {query !== "" && (
        <p>
          <a href="#" className="filter" onClick={clearFilter}>
            Clear Filters
          </a>
        </p>
      )}

      {classes &&
        classes.map((c) => {
          return (
            <div className="classDisplay" key={c.id}>
              <div className="left">
                <img src={`${c.image}`} />
              </div>
              <div className="middle">
                <h3>{c.name}</h3>
                <p>
                  When: {c.day} at {c.time}
                </p>
                <p>Where: {c.address}</p>
                <p>Cost: £{c.price}</p>
              </div>
              <div className="right">
                <p>Taught by: {c.instructor}</p>
                <img src={`${c.photo}`} />
                <p className="contact">
                  <a href="#">Contact Instructor</a>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
