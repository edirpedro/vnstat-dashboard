import React from "react";
import Field from "../form/Field";
import Radio from "../form/Radio";
import Switch from "../form/Switch";

const FieldChart = ({ label, type, form, setForm }) => {
  const field = { form, setForm };

  return (
    <Field name={`chart_${type}`} label={label}>
      <Radio
        name={`chart_${type}_type`}
        options={{ bar: "Bar", area: "Area" }}
        {...field}
      />
      <Switch name={`chart_${type}_log`} label="Logarithmic" {...field} />
    </Field>
  );
};

export default FieldChart;
