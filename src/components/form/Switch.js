import React from "react";
import useLanguages from "../../hooks/useLanguages";

const Switch = ({ name, label, form, setForm, ...props }) => {
  const { __ } = useLanguages();

  function onChange({ target }) {
    setForm((prev) => ({ ...prev, [target.name]: target.checked }));
  }

  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={"field-" + name}
        checked={form[name]}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={"field-" + name}>{__(label)}</label>
    </>
  );
};

export default Switch;
