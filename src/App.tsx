import React from "react";
import CovidLineChart from "./Chart";

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <h1>秋田県における新型コロナウイルス感染者の週平均推移</h1>
        <hr />
        <p>
          新型コロナウイルスの感染率について考える場合、ある日の症例数ではなく、全体の傾向について考えるのがよいでしょう。そのために、以下に1週間の平均患者数をピンク色で示したグラフを掲載する。また、1日の患者数はグレーで表示されています。
        </p>
        <hr />
      </div>
      <CovidLineChart />
    </div>
  );
}

export default App;
