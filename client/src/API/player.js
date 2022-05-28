import { useState, useEffect } from "react";


function getPlayers() {
    const url = "http://127.0.0.1:3001/all";
    return fetch(url)
    .then((res) => res.json())
    .then((res) =>
        // get just the title and url from each article
        res.Data.map((res) => ({
           id: res.id,
            name: res.name,
            position: res.position,
            age: res.age,
            team: res.team,
            games: res.games,
            started: res.started,
            mp: res.mp,
            fg: res.fg,
            fga: res.fga,
            fgp: res.fgp,
            three_made: res.three_made,
            three_attempts: res.three_attempts,
            three_percent: res.three_percent,
            ft: res.ft,
            fta: res.fta,
            ftp: res.ftp,
           orb: res.orb,
           drb: res.drb,
            trb: res.trb,
            ass: res.ass,
            stl: res.stl,
            blk: res.blk,
            tov: res.tov,
            pf: res.pf,
            points: res.points,
        })),
    )
}

export function usePlayers(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
                getPlayers().then((data) => {
                setData(data);
                setLoading(false);
                }).catch((e) => {
                    setError(e);
                    setLoading(false);
                })
    }, []);

    return {
        loading,
        data,
        error,
    }

}

function getPlayerStats(query) {
    console.log(query);
    const url = "http://127.0.0.1:3001"+query;
    return fetch(url)
    .then((res) => res.json())
    .then((res) =>
        // get just the title and url from each article
        res.Data.map((res) => ({
            id: res.id,
            date: res.date,
            position: res.position,
            age: res.age,
            team: res.team,
            homeaway: res.homeaway,
            opponent: res.opponent,
            win_loss: res.win_loss,
            games: res.games,
            started: res.started,
            mp: res.mp,
            fg: res.fg,
            fga: res.fga,
            fgp: res.fgp,
            three_made: res.three_made,
            three_attempts: res.three_attempts,
            three_percent: res.three_percent,
            ft: res.ft,
            fta: res.fta,
            ftp: res.ftp,
            orb: res.orb,
            drb: res.drb,
            trb: res.trb,
            ass: res.ass,
            stl: res.stl,
            blk: res.blk,
            tov: res.tov,
            pf: res.pf,
            points: res.points,
        })),
    )
}

export function usePlayerStats(query){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
                getPlayerStats(query).then((data) => {
                setData(data);
                setLoading(false);
                }).catch((e) => {
                    setError(e);
                    setLoading(false);
                })
    }, []);

    return {
        loading,
        data,
        error,
    }

}