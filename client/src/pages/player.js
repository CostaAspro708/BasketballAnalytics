import { useParams } from "react-router-dom";
import {PlayerTable, GridExample} from "../components/player_stats_table";
import {usePlayerInfo} from "../API/player";
import { load } from "cheerio";
import React, { useCallback, useMemo, useEffect, useState } from 'react';


function PlayerPage() {
  const [name, setName] = useState("Loading...");
const [srcimage, setImage] = useState("Loading...");
    const param = useParams();

    useEffect(() => {
      fetch("http://127.0.0.1:3001/info/players/"+param.let+"/"+param.id)
        .then(results => results.json())
        .then(data => {
          
          setImage(data.Image);
          setName(data.Name);
          
          
        });
    }, []); // <-- Have to pass in [] here!
    
    return (
      <div>
        Player: {name}
        <img src={srcimage}></img>
        <PlayerTable let = {param.let} id={param.id}/>
      </div>
    );
}

export default PlayerPage;