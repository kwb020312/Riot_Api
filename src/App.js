import React from "react";

import {Route} from "react-router-dom"
import Champion from './component/Champion';
import ChampionInfo from './component/ChampionInfo';
import Main from './component/Main';
import SearchUserData from './component/SearchUserData';

function App() {
  return (
    
    <>
      <Route exact={true} path='/' component = {Main} />
      <Route path='/summoner/:userName' component = {SearchUserData} />
      <Route path='/champion' exact={true} component = {Champion} />
      <Route path='/champion/info' component = {ChampionInfo} />
    </>
  );
}

export default App;
