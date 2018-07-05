import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export default props => {
  return (
    <div>
      <HorizontalBar data={props.data} />
    </div>
  );
};
