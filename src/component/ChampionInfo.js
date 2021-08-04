import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/championInfo.css";

function ChampionInfo() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const keywords = params.get("id");

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

    setData(datas[keywords]);
    setLoading(true);
  };

  useEffect(() => {
    GetData();
  }, []);

  const Tag = () => {
    let tag = [];
    data.tags.map((item) => tag.push(item + ""));
    return String(tag).replace(" ", ",");
  };
  const Blurb = (blurb) => {
    blurb = blurb.replaceAll(".", ".\n");
    blurb = blurb.split("\n").map((line) => {
      return (
        <span>
          {line}
          <br />
        </span>
      );
    });
    return blurb;
  };

  return (
    <>
      {loading ? (
        <div className="ChampionInfo">
          <div>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${data.image.full}`}
            ></img>
            <h1>
              {data.name}({data.id})
            </h1>
            <h3>{Tag()}</h3>
            <h3>{data.title}</h3>
            <p>{Blurb(data.blurb)}</p>
          </div>
          <div>
            <h2>
              <p>AD : {data.info.attack}</p>
              <p>AP : {data.info.magic}</p>
              <p>DEF : {data.info.defense}</p>
              <p>난이도 : {data.info.difficulty}</p>
            </h2>
            <p>보조 : {data.partype}</p>
          </div>
          <div className="stats">
            <p>HP | {data.stats.hp}</p>
            <p>레벨업당 HP | {data.stats.hpperlevel}</p>
            <p>MP | {data.stats.mp}</p>
            <p>레벨업당 MP | {data.stats.mpperlevel}</p>
            <p>이동속도 | {data.stats.movespeed}</p>
            <p>방어력 | {data.stats.armor}</p>
            <p>레벨업당 방어력 | {data.stats.armorperlevel}</p>
            <p>마법 저항력 | {data.stats.spellblock}</p>
            <p>레벨업당 마법 저항력 | {data.stats.spellblockperlevel}</p>
            <p>공격 사거리 | {data.stats.attackrange}</p>
            <p>HP 재생 | {data.stats.hpregen}</p>
            <p>레벨업당 HP 재생 | {data.stats.hpregenperlevel}</p>
            <p>MP 재생 | {data.stats.mpregen}</p>
            <p>레벨업당 MP 재생 | {data.stats.mpregenperlevel}</p>
            {/* <p>크리티컬 | {data.stats.crit}</p>
            <p>레벨업당 크리티컬 | {data.stats.critperlevel}</p> */}
            <p>공격력 | {data.stats.attackdamage}</p>
            <p>레벨업당 공격력 | {data.stats.attackdamageperlevel}</p>
            <p>공격속도 | {data.stats.attackspeed}</p>
            <p>레벨업당 공격속도 | {data.stats.attackspeedperlevel}%</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChampionInfo;
