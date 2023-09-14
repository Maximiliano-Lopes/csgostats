import PropTypes from "prop-types";
import React from "react";
import { Chart } from "react-google-charts";

export default function KdaStats({ data }) {
  const [stats, setStats] = React.useState(null);
  const [kdNumber, setKdNumber] = React.useState(null);

  React.useEffect(() => {
    let dataPro = [];
    let dataChart = [
      ["Kills", " Deaths"],
      [data[0].name.replace("total_", "").toUpperCase(), data[0].value],
      [data[1].name.replace("total_", "").toUpperCase(), data[1].value],
    ];
    setKdNumber((data[0].value/data[1].value).toFixed(2))
    const options = {
      backgroundColor: "transparent",
      colors: "black",
      legend: "none",
      slices: {
        0: { color: "#DC143C" },
        1: { color: "#4B0082" },
      },
    };
    let frag = (
      <Chart
        chartType="PieChart"
        data={dataChart}
        options={options}
        width={"400px"}
        height={"400px"}
      />
    );
    dataPro.push(frag);

    setStats(dataPro);
  }, [data]);

  return (
    <div id="KdDashboard">
      <h2>K/D <br/> {kdNumber}</h2>
      {!data ? "Loading..." : stats}
    </div>
  );
}

KdaStats.propTypes = {
  data: PropTypes.array,
};
