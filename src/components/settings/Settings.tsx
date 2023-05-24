import React from "react";
import vnStat from "services/vnstat";
import useSettings, { ISettings } from "hooks/useSettings";
import useLanguages from "hooks/useLanguages";
import useReports from "hooks/useReports";
import { IModal } from "hooks/useModal";
import Select from "components/form/Select";
import Field from "components/form/Field";
import FieldChart from "./FieldChart";
import modalStyles from "hooks/useModal.module.scss";
import styles from "./Settings.module.scss";
import Button from "components/form/Button";

const Settings = ({ close }: Props) => {
  const { __ } = useLanguages();
  const { settings, setSettings } = useSettings();
  const { changeReports } = useReports();
  const [form, setForm] = React.useState<ISettings.Options>(settings);

  let units: any[] = [];
  Object.entries(vnStat.getUnitOptions()).forEach(([key, value]) => {
    units.push({
      value: key,
      label: value.name + " (" + value.bytes[1] + ", " + value.bits[1] + ")"
    });
  });

  let initials = [
    { value: "fiveminute", label: __("Minutes") },
    { value: "hour", label: __("Hours") },
    { value: "day", label: __("Days") },
    { value: "month", label: __("Months") },
    { value: "year", label: __("Years") },
  ];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSettings(form);
    changeReports(settings.interface);
    close();
  }

  const field = { form, setForm };

  return (
    <form name="settings" onSubmit={onSubmit} className={styles.settings}>
      <h1>{__("Settings")}</h1>
      <Field name="units" label="Units">
        <Select<typeof form> name="units" options={units} {...field} />
      </Field>
      <Field name="reports_initial" label="Initial report">
        <Select<typeof form>
          name="reports_initial"
          options={[{ value: "top", label: __("Top") }, ...initials]}
          {...field}
        />
      </Field>
      <Field name="chart_initial" label="Initial chart">
        <Select<typeof form> name="chart_initial" options={initials} {...field} />
      </Field>
      <FieldChart label="Minutes" type="fiveminute" {...field} />
      <FieldChart label="Hours" type="hour" {...field} />
      <FieldChart label="Days" type="day" {...field} />
      <FieldChart label="Months" type="month" {...field} />
      <FieldChart label="Years" type="year" {...field} />
      <div className={modalStyles.actions}>
        <Button type="button" onClick={() => close()}>
          {__("Cancel")}
        </Button>
        <Button type="submit">{__("Save")}</Button>
      </div>
    </form>
  );
};

export default Settings;

type Props = {
  close: IModal.Props['close']
}
