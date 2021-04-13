import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";

export default function YogaDisplay() {
  const { id } = useParams();
  const [yogaStyles, setYogaStyles] = useState();

  const fetchYogaInfo = async () => {
    const response = await fetch(`/yogastyles/${id}`);
    const data = await response.json();
    setYogaStyles(data[0]);
  };

  useEffect(() => {
    fetchYogaInfo();
  }, [id]);

  return (
    <div className="yogaDisplay">
      {yogaStyles && (
        <div className="yogaInfo" key={yogaStyles.id}>
          <h3>{yogaStyles.name}</h3>
          <p>{yogaStyles.description}</p>
          <div>
            Like what you see?
            <Link
              to={{
                pathname: `/classes/`,
                search: `?style=${yogaStyles.id}`,
              }}
            >
              {" "}
              Find {yogaStyles.name} Classes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
