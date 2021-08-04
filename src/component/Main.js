import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Main() {
  const [userName, setUserName] = useState();

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
            console.log(userName);
          }}
        />
        <Link to={`/userInfo/${userName}`}>
          <input type="button" value="검색" />
        </Link>
      </div>
    </>
  );
}

export default Main;
