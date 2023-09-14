import PropTypes from "prop-types";
import React from "react";
import Chart from "react-google-charts";

export default function KillsDashBoard({ data }) {
  const [stats, setStats] = React.useState(null);
  const [chart, setChart] = React.useState(null);
  
  React.useEffect(() => {
    let dataPro = [];
    data.sort((a, b) => b.value - a.value);
    var dataChart = [
      [
        "Element",
        "Density",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify",
        }
      ]
    ];
    const options = {
      title: "",
      width: "max-content",
      height: "100%",
      bar: { groupWidth: "90%" },
      color: "white",
      legend: "none",
      backgroundColor: "#696969"
    };
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      var name = element.name.replace(/total_kills_/g, "").toUpperCase();
      dataChart.push([name, element.value, "#DC143C",null])
      let frag = (
        <tr className="gunItens">
          <td>
            <img className="gunImg" src={`../src/assets/${name}.png`}></img>
          </td>
          <td>
            <p className="gunName">{name}</p>
          </td>
          <td>
            <p className="gunKill">{element.value}</p>
          </td>
        </tr>
      );
      dataPro.push(frag);
    }
    console.log(dataChart)
    let fragChart = (
      <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={dataChart}
      options={options}
      />
    );
    setStats(dataPro);
    setChart(fragChart)
  }, [data]);

  return (
    <div>
      <h2>Kills Dashboard</h2>
      <div id="KillDashboard">
        <table id="scoreboard">
          <tbody>{stats}</tbody>
        </table>
        {chart}
      </div>
    </div>
  );
}

KillsDashBoard.propTypes = {
  data: PropTypes.array,
};
