import React from "react";
import "./Widget.scss";

const Widget = ({ column, row, className, children }) => {
  return (
    <div
      className={"widget " + className}
      style={{
        gridColumn: column,
        gridRow: row,
      }}
    >
      {children}
    </div>
  );
};

export default Widget;
