import React from "react";
import useLanguages from "../../hooks/useLanguages";

const Select = ({ name, options, form, setForm, ...props }) => {
  const { __ } = useLanguages();

  return (
    <span>
      <select
        id={"field-" + name}
        name={name}
        value={form[name]}
        onChange={({ target }) =>
          setForm((prev) => ({ ...prev, [target.name]: target.value }))
        }
        {...props}
      >
        {Object.entries(options).map(([value, label], index) => (
          <option key={index} value={value}>
            {__(label)}
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
