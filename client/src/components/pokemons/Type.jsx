import React from "react";
import { Link } from "react-router-dom";
import { getTypeColor } from "../helpers/helper";

export default props => {
  const color = getTypeColor(props.type);
  return (
    <div>
      <li className="background-color-grass" style={{ backgroundColor: color }}>
        <Link to={`/dashboard?type=${props.type}`}>{props.type}</Link>
      </li>
    </div>
  );
};
