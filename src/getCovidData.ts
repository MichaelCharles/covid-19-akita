import axios from "axios";

export const GetCovidData = async () => {
  const result = await axios.get(
    "https://michaelcharl.es/public/covid-akita/info.json"
  );
  const { data } = result;
  return data;
};
