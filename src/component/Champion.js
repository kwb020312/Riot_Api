import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/championInfo.css";

function ChampionInfo() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const GetData = async () => {
    let datas = await axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion.json"
      )
      .then((res) => res.data.data);
    let testArr = [];
    for (let i in datas) {
      testArr.push(datas[i]);
    }

    datas = testArr.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );

    setData(datas);
    setLoading(true);
  };

  const Champion = () => {
    let testArr = [];
    for (let i in data) {
      testArr.push(
        <Link to={`/info?id=${data[i].id}`}>
          <div key={i}>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data[i].image.full}`}
            ></img>
          </div>
        </Link>
      );
    }

    return testArr;
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      {loading ? <div className="ChampionContainer">{Champion()}</div> : <></>}
    </>
  );
}

export default ChampionInfo;
