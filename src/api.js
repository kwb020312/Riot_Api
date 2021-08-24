import axios from "axios";

// 유저의 id등나 이름 가져오기
export const GetData = async (userName) => {
  console.log(userName);
  try {
    const CallData = await axios.get(
      `/lol/summoner/v4/summoners/by-name/${userName}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = CallData.data;

    return data;
  } catch (error) {
    return undefined;
  }
};

// 유저의 상세정보가져오기
export const GetUserInfoData = async (id) => {
  const CallData = await axios.get(
    `/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data = CallData.data;

  let userRank = {};

  for (let i in data) {
    if (data[i].queueType === "RANKED_SOLO_5x5") {
      userRank.solo = data[i];
    } else if (data[i].queueType === "RANKED_FLEX_SR") {
      userRank.free = data[i];
    }
  }

  return userRank;
};

// 유저가 플레이한 경기 정보 가져오기
export const GetUserMatchData = async (puuid) => {

    let matchData = [];

    const CallData = await axios.get(
      `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = CallData.data;

      console.log(data)

    let matchId = data;
    
    for (let cnt = 0; cnt < 2; cnt++) {
      if(matchId[cnt] !== undefined){
        const CallData = await axios.get(
          `/lol/match/v5/matches/${matchId[cnt]}?api_key=${process.env.REACT_APP_API_KEY}`
        );
  
        const data = CallData.data;
  
        matchData.push(data);
      }
    }

    return matchData;
  };
