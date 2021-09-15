export const GetSpellCode = (spellCode) => {
  switch (spellCode) {
      //방어막
    case 21:
      return "SummonerBarrier";
      // 정화
    case 1:
      return "SummonerBoost";
    //   점화
    case 14:
      return "SummonerDot";
      // 탈진
    case 3:
      return "SummonerExhaust";
      // 점멸
    case 4:
      return "SummonerFlash";
    //   유체화
    case 6:
      return "SummonerHaste";
    //   회복
    case 7:
      return "SummonerHeal";
    // 총명
    case 13:
      return "SummonerMana";
    //  왕을 향해!
    case 30:
      return "SummonerPoroRecall";
    // 포로 던지기
    case 31:
      return "SummonerPoroThrow";
    // 강타
    case 11:
      return "SummonerSmite";
    // 표식
    case 39:
      return "SummonerSnowURFSnowball_Mark";
     // 표식 
    case 32:
      return "SummonerSnowball";
      // 텔레포트
    case 12:
      return "SummonerTeleport";
      // 게임 시작 후 결정
    case 54:
      return "Summoner_UltBook_Placeholder";
  }
};
