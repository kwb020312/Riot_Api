import { useParams } from "react-router-dom";

export default function DetailUser() {
  const { summoner } = useParams();
  return <>{summoner}</>;
}
