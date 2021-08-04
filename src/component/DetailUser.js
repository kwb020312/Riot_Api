import { useEffect, useState } from "react";

export default function DetailUser({ location: { search } }) {
  const summonerName = search.replace("?userName=", "");
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    async function getData() {
      const CallData = await fetch(
        `/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "",
          },
        }
      );
      const ParseToJson = await CallData.json();
      const Datas = await ParseToJson.data;
      console.log(Datas);
    }
    getData();
  }, [summonerName]);

  return <>{summonerName}</>;
}
