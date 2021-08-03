import React from "react";
import {Route} from "react-router-dom"
import ChampionInfo from './component/ChampionInfo';

function App() {
  return(
    <>
      <Route exact={true} path='/' render={(() => < ChampionInfo/>)} />
    </>
  )
}

export default App;
