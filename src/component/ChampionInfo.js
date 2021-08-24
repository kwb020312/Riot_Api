import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "../css/championInfo.css";

function ChampionInfo() {
  const [data, setData] = useState();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);

  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const keywords = params.get("id");

  useEffect(() => {
    const GetData = async () => {
      let datas = await axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion/${keywords}.json`
        )
        .then((res) => res.data.data);

      setData(datas[keywords]);
      setLoading(true);
    };
    GetData();
  }, [keywords]);

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
        <>
        <div className="Main_Header">
      <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  document.location.href = `/summoner/${userName}`;
                }
              }}
              placeholder="사용자명"
              className="Main_searchUser_Input"
            />
          <Link to="/champion">
            <button>챔피언 목록</button>
          </Link>
          <button>커뮤니티</button>
        </div>
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
            <h3>
              <p>AD : {data.info.attack}</p>
              <p>AP : {data.info.magic}</p>
              <p>DEF : {data.info.defense}</p>
              <p>난이도 : {data.info.difficulty}</p>
            </h3>
          </div>
          <div className="ChampionInfo_Stats">
            <h1>스텟</h1>
            <p>partype : {data.partype}</p>
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
            <p>크리티컬 | {data.stats.crit}</p>
            <p>레벨업당 크리티컬 | {data.stats.critperlevel}</p>
            <p>공격력 | {data.stats.attackdamage}</p>
            <p>레벨업당 공격력 | {data.stats.attackdamageperlevel}</p>
            <p>공격속도 | {data.stats.attackspeed}</p>
            <p>레벨업당 공격속도 | {data.stats.attackspeedperlevel}%</p>
          </div>
          <div className="ChampionInfo_Spells">
            <h1>스킬</h1>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/${data.passive.image.full}`}
              title={`P ${data.passive.name}\n${data.passive.description}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${data.spells[0].image.full}`}
              title={`Q ${data.spells[0].name}\n${data.spells[0].description}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${data.spells[1].image.full}`}
              title={`W ${data.spells[1].name}\n${data.spells[1].description}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${data.spells[2].image.full}`}
              title={`E ${data.spells[2].name}\n${data.spells[2].description}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${data.spells[3].image.full}`}
              title={`R ${data.spells[3].name}\n${data.spells[3].description}`}
            />
          </div>
        </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default ChampionInfo;
