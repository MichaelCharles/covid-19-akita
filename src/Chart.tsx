import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { GetCovidData as getCovidData } from "./getCovidData";
import useWindowSize from "./hooks/useWindowSize";

const CovidLineChart = () => {
  const [data, setData] = useState([]);
  const size = useWindowSize();

  const handleGetData = async () => {
    const fetchedData = await getCovidData();

    const parsedData: any = fetchedData
      .map((a: any) => {
        const [year, month, day] = a.date.split("/");
        a = {
          ...a,
          ...{
            weeklyAverage: 0,
            dateFormatted: `${year}年${month}月${day}日`,
            週平均: 0,
            新規感染者数: 0,
          },
        };
        return a;
      })
      .filter((a: any) => {
        return new Date(a.date).getTime() > new Date("2022-01-01").getTime();
      });

    const finalData = parsedData.map((a: any, i: any) => {
      const thisWeek = [];
      for (let j = 0; j < 7; j++) {
        const adjustedIndex = i - j;
        if (parsedData[adjustedIndex]) {
          thisWeek.push(parsedData[adjustedIndex].new);
        } else {
          thisWeek.push(0);
        }
      }
      a.weeklyAverage = thisWeek.reduce((a, b) => a + b) / 7;
      a.新規感染者数 = a.new;
      a.週平均 = Math.round(a.weeklyAverage);
      return a;
    });

    setData(finalData);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const h =
    typeof size.height === "undefined" ? size.height : window.outerHeight;
  const w = typeof size.width === "undefined" ? size.width : window.innerWidth;

  return (
    <LineChart
      width={parseInt(`${w}`) - 24}
      height={parseInt(`${h}`) * 0.7}
      data={data}
      margin={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Line type="monotone" dataKey="新規感染者数" stroke="#ccc" />
      <Line type="monotone" dataKey="週平均" stroke={"var(--accent)"} />
      <CartesianGrid stroke="#f2f2f2" strokeDasharray="5 5" />
      <XAxis dataKey="dateFormatted" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default CovidLineChart;
