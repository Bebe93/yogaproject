import React, { useState, useEffect } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import YogaDisplay from "./YogaDisplay";

export default function Yogastyles() {
  const [yogaStyles, setYogaStyles] = useState([]);

  const fetchYogaInfo = async () => {
    const response = await fetch("/yogastyles");
    const data = await response.json();
    setYogaStyles(data);
  };

  useEffect(() => {
    fetchYogaInfo();
  }, []);

  return (
    <div className="stylesDisplay">
      <div>
        <p>Click on a style to learn more.</p>
        <ul>
          {yogaStyles.map((d) => {
            return (
              <li key={d.id}>
                <Link to={`/yogastyles/${d.id}`}>{d.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Switch>
        <Route path="/yogastyles/:id">
          <YogaDisplay />
        </Route>
        <Route path="/">
          <img src="./Sports-Yoga.png" className="img-fluid" alt=""></img>
        </Route>
      </Switch>
    </div>
  );
}
