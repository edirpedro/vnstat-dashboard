import React from "react";
import vnStat from "../../services/vnstat";
import useSettings from "../../hooks/useSettings";
import useLanguages from "../../hooks/useLanguages";
import useReports from "../../hooks/useReports";
import Form from "../form/Form";
import Field from "../form/Field";
import Select from "../form/Select";
import FieldChart from "./FieldChart";
import "./Settings.scss";

const Settings = ({ close }) => {
  const { __ } = useLanguages();
  const { settings, setSettings } = useSettings();
  const { changeReports } = useReports();
  const [form, setForm] = React.useState(settings);

  let units = vnStat.getUnitsOptions();
  Object.entries(units).forEach(([key, value]) => {
    units[key] =
      value.name + " (" + value.bytes[1] + ", " + value.bits[1] + ")";
  });

  let initials = {
    fiveminute: __("Minutes"),
    hour: __("Hours"),
    day: __("Days"),
    month: __("Months"),
    year: __("Years"),
  };

  function onSubmit(e) {
    e.preventDefault();
    setSettings(form);
    changeReports(settings.interface); // FIXME: renderiza duas vezes por conta do fetch
    close();
  }

  const field = { form, setForm };

  return (
    <Form name="settings" onSubmit={onSubmit}>
      <h1>{__("Settings")}</h1>
      <Field name="units" label="Units">
        <Select name="units" options={units} {...field} />
      </Field>
      <Field name="reports_initial" label="Initial report">
        <Select
          name="reports_initial"
          options={{ top: __("Top"), ...initials }}
          {...field}
        />
      </Field>
      <Field name="chart_initial" label="Initial chart">
        <Select name="chart_initial" options={initials} {...field} />
      </Field>
      <FieldChart label="Minutes" type="fiveminute" {...field} />
      <FieldChart label="Hours" type="hour" {...field} />
      <FieldChart label="Days" type="day" {...field} />
      <FieldChart label="Months" type="month" {...field} />
      <FieldChart label="Years" type="year" {...field} />
      <div className="modal__actions">
        <button type="button" onClick={() => close()}>
          {__("Cancel")}
        </button>
        <button type="submit">{__("Save")}</button>
      </div>
    </Form>
  );
};

export default Settings;
