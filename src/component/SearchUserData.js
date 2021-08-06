import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { TierImg } from "./tierImg"; 
import "../css/SearchUserData.css"

function SearchUserData() {
  const { userName } = useParams();

  const [userData, setUserData] = useState();
  const [soloRankData, setSoloRankData] = useState();
  const [freeRankData, setFreeRankData] = useState();
  const [loading, setLoading] = useState(false);

  

  const WinPercent = (wins, losses) => {
    let percent = (wins / (wins + losses)) * 100;

    return percent.toFixed(1);
  };

  

  useEffect(() => {

    const GetMatchData = async (ppuid) => {
      const CallData = await axios.get(`/asia/lol/match/v5/matches/by-puuid/${ppuid}/ids?start=0&count=20&api_key=${process.env.REACT_APP_API_KEY}`);
      const data = CallData.data;

      console.log(data)
    }

    const GetUSerInfo = async (id) => {
      const CallData = await axios.get(
        `/kr/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
      const data = CallData.data;
      console.log(data);
      for (let i in data) {
        if (data[i].queueType === "RANKED_SOLO_5x5") {
          setSoloRankData(data[i]);
        } else if (data[i].queueType === "RANKED_FLEX_SR") {
          setFreeRankData(data[i]);
        }
      }
      setLoading(true);
    };

    const GetData = async () => {
      const CallData = await axios.get(
        `/kr/lol/summoner/v4/summoners/by-name/${userName}?api_key=${process.env.REACT_APP_API_KEY}`
      );
  
      if(CallData !== "" || CallData !== undefined || CallData !== null){
        const data = CallData.data;
        
        console.log(data)

        setUserData(data);
        GetUSerInfo(data.id);
        GetMatchData(data.ppuid);
      }else{
        setUserData(undefined);
        console.log("asd")
      }
  
    };
    GetData();
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${userData.profileIconId}.png`} className='SearchUserData_userIconImg'></img>
            <h1>{userData.name}</h1>
            <br></br>
            <div>
            <div>
                    <h1>솔로 랭크</h1>
              {soloRankData ? (
                <>
                    <p>{soloRankData.tier + " " + soloRankData.rank}</p>
                    <p><img src={TierImg(soloRankData.tier)} alt={soloRankData.tier} className='SearchUserData_TierImg'/></p>
                    <p>플레이수 : {soloRankData.wins + soloRankData.losses}</p>
                    <p>승 : {soloRankData.wins}</p>
                    <p>패 : {soloRankData.losses}</p>
                    <p>
                      승률 :
                      {WinPercent(soloRankData.wins, soloRankData.losses)}%
                    </p>
                 
                </>
              ) : (
                <h1>전적 없음.</h1>
              )}
              </div>
              <div>
                    <h1>자유랭</h1>
              {freeRankData ? (
                <>
                    <p>{freeRankData.tier + " " + freeRankData.rank}</p>
                    <p><img src={TierImg(freeRankData.tier)} alt={freeRankData.tier} className='SearchUserData_TierImg'/></p>
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
          </>
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </>
  );
}

export default SearchUserData;
