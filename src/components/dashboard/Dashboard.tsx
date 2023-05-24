import React from "react";
import styles from "./Dashboard.module.scss";

const Dashboard = ({ children }: Props) => {
  return (
    <>
      <div className={styles.wallpaper + " wallpaper"}></div>
      <div className={styles.dashboard}>{children}</div>
    </>
  );
};

export default Dashboard;

interface Props {
  children: React.ReactNode
}
