import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

function Main() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}

          onKeyDown={(e) => {
            if(e.keyCode === 13){
                document.location.href=`/summoner/${userName}`;   
            }
        }}
        />
        <Link to={`/summoner/${userName}`}>
          <input type="button" value="검색"  />
        </Link>
        <Link to="/champion">
          <button>챔피언 목록</button>
        </Link>
      </div>
    </>
  );
}

export default Main;
