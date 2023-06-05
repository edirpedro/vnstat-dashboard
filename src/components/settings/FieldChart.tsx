import React from "react";
import Field from "../form/Field";
import Radio from "../form/Radio";
import Switch from "../form/Switch";
import { IvnStat } from "services/vnstat.type";
import { ISettings } from "hooks/useSettings";

const FieldChart = ({ label, type, form, setForm }: Props) => {
  const field = { form, setForm };

  const options = [
    { value: "bar", label: "Bar" },
    { value: "area", label: "Area" },
  ];

  return (
    <Field name={`chart_${type}`} label={label}>
      <Radio<typeof form>
        name={`chart_${type}_type`}
        options={options}
        {...field}
      />
      <Switch name={`chart_${type}_log`} label="Logarithmic" {...field} />
    </Field>
  );
};

export default FieldChart;

type Props = {
  label: string;
  type: IvnStat.TrafficKeys;
  form: ISettings.Options;
  setForm: React.Dispatch<React.SetStateAction<ISettings.Options>>;
};
