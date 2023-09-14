import React from "react";
import "./App.css";
import KillsDashBoard from "./components/kills/killsDashboard";
import KdaStats from "./components/kda/KdaStats";

export default function App() {
  const [data, setData] = React.useState(null);
  const [killGunsData, setKillGuns] = React.useState(null);
  const [kdData, setKd] = React.useState(null);
  
  React.useMemo(() =>{
    var killGuns = [];
    var kd = []
    fetch("http://localhost:3001/stats")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      var text = [];
      data.forEach(element => {
       if(element.name == "total_kills"){
        kd.push(element)
       }else if(element.name == "total_deaths"){
        kd.push(element)
       }
      });
      for (let index = 8; index < 24; index++) {
        const element = data[index];
        if (element.name.includes("total_kills_")) {
          
          killGuns.push(element);
        }
      }
      setData(text);
      setKillGuns(killGuns);
      setKd(kd)
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Go Stats</h1>
      </header>
      <div id="containerApp">
       {!data ? "Loading..." : <KdaStats data={kdData} />}
        {!data ? "Loading..." : <KillsDashBoard data={killGunsData} />}
      </div>
    </div>
  );
}
