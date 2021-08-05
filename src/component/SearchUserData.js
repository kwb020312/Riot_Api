import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

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

    const GetUSerInfo = async (id) => {
      const getData = await axios.get(
        `/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = getData.data;
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
      const getData = await axios.get(
        `/lol/summoner/v4/summoners/by-name/${userName}?api_key=RGAPI-377a5043-697b-446e-b2f7-bf0edeedfe49`
      );
  
      if(getData !== "" || getData !== undefined || getData !== null){
        const data = getData.data;
  
        setUserData(data);
        GetUSerInfo(data.id);
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
            {console.log(userData.name)}
            {userData.name}
            <br></br>
            <div>
            <div>
                    <h1>솔로 랭크</h1>
              {soloRankData ? (
                <>
                    {soloRankData.tier + " " + soloRankData.rank}
                    <p>플레이수 : {soloRankData.wins + soloRankData.losses}</p>
                    <p>승 : {soloRankData.wins}</p>
                    <p>패 : {soloRankData.losses}</p>
                    <p>
                      승률 :{" "}
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
                    {freeRankData.tier + " " + freeRankData.rank}
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
