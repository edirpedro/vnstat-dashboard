import React from "react";
import { AppContext } from "../../AppContext";
import Widget from "../widget/Widget";
import Estimated from "./Estimated";
import Average from "./Average";
import "./Aside.css";

const Aside = ({ column, row }) => {
  const { __ } = React.useContext(AppContext);
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
