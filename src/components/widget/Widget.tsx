import React from "react";
import styles from "./Widget.module.scss";

const Widget = ({ className, children }: IWidget.Props) => {
  return <div className={styles.widget + " " + className}>{children}</div>;
};

export default Widget;

export namespace IWidget {
  export interface Props {
    className: string;
    children: React.ReactNode;
  }
}
