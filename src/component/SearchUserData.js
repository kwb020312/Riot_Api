import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { TierImg } from "./tierImg";
import "../css/SearchUserData.css";
import "../setupProxy";

function SearchUserData() {
  const { userName } = useParams();

  const [userData, setUserData] = useState(null);
  const [soloRankData, setSoloRankData] = useState();
  const [freeRankData, setFreeRankData] = useState();
  const [loading, setLoading] = useState(false);
  const matchData = [];

  // 승률 구하기
  const WinPercent = (wins, losses) => {
    let percent = (wins / (wins + losses)) * 100;

    return percent.toFixed(1);
  };

  useEffect(() => {
    // 경기 정보 가져오기
    const GetMatchData = async (matchId) => {

        const CallData = await axios.get(
          `/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`
        );
    
      const data = CallData.data;


      matchData.push(data);

      console.log(data);
    };

    // 유저가 플레이한 경기 정보 가져오기
    const GetUserMatchData = async (puuid) => {
      const CallData = await axios.get(
        `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.REACT_APP_API_KEY}`
      )
      const data = CallData.data;

      for (let i = 0; i < 5; i++) {
        GetMatchData(data[i]);
      }

      console.log(data);
      setLoading(true);
    };

    // 유저의 상세정보가져오기
    const GetUSerInfo = async (id) => {
      const CallData = await axios.get(
        `/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = CallData.data;
      console.log(data);
      for (let i in data) {
        if (data[i].queueType === "RANKED_SOLO_5x5") {
          setSoloRankData(data[i]);
        } else if (data[i].queueType === "RANKED_FLEX_SR") {
          setFreeRankData(data[i]);
        }
      }
    };

    // 유저의 id등나 이름 가져오기
    const GetData = async () => {
      const CallData = await axios.get(
        `/lol/summoner/v4/summoners/by-name/${userName}?api_key=${process.env.REACT_APP_API_KEY}`
      );

      if (CallData !== "" || CallData !== undefined || CallData !== null) {
        const data = CallData.data;

        console.log(data);

        setUserData(data);
        GetUSerInfo(data.id);
        GetUserMatchData(data.puuid);
      } else {
        setUserData(undefined);
        console.log("asd");
      }
    };
    GetData();
  }, []);
  return (
    <div className="SearchUserData_Container">
      <div className="SearchUserData_UserInfoContainer">
        {loading ? (
          <>
            <div className="SearchUserData_UserInfoHeader"> 
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${userData.profileIconId}.png`}
                className="SearchUserData_userIconImg"
              ></img>
              <h1>{userData.name}</h1>
              <br></br>
            </div>

            <div>
              <div className="SearchUserData_UserTierInfoContainer">
                <div className="SearchUserData_UserTierInfo">
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
                    <p>플레이수 : {soloRankData.wins + soloRankData.losses}</p>
                    <p>승 : {soloRankData.wins}</p>
                    <p>패 : {soloRankData.losses}</p>
                    <p>
                      승률 :{WinPercent(soloRankData.wins, soloRankData.losses)}
                      %
                    </p>
                  </>
                ) : (
                  <h1>전적 없음.</h1>
                )}
              </div>
              <div className="SearchUserData_UserTierInfo">
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
                    <p>플레이수 : {freeRankData.wins + freeRankData.losses}</p>
                    <p>승 : {freeRankData.wins}</p>
                    <p>패 : {freeRankData.losses}</p>
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
            </div>
          </>
        ) : (
          <h1>loading
            {console.log(userData)}
          </h1>
        )}
      </div>
    </div>
  );
}

export default SearchUserData;
