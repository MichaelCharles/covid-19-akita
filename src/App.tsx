import React from "react";
import CovidLineChart from "./Chart";

function App() {
  return (
    <div className="App">
      <h1>
      秋田県における新型コロナウイルス感染者の週平均推移
      </h1>
      <CovidLineChart />
    </div>
  );
}

export default App;
