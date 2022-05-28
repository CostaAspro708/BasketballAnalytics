import { useParams } from "react-router-dom";
import {PlayerTable, GridExample} from "../components/player_stats_table";

function PlayerPage() {


    const param = useParams();
    return (
      <div>
        Player: {param.let}
        <PlayerTable let = {param.let} id={param.id}/>
      </div>
    );
}

export default PlayerPage;