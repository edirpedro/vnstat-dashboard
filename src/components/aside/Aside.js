import React from "react";
import Widget from "../widget/Widget";
import Estimated from "./Estimated";
import Average from "./Average";
import useLanguages from "../../hooks/useLanguages";
import "./Aside.scss";

const Aside = ({ column, row }) => {
  const { __ } = useLanguages();
  const [state, setState] = React.useState(true);

  return (
    <Widget column={column} row={row} className="aside">
      <h2 onClick={() => setState((prev) => !prev)}>
        {state ? __("Estimated") : __("Average")}
      </h2>
      {state ? <Estimated /> : <Average />}
    </Widget>
  );
};

export default Aside;
