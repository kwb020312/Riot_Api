import RuneJson from "../json/runesReforged.json"

export const GetPriRunesData =  (primaryRunes) =>{
    const GetRuneInfo= (ids) => {
        for(let cnt2 = 0; cnt2 < ids["slots"][0]["runes"].length ; cnt2++){
            if(ids["slots"][0]["runes"][cnt2]["id"] === primaryRunes){
                return ids["slots"][0]["runes"][cnt2]
            }
        }
    }

    const GetRuneId = (runeId) => {
            console.log(runeId)
            if(runeId > 8100 && runeId <8200 || runeId === 9923){
                return RuneJson[0];
            }else if(runeId > 8300 && runeId <8400){
                return RuneJson[1];
            }else if(runeId > 8400 && runeId <8500){
                return RuneJson[3];
            }else if(runeId > 8200 && runeId <8300){
                return RuneJson[4];
            }else{
                return RuneJson[2];
            }
    }

    return GetRuneInfo(GetRuneId(primaryRunes))

}

export const GetSubRunesData = (subRunes) => {
        if(subRunes > 8100 && subRunes <8200 || subRunes === 9923){
            return RuneJson[0];
        }else if(subRunes > 8300 && subRunes <8400){
            return RuneJson[1];
        }else if(subRunes > 8400 && subRunes <8500){
            return RuneJson[3];
        }else if(subRunes > 8200 && subRunes <8300){
            return RuneJson[4];
        }else{
            return RuneJson[2]; 
        }
}