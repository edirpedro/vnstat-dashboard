import React from "react";
import Widget from "../widget/Widget";
import Estimated from "./Estimated";
import Average from "./Average";
import useLanguages from "hooks/useLanguages";
import styles from "./Aside.module.scss";

const Aside = () => {
  const { __ } = useLanguages();
  const [state, setState] = React.useState(true);

  return (
    <Widget className={styles.aside}>
      <h2 onClick={() => setState((prev) => !prev)}>
        {state ? __("Estimated") : __("Average")}
      </h2>
      {state ? <Estimated /> : <Average />}
    </Widget>
  );
};

export default Aside;
