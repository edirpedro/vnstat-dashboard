import React from "react";
import "./Form.scss";

const Form = ({ children, name, ...props }) => {
  return (
    <form className={"form-" + name} {...props}>
      {children}
    </form>
  );
};

export default Form;
