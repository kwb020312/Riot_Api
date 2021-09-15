import React, { useEffect, useState } from "react";
import ChampJson from "../json/champion.json";
import SummonerSpell from "../json/summoner.json";
import { GetPriRunesData, GetSubRunesData } from "../api/runeApi";
import { GetSpellCode, GetSpellImg } from "../api/spellApi";
import NoneItem from "../img/A6000000.png";

function UserMatchData(props) {
  const [playDate, setPlayDate] = useState();
  const [playTime, setPlayTime] = useState();
  const [gameWin, setGameWin] = useState();
  const [KDA, setKDA] = useState([]);
  const [playerData, setPlayerData] = useState();
  const [totalSummorner, setTotalSummornor] = useState([]);
  const [playChamp, setPlayChamp] = useState();
  const [loading, setLoading] = useState(false);
  let playWinTeam;

  const userData = props.userData;
  const matchData = props.matchData;

  console.log(matchData);

  // 경기 데이터 수집
  const GetData = () => {
    props.matchData.info.teams[0].win
      ? (playWinTeam = props.matchData.info.teams[0].teamId)
      : (playWinTeam = props.matchData.info.teams[1].teamId);

    let summonerData = [];
    {
      matchData.info.participants.map((x, cnt) => {
        summonerData.push(x);

        if (x.summonerName === userData.name) {
          {
            setPlayerData(x);
            console.log(x);
            let KDAdata = [];
            x.teamId === playWinTeam ? setGameWin(true) : setGameWin(false);
            KDAdata.push(x.kills, x.deaths, x.assists);
            setKDA(KDAdata);
            setPlayChamp(x.championName);
          }
        }
      });
    }
    setTotalSummornor(summonerData);
    setLoading(true);
  };

  // 챔피언 한글이름
  const GetChampKOname = (champName) => {
    if (champName === "FiddleSticks") {
      return ChampJson["data"]["Fiddlesticks"]["name"];
    } else {
      return ChampJson["data"][champName]["name"];
    }
  };

  // 소환사 이름및 정보 수집
  const GetSummonerDatas = (teamId) => {
    let arrayData = [];
    totalSummorner.map((content, count) => {
      let summonerName = content.summonerName;
      if (summonerName.length > 5) {
        summonerName = summonerName.slice(0, 5) + "...";
      }

      let champName = content.championName;
      if (champName === "FiddleSticks") {
        champName = ChampJson["data"]["Fiddlesticks"]["id"];
      } else {
        champName = ChampJson["data"][champName]["id"];
      }

      if (content.teamId === teamId) {
        arrayData.push(
          <div
            className="UserMatchData_matchMember"
            onClick={() => {
              document.location.href = `/summoner/${content.summonerName}`;
            }}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${champName}.png`}
              className="UserMatchData_matchMemberImg"
              alt={content.championName}
            />
            <span ></span>
            <p>{summonerName}</p>
          </div>
        );
      }
    });
    return arrayData;
  };

  // 사용자가 사용한 룬
  const GetRunes = () => {
    let primaryRunes = playerData.perks.styles[0].selections[0].perk;
    let subRunes = playerData.perks.styles[1].selections[1].perk;

    let priRuneData = GetPriRunesData(primaryRunes);
    let subRuneData = GetSubRunesData(subRunes);

    // 룬 툴팁 잡다한 내용 삭제
    priRuneData.longDesc = priRuneData.longDesc.replace(/<[^>]*>?/gm, '');

    let runeImgData = [];

    runeImgData.push(
      <>
        <div className="UserMatchData_matchUseRuneCon">
          <img
            className="UserMatchData_matchUsePriRune"
            src={priRuneData.icon}
            alt="룬 사진"
          />
            <span className="UserMatchData_matchUsePriRuneToolTip">
            <span>{priRuneData.name}</span>
            <span>{priRuneData.longDesc}</span>
            </span>
        </div>
        <div className="UserMatchData_matchUseRuneCon">
          <img
            className="UserMatchData_matchUseSubRune"
            src={subRuneData.icon}
            alt="룬 사진"
          />
          <span className="UserMatchData_matchUseSubRuneToolTip">
            <span>{subRuneData.name}</span>
            </span>
        </div>
      </>
    );

    return runeImgData;
  };

  const ChampImg = () => {
    if (playChamp === "FiddleSticks") {
      return `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/Fiddlesticks.png`;
    } else {
      return `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${playChamp}.png`;
    }
  };

  // 사용자가 사용한 스펠
  const GetSpells = () => {
    let spellD = GetSpellCode(playerData.summoner1Id);
    let spellF = GetSpellCode(playerData.summoner2Id);

    let spellDInfo = SummonerSpell["data"][spellD];
    let spellFInfo = SummonerSpell["data"][spellF]

    console.log(spellDInfo, spellFInfo)

    let getSpellArr = [];

    getSpellArr.push(
      <div className="UserMatchData_SpellInfo">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${spellD}.png`}
          className="UserMatchData_SpellImg"
        />
        <span className="UserMatchData_SpellFtoolTip">
          <p>{spellDInfo.name+"쿨타임 : "+spellDInfo.cooldownBurn +"초"}</p>
          <p>{spellDInfo.description}</p>
        </span>
      </div>,
      <div className="UserMatchData_SpellInfo">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${spellF}.png`}
          className="UserMatchData_SpellImg"
        />
        <span className="UserMatchData_SpellFtoolTip">
          <p>{spellFInfo.name+"쿨타임 : "+spellFInfo.cooldownBurn}</p>
          <p>{spellFInfo.description}</p>
        </span>
      </div>
    );
    return getSpellArr;
  };

  // 게임 시간, 게임플레이 날짜 구하는 함수
  const GetTime = () => {
    let dateTime = new Date(matchData.info.gameStartTimestamp);
    let endTime = new Date(
      matchData.info.gameStartTimestamp + matchData.info.gameDuration
    );
    let test = new Date();

    let durationTime = endTime - dateTime;

    let playSecond = Math.floor((durationTime % (1000 * 60)) / 1000);
    let playMinute = Math.floor(
      (durationTime % (1000 * 60 * 60)) / (1000 * 60)
    );

    setPlayTime(playMinute + "분" + playSecond + "초");

    const betweenTime = Math.floor(
      (test.getTime() - dateTime.getTime()) / 1000 / 60
    );

    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      setPlayDate(betweenTime + "분전");
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24 && betweenTimeHour > 0) {
      setPlayDate(betweenTimeHour + "시간전");
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      if (betweenTimeDay > 0) {
        setPlayDate(betweenTimeDay + "일전");
      }
    }
  };

  // 사용자가 사용한 아이템
  const GetItemBuild = () => {
    let itemData = [];

    itemData.push(
      playerData.item0,
      playerData.item1,
      playerData.item2,
      playerData.item6,
      playerData.item3,
      playerData.item4,
      playerData.item5
    );

    let itemImg = [];
    itemData.map((x, cnt) => {
      if (x > 0) {
        itemImg.push(
          <div className="UserMatchData_itemInfo">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${x}.png`}
              className="UserMatchData_itemImg"
            ></img>
          </div>
        );
      } else {
        itemImg.push(
          <div className="UserMatchData_itemInfo">
            <img src={NoneItem} className="UserMatchData_itemImg"></img>
          </div>
        );
      }
    });

    return itemImg;
  };

  useEffect(() => {
    GetTime();
    GetData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div
            className={
              gameWin ? "UserMatchData_WinMatch" : "UserMatchData_LoseMatch"
            }
          >
            <div className="UserMatchData_matchInfoContainer">
              <div className="UserMatchData_matchInfo">
                <p className={gameWin ? "UserMatchData_matchWin" : "UserMatchData_matchLose"}>{gameWin ? "승리" : "패배"}</p>
                <p className="UserMatchData_matchDate">{playDate}</p>
                <p className="UserMatchData_matchTime">{playTime}</p>
              </div>
              <div className="UserMatchData_userPlayContainer">
                <div className="UserMatchData_userPlayChampion">
                  <img
                    className="UserMatchData_userPlayChampionImg"
                    src={ChampImg()}
                  ></img>

                  <div className="UserMatchData_UseSpellRuneContainer">
                    <div className="UserMatchData_SpellContainer">
                      {GetSpells()}
                    </div>
                    <div className="UserMatchData_RuneContainer">
                      {GetRunes()}
                    </div>
                  </div>
                </div>
                <p>{GetChampKOname(playChamp)}</p>
              </div>
              <div className="UserMatchData_userPlayKda">
                <p>
                  {KDA[0]} / <span style={{color:"red"}}>{KDA[1]}</span> / {KDA[2]}
                </p>
                <p>{((KDA[0] + KDA[2]) / KDA[1]).toFixed(2)}:1 평점</p>
              </div>
              <div className="UserMatchData_userPlayInfo">
                <p>레벨{playerData.champLevel}</p>
                <p>
                  {playerData.totalMinionsKilled}(
                  {(playerData.totalMinionsKilled / parseInt(playTime)).toFixed(
                    1
                  )}
                  )CS
                </p>
                <p>
                  킬관여
                  {Math.ceil(
                    ((KDA[0] + KDA[2]) /
                      (matchData.info.teams[
                        playerData.teamId === 100 ? [0] : [1]
                      ].objectives.champion.kills -
                        1)) *
                      100
                  )}
                  %
                </p>
              </div>
              <div className="UserMatchData_ItemBuildContainer">
                <div className="UserMatchData_ItemBuild">{GetItemBuild()}</div>
              </div>
            </div>
            <div className="UserMatchData_togetherPlayMatch">
              <div className="UserMatchData_RedMember">
                {GetSummonerDatas(100)}
              </div>
              <div className="UserMatchData_BlueMember">
                {GetSummonerDatas(200)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserMatchData;
