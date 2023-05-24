import React from "react";
import useLanguages from "hooks/useLanguages";
import styles from "./Select.module.scss";

const Select = function<T>({ name, options, form, setForm, ...props }: Props<T>) {
  const { __ } = useLanguages();

  return (
    <span>
      <select
        id={"field-" + name}
        name={name}
        value={form[name as keyof T] as string}
        onChange={({ target }) =>
          setForm((prev) => ({ ...prev, [target.name]: target.value }))
        }
        className={styles.select}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {__(option.label)}
          </option>
        ))}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
        <path
          d="M0 2 L4 6 L8 2"
          fill="none"
          stroke="var(--rx)"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
};

export default Select;

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
