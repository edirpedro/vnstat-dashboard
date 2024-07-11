import React from "react";
import useLanguages from "hooks/useLanguages";
import styles from "./Field.module.scss";

const Field = ({ children, name, label }: Props) => {
  const { __ } = useLanguages();

  return (
    <div className={styles.field}>
      <label htmlFor={"field-" + name}>{__(label)}:</label>
      {children}
    </div>
  );
};

export default Field;

type Props = {
  children: React.ReactNode;
  name: string;
  label: string;
};
