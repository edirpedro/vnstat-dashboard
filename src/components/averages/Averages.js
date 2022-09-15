import React from "react";
import { AppContext } from "../../AppContext";
import Widget from "../widget/Widget";
import Chart from "./Chart";
import "./Averages.css";

const Averages = ({ column, row }) => {
  const { reports, __ } = React.useContext(AppContext);

	let averages = [
		{ type: "day", count: 0, rx: 0, tx: 0, title: __("Day") },
		{ type: "month", count: 0, rx: 0, tx: 0, title: __("Month") },
		{ type: "year", count: 0, rx: 0, tx: 0, title: __("Year") },
	];

	const traffic = reports.getTraffic();

	averages.forEach((el, i) => {
		traffic[el.type].forEach((item, n) => {
			averages[i].rx += item.rx;
			averages[i].tx += item.tx;
			averages[i].count++;
		});
	});

	return (
		<Widget column={column} row={row} className="averages">
			<h2>{__("Averages")}</h2>
			{averages.map((item) => (
				<Chart key={Math.random()} {...item} />
			))}
		</Widget>
	);
};

export default Averages;
