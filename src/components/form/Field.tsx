import React from "react";
import useLanguages from "hooks/useLanguages";
import styles from "./Field.module.scss";

const Field = ({ children, name, label }: Props) => {
  const { __ } = useLanguages();

  return (
    <p className={styles.field}>
      <label htmlFor={"field-" + name}>{__(label)}:</label>
      {children}
    </p>
  );
};

export default Field;

type Props = {
  children: React.ReactNode;
  name: string;
  label: string;
};
