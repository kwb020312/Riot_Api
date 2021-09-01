import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { TierImg } from "./tierImg";
import UserMatchData from "./UserMatchData";
import { GetData, GetUserInfoData, GetUserMatchData } from "../api/api.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SearchUserData.scss";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

function SearchUserData() {
  const { userName } = useParams();

  const [userNames, setUserNames] = useState("");
  const [userData, setUserData] = useState(null);
  const [soloRankData, setSoloRankData] = useState("");
  const [freeRankData, setFreeRankData] = useState("");
  const [loadinPer, setLoadingPer] = useState(0);
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
      datas.solo ? setSoloRankData(datas.solo) : setSoloRankData();
      datas.free ? setFreeRankData(datas.free) : setFreeRankData();

      const matchData = await GetUserMatchData(data.puuid);
      let matchInfo = [];
      setLoadingPer(100);
      if (matchData.length === 0) {
        matchInfo.push(<h3 style={{ textAlign: "center" }}>전적이 없음</h3>);
      } else {
        for (let cnt = 0; cnt < 10; cnt++) {
          matchData[cnt] !== undefined ? (
            matchInfo.push(
              <UserMatchData
                key={cnt}
                keyValue={cnt}
                matchData={matchData[cnt]}
                userData={data}
              />
            )
          ) : (
            <></>
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
      {/* 헤더 */}
      <div className="Main_Header">
        <button>커뮤니티</button>
        <Link to="/champion">
          <button>챔피언 목록</button>
        </Link>
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
      </div>
      {loading ? (
        <>
          {userData !== undefined ? (
            // 유저 데이터 헤더
            <div className="SearchUserData_Container">
              <div className="SearchUserData_UserInfoContainer">
                <div className="SearchUserData_UserNameIcon">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${userData.profileIconId}.png`}
                    className="SearchUserData_userIconImg"
                    alt="프로필 이미지"
                  ></img>
                  <div className="SearchUserData_UserInfo">
                    <h1>{userData.name}</h1>
                    <p>레벨 : {userData.summonerLevel}</p>
                  </div>
                </div>

                {/* 유저 티어  */}
                <div className="SearchUserData_UserTierInfoContainer">
                  <div className="SearchUserData_SoloTierInfo">
                    <div className="SearchUserData_TierInfo_header">
                      <h1>솔로 랭크</h1>
                    </div>

                    {soloRankData ? (
                      <>
                        <div className="SearchUserData_TierInfo_content">
                          <div className="SearchUserData_TierInfo_img">
                            <img
                              src={TierImg(soloRankData.tier)}
                              alt={soloRankData.tier}
                              className="SearchUserData_TierImg"
                            />
                          </div>
                          <div className="SearchUserData_TierInfo_text">
                            <p className="SearchUserData_TierInfo_tierText">
                              {soloRankData.tier + " " + soloRankData.rank}
                            </p>
                            <p className="SearchUserData_TierInfo_statisticText">
                              {soloRankData.wins}승/{soloRankData.losses}패
                            </p>
                            <p className="SearchUserData_TierInfo_winPercent">
                              승률 :
                              {" " + WinPercent(
                                soloRankData.wins,
                                soloRankData.losses
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="SearchUserData_TierInfo_content">
                          <div className="SearchUserData_TierInfo_img">
                            <img
                              src={TierImg("unranked")}
                              alt="언랭"
                              className="SearchUserData_TierImg"
                            />
                          </div>
                          <div className="SearchUserData_TierInfo_text">
                            <p>unranked</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="SearchUserData_FreeTierInfo">
                    <div className="SearchUserData_TierInfo_header">
                      <h1>자유 랭크</h1>
                    </div>
                    {freeRankData ? (
                      <>
                        <div className="SearchUserData_TierInfo_content">
                          <div className="SearchUserData_TierInfo_img">
                            <img
                              src={TierImg(freeRankData.tier)}
                              alt={freeRankData.tier}
                              className="SearchUserData_TierImg"
                            />
                          </div>
                          <div className="SearchUserData_TierInfo_text">
                            <p className="SearchUserData_TierInfo_tierText">
                              {freeRankData.tier + " " + freeRankData.rank}
                            </p>
                            <p className="SearchUserData_TierInfo_statisticText">
                              {freeRankData.wins}승/{freeRankData.losses}패
                            </p>
                            <p className="SearchUserData_TierInfo_winPercent">
                              승률 :
                              {" " +WinPercent(
                                freeRankData.wins,
                                freeRankData.losses
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="SearchUserData_TierInfo_content">
                          <div className="SearchUserData_TierInfo_img">
                            <img
                              src={TierImg("unranked")}
                              alt="언랭"
                              className="SearchUserData_TierImg"
                            />
                          </div>
                          <div className="SearchUserData_TierInfo_text">
                            <p>unranked</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* 유져 경기 데이터 */}
              <div className="SearchUserData_MatchContainer">
                <div className="SearchUserData_playChamp">
                  <div className="SearchUserData_playChamp_Header"></div>
                  <div className="SearchUserData_playChamp_Content"></div>
                </div>
                <div className="SearchUserData_userStatisticConatiner">
                  <div className="SearchUserData_userStatistic"></div>
                  <div className="SearchUserData_matchInfo">
                    {searchMatchData}
                  </div>
                </div>
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
        <>
          <Spinner animation="border" />
          Loading
        </>
      )}
    </>
  );
}

export default SearchUserData;
