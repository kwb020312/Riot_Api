import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/main.scss";

function Main() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <div className="Main_container">
        <div className="Main_Header">
          <button>전적 검색</button>
          <Link to="/champion">
            <button>챔피언 목록</button>
          </Link>
          <button>커뮤니티</button>
        </div>
        <div className="Main_searchUser_Container">
          <div className="Main_searchUser_InputContainer">
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
            <Link to={`/summoner/${userName}`}>
              <input
                type="button"
                value="검색"
                className="Main_searchUser_button"
              />
            </Link>
          </div>
          <div className="Main_searchUser_beforeSearchData">
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
