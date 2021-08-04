import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

 function SearchUserData() {
    const { userName } = useParams();
    
    const GetData = async () => {
        const data = await axios.get(`/lol/summoner/v4/summoners/by-name/${userName}?api_key=RGAPI-377a5043-697b-446e-b2f7-bf0edeedfe49`).then(res => res.data);
        console.log(data)
    }

    GetData();
  return (
    <>
      <div><input type="text" />
      <input type="button" value="검색"/>
      </div>
    </>
  );
}

export default SearchUserData;
