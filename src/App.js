import React from "react";
import { Route } from "react-router-dom";
import Champion from "./component/Champion";
import ChampionInfo from "./component/ChampionInfo";

function App() {
  return (
    <>
      <Route exact={true} path="/" render={() => <Champion />} />
      <Route path="/info" render={() => <ChampionInfo />} />
    </>
  );
}

export default App;
