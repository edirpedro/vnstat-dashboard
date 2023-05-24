import React from "react";
import styles from "./Widget.module.scss";

const Widget = ({ column, row, className, children }: IWidget.Props) => {
  return (
    <div
      className={styles.widget + " " + className}
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

export namespace IWidget {

  export interface Props {
    column: string
    row: string
    className: string
    children: React.ReactNode
  }

  export type ColRow = Pick<IWidget.Props, "column" | "row">

}
