import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

function UserMatchData(props) {
  
  return (
    <>
      <div className="SearchUserData_Match" >
          {props.matchData.info.participants.map((x) => {
            if (x.summonerName === props.userData.name) {
              return <>
                <div className="UserMatchData_matchInfo">
                <p>
                  {x.kills} / {x.deaths} / {x.assists}
                </p>
                <p>
                  {props.matchData.info.teams.map((y) => {
                    if (x.teamId === y.teamId) {
                      if (y.win) {
                        return "승리";
                      } else {
                        return "패배";
                      }
                    }
                  })}
                </p>
                </div>
                <img className="UserMatchData_userPlayChampionImg" src={`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${x.championName}.png`} ></img>
              </>;
            }
          })}
        </div>
    </>
  );
}

export default UserMatchData;
