import React, { useState, useEffect } from "react";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);

  const fetchInstructorsInfo = async () => {
    const response = await fetch("/instructors");
    const data = await response.json();
    setInstructors(data);
  };

  useEffect(() => {
    fetchInstructorsInfo();
  }, []);

  return (
    <div>
      <h4 className="mt-2">Current Teachers</h4>

      {instructors &&
        instructors.map((i) => {
          return (
            <div className="instructorDisplay" key={i.id}>
              <div className="right">
                <img src={`${i.photo}`} alt={`${i.name}`} />
              </div>
              <div className="middle">
                <h3>{i.name}</h3>
                <p>{i.introduction} </p>
              </div>
              <div className="right">
                <p className="contact">
                  <a href={`mailto:${i.email}`}>Contact</a>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
