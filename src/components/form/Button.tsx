import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, type, ...props }: Props) => {
  return (
    <button type={type} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;

type Props = {
  children: string | React.ReactNode
  type: "submit" | "button" | "reset"
  [k: string]: any
}
