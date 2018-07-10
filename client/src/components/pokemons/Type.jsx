import React from "react";
import { Link } from "react-router-dom";
import { getTypeColor } from "../helpers/helper";
import { Tag } from "antd";

export default props => {
  const color = getTypeColor(props.type);
  return (
    <div>
      <Tag className="background-color-grass" color={color}>
        <Link to={`/dashboard?type=${props.type}`}>{props.type}</Link>
      </Tag>
    </div>
  );
};
