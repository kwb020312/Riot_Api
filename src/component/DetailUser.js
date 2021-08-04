import { useEffect, useState } from "react";

export default function DetailUser({ location: { search } }) {
  const summonerName = search.replace("?userName=", "");
  const [datas, setDatas] = useState([]);
  /* 
  
    {
        "id": "DZL6MXVX3rgWnDY8OdxlhtzKri0Et2__2-2hkIMlrn86NzuD2PYowPQEmg",
        "accountId": "5E-0NnMJrYJvvIlx7yRzjrqRzkngAPAkZiJ9AscPklHafc8oZr7MRWxF",
        "puuid": "XthZME8RfTHGfxHaF8MYkF2nPcPPvj6FB2VsA797GghBzdGE16XIqpdcC3ciGziWFWX-2Wxr-nP6pA",
        "name": "KimChobby",
        "profileIconId": 4832,
        "revisionDate": 1628072553886,
        "summonerLevel": 86
    }
  */
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
