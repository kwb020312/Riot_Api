import React from "react";
import { Route } from "react-router-dom";
import Champion from "./component/Champion";
import ChampionInfo from "./component/ChampionInfo";
import DetailUser from "./component/DetailUser";
import SearchUser from "./component/SearchUser";

function App() {
  return (
    <>
      <Route exact={true} path="/" render={() => <Champion />} />
      <Route path="/info" render={() => <ChampionInfo />} />
      <Route path="/search/:summoner" component={DetailUser} />
      <Route path="/search" exact={true} component={SearchUser} />
    </>
  );
}

export default App;
