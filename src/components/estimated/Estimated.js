import React from "react";
import { AppContext } from "../../AppContext";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "./Estimated.css";

const Estimated = ({ column, row }) => {
  const { reports, __ } = React.useContext(AppContext);

	let estimated = [
		{ type: "day", count: 0, rx: 0, tx: 0, title: __("Day") },
		{ type: "month", count: 0, rx: 0, tx: 0, title: __("Month") },
		{ type: "year", count: 0, rx: 0, tx: 0, title: __("Year") },
	];

	const traffic = reports.getTraffic();

	estimated.forEach((el, i) => {
		traffic[el.type].forEach((item, n) => {
			estimated[i].rx += item.rx;
			estimated[i].tx += item.tx;
			estimated[i].count++;
		});
	});

	return (
		<Widget column={column} row={row} className="estimated">
			<h2>{__("Estimated")}</h2>
			{estimated.map((item) => (
				<Chart key={Math.random()} {...item} />
			))}
		</Widget>
	);
};

export default Estimated;
