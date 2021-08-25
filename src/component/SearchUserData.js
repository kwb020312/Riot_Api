import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useParams } from "react-router";
import { TierImg } from "./tierImg";
import UserMatchData from "./UserMatchData";
import { GetData, GetUserInfoData, GetUserMatchData } from "../api";
import "../css/SearchUserData.css";

function SearchUserData() {
  const { userName } = useParams();
  
  const [ userNames,setUserNames] = useState("");
  const [userData, setUserData] = useState(null);
  const [soloRankData, setSoloRankData] = useState();
  const [freeRankData, setFreeRankData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchMatchData, setSearchMatchData] = useState([]);
  // 승률 구하기
  const WinPercent = (wins, losses) => {
    let percent = (wins / (wins + losses)) * 100;

    return percent.toFixed(1);
  };

  const GetUserInfo = async () => {

    const data = await GetData(userName);
    setUserData(data);
    if (data !== undefined) {
      // if(data)
      const datas = await GetUserInfoData(data.id);
      {
        datas.solo ? setSoloRankData(datas.solo) : setSoloRankData();
      }
      {
        datas.free ? setFreeRankData(datas.free) : setFreeRankData();
      }
      const matchData = await GetUserMatchData(data.puuid);
      let matchInfo = [];
      if (matchData.length === 0) {
        matchInfo.push(
          <h3 style={{ textAlign: "center" }}>전적이 없음</h3>
        );
      } else {
        for (let cnt = 0; cnt < matchData.length; cnt++) {
          console.log(matchData[cnt]);
          matchInfo.push(
            <UserMatchData
              key={cnt}
              matchData={matchData[cnt]}
              userData={data}
            />
          );
        }
      }
      setSearchMatchData(matchInfo);
    }

    setLoading(true);
  };

  useEffect(() => {
    GetUserInfo();
  }, []);
  return (
    <>
      {loading ? (
        <>
        <div className="Main_Header">
      <input
              type="text"
              onChange={(e) => {
                setUserNames(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  document.location.href = `/summoner/${userNames}`;
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
          {userData !== undefined ? (
            <div className="SearchUserData_Container">
              <div className="SearchUserData_UserInfoContainer">
                <div className="SearchUserData_UserInfoHeader">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${userData.profileIconId}.png`}
                    className="SearchUserData_userIconImg"
                  ></img>
                  <div className="SearchUserData_UserInfo">
                    <h1>{userData.name}</h1>
                    <h1>레벨 : {userData.summonerLevel}</h1>
                  </div>
                </div>
              </div>
              <div className="SearchUserData_UserTierInfoContainer">
                  <div className="SearchUserData_SoloTierInfo">
                    <h1>솔로 랭크</h1>
                    {soloRankData ? (
                      <>
                        <p>{soloRankData.tier + " " + soloRankData.rank}</p>
                        <p>
                          <img
                            src={TierImg(soloRankData.tier)}
                            alt={soloRankData.tier}
                            className="SearchUserData_TierImg"
                          />
                        </p>
                        <p>{soloRankData.wins}승/{soloRankData.losses}패</p>
                        <p>
                          승률 :
                          {WinPercent(soloRankData.wins, soloRankData.losses)}%
                        </p>
                      </>
                    ) : (
                      <h1>전적 없음.</h1>
                    )}
                    </div>
                  <div className="SearchUserData_FreeTierInfo">
                    <h1>자유 랭크</h1>
                    {freeRankData ? (
                      <>
                        <p>{freeRankData.tier + " " + freeRankData.rank}</p>
                        <p>
                          <img
                            src={TierImg(freeRankData.tier)}
                            alt={freeRankData.tier}
                            className="SearchUserData_TierImg"
                          />
                        </p>
                        <p>{freeRankData.wins}승/{freeRankData.losses}패</p>
                        <p>
                          승률 :{" "}
                          {WinPercent(freeRankData.wins, freeRankData.losses)}%
                        </p>
                      </>
                    ) : (
                      <h1>전적 없음.</h1>
                    )}
                    </div>
                </div>
              <div className="SearchUserData_MatchContainer">
                {searchMatchData}
              </div>
            </div>
          ) : (
            <>
              {userData === undefined ? (
                <h1 className="SearchUserData_NoneUser">
                  없는 사용자 입니다...
                </h1>
              ) : (
                <h1 className="SearchUserData_Loading">LOADING</h1>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SearchUserData;
