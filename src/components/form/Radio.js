import React from "react";
import useLanguages from "../../hooks/useLanguages";

const Radio = ({ name, options, form, setForm, ...props }) => {
  const { __ } = useLanguages();

  function onChange({ target }) {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  }

  return (
    <>
      {Object.entries(options).map(([value, label], index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={name}
            id={"field-" + name + index}
            value={value}
            checked={form[name] === value}
            onChange={onChange}
            {...props}
          />
          <label htmlFor={"field-" + name + index}>{__(label)}</label>
        </React.Fragment>
      ))}
    </>
  );
};

export default Radio;
