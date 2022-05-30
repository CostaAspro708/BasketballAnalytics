import { useParams } from "react-router-dom";
import {PlayerTable, GridExample} from "../components/player_stats_table";
import {usePlayerInfo} from "../API/player";
import { load } from "cheerio";

function PlayerPage() {

    const param = useParams();
    const { loading, data, error } = usePlayerInfo("/players/"+param.let+"/"+param.id);

    if(loading){
        return <div> Loading ...</div>
    }

    console.log(data);
    
    return (
      <div>
        {/* Player: {data.Name}
        <img src={data.Image}></img> */}
        <PlayerTable let = {param.let} id={param.id}/>
      </div>
    );
}

export default PlayerPage;