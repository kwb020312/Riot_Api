import RuneJson from "../json/runesReforged.json"

export const GetPriRunesImg = (runeId) =>{
    let runeKindId = 0;

    switch(runeId){
        case runeId > 8100 && runeId <8200 : runeKindId = 8100;
        break;
        case runeId > 8300 && runeId <8400 : runeKindId = 8300;
        break;
        case runeId > 8000 && runeId <8100 : runeKindId = 8000;
        break;
        case runeId > 8200 && runeId <8300 : runeKindId = 8200;
        break;
        case runeId > 8400 && runeId <8500 : runeKindId = 8400;
        break;
    }


    let runeImgPath = RuneJson[runeKindId]["slots"][0][runes][0]["id"]
    import Img from `${runeId}`
}