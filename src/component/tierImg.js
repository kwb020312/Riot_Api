import Unrank from "../img/Emblem_Unranked.png";
import IRON from "../img/Emblem_Iron.png";
import BRONZE from "../img/Emblem_Bronze.png";
import SILVER from "../img/Emblem_Silver.png";
import GOLD from "../img/Emblem_Gold.png";
import PLATINUM from "../img/Emblem_Platinum.png";
import DIAMOND from "../img/Emblem_Diamond.png";
import MASTER from "../img/Emblem_Master.png";
import GRANDMASTER from "../img/Emblem_Grandmaster.png";
import CHELLENGER from "../img/Emblem_Challenger.png";

export const TierImg = (tier) => {
    switch(tier) {
        case "unranked" : return Unrank;
        case "IRON" :  return IRON
        case "BRONZE" : return BRONZE
        case "SILVER" : return SILVER
        case "GOLD" : return GOLD
        case "PLATINUM" : return PLATINUM
        case "DIAMOND" : return DIAMOND
        case "MASTER" : return MASTER
        case "GRANDMASTER" : return GRANDMASTER
        case "CHALLENGER" : return CHELLENGER
    }
    
}