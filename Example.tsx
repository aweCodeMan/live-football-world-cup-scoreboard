import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {GameScoreTable, useLiveGames} from "./src";
import {Game} from "./src/interfaces";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Example/>,
)

const EXAMPLE_GAMES: Game[] = [
    {id: 1, home: 'Mexico', away: 'Canada', score: {homeScore: 0, awayScore: 5}},
    {id: 2, home: 'Spain', away: 'Brazil', score: {homeScore: 10, awayScore: 2}},
    {id: 3, home: 'Germany', away: 'France', score: {homeScore: 2, awayScore: 2}},
    {id: 4, home: 'Uruguay', away: 'Italy', score: {homeScore: 6, awayScore: 6}},
    {id: 5, home: 'Argentina', away: 'Australia', score: {homeScore: 3, awayScore: 1}},
];

function Example() {

    const [games, {addGame}] = useLiveGames();

    useEffect(() => {
        EXAMPLE_GAMES.forEach((game) => {
            addGame(game);
        });
    }, []);


    return (
        <>
            <GameScoreTable games={games}/>
        </>
    )
}
