import React from "react";
import useLanguages from "hooks/useLanguages";
import styles from "./Radio.module.scss"

const Radio = function<T>({ name, options, form, setForm, ...props }: Props<T>) {
  const { __ } = useLanguages();

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  }

  return (
    <>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={name}
            id={"field-" + name + index}
            value={option.value}
            checked={form[name as keyof T] === option.value}
            onChange={onChange}
            className={styles.radio}
            {...props}
          />
          <label htmlFor={"field-" + name + index}>{__(option.label)}</label>
        </React.Fragment>
      ))}
    </>
  );
};

export default Radio;

type Props<T> = {
  name: string
  options: {
    value: string
    label: string
  }[]
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  [k: string]: any
}
