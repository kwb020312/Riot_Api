import React from "react";

import {Route} from "react-router-dom"
import ChampionInfo from './component/ChampionInfo';
import Main from './component/Main';
import SearchUserData from './component/SearchUserData';

function App() {
  return (
    <>
      <Route exact={true} path='/' render={(() => < Main/>)} />
      <Route path='/userInfo/:userName' render={(() => < SearchUserData/>)} />
    </>
  );
}

export default App;
