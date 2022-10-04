import React from "react";
import useLanguages from "../../hooks/useLanguages";

const Field = ({ children, name, label }) => {
  const { __ } = useLanguages();

  return (
    <p>
      <label htmlFor={"field-" + name}>{__(label)}:</label>
      {children}
    </p>
  );
};

export default Field;
