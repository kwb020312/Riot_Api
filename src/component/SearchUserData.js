import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
// import imgs from "../../img/Emblem_Bronze.png";

function SearchUserData() {
  const { userName } = useParams();

  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useState();

  const GetUSerInfo = async (id) => {
      const data = await axios.get(`/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-377a5043-697b-446e-b2f7-bf0edeedfe49`).then(res => res.data);
      console.log(data)
      setUserInfo(data)
    //   console.log(imgs);
  }

  const GetData = async () => {
    const data = await axios
      .get(
        `/lol/summoner/v4/summoners/by-name/${userName}?api_key=RGAPI-377a5043-697b-446e-b2f7-bf0edeedfe49`
      )
      .then((res) => res.data);
    
    setUserData(data);
    GetUSerInfo(data.id);
  };

  useEffect(() => {
      GetData()
  },[]);
  return (
    <>
      <div>{userData ? (
          <> {userData.name}
                {console.log(userInfo)}
          </>
         
        ) : <h1>loading</h1>}</div>
    </>
  );
}

export default SearchUserData;
