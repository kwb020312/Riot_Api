import React from "react";

import {Route} from "react-router-dom"
import Champion from './component/Champion';
import ChampionInfo from './component/ChampionInfo';
import Main from './component/Main';
import SearchUserData from './component/SearchUserData';

function App() {
  return (
    <>
      <Route exact={true} path='/' render={(() => < Main/>)} />
      <Route path='/summoner/:userName' render={(() => < SearchUserData/>)} />
      <Route path='/champion' exact={true} render={(() => <Champion />)} />
      <Route path='/champion/info' render={(() => <ChampionInfo />)} />
    </>
  );
}

export default App;
