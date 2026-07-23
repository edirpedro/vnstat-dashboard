import React from "react";
import useLanguages from "hooks/useLanguages";
import styles from "./Switch.module.scss";

const Switch = function <T>({
  name,
  label,
  form,
  setForm,
  ...props
}: Props<T>) {
  const { __ } = useLanguages();

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [target.name]: target.checked }));
  }

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={"field-" + name}
        checked={form[name as keyof T] as boolean}
        onChange={onChange}
        className={styles.switch}
        {...props}
      />
      <label htmlFor={"field-" + name}>{__(label)}</label>
    </>
  );
};

export default Switch;

type Props<T> = {
  name: string;
  label: string;
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  [k: string]: any;
};
