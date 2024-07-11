import useReports from "hooks/useReports";
import Widget from "../widget/Widget";
import styles from "./Logo.module.scss";

const Logo = () => {
  const { json } = useReports();
  const version = json.getVersion();

  return (
    <Widget className={styles.logo}>
      <h1>
        vnStat <small>{version}</small>
      </h1>
    </Widget>
  );
};

export default Logo;
