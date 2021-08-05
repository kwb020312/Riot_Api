import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function SearchUserData() {
  const { userName } = useParams();

  const [userData, setUserData] = useState();

  const GetData = async () => {
    const data = await axios
      .get(
        `/lol/summoner/v4/summoners/by-name/${userName}?api_key=RGAPI-377a5043-697b-446e-b2f7-bf0edeedfe49`
      )
      .then((res) => res.data);

    setUserData(data);
  };

  useEffect(() => {
      GetData()
  },[]);
  return (
    <>
      <div>{userData}</div>
    </>
  );
}

export default SearchUserData;
