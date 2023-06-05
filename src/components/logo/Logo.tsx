import useReports from "hooks/useReports";
import Widget, { IWidget } from "../widget/Widget";
import styles from "./Logo.module.scss";

const Logo = ({ column, row }: IWidget.ColRow) => {
  const { reports } = useReports();
  const version = reports.getVersion();

  return (
    <Widget column={column} row={row} className={styles.logo}>
      <h1>
        vnStat <small>{version}</small>
      </h1>
    </Widget>
  );
};

export default Logo;
