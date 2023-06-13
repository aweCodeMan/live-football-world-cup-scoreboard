import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {GameScoreTable, useLiveGames} from "./src";
import {CardColor, Game, Team} from "./src/interfaces";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Example/>,
)

const EXAMPLE_GAMES: Game[] = [
    {id: 1, home: 'Mexico', away: 'Canada', score: {homeScore: 0, awayScore: 5}},
    {id: 2, home: 'Spain', away: 'Brazil', score: {homeScore: 10, awayScore: 2}},
    {id: 3, home: 'Germany', away: 'France', score: {homeScore: 2, awayScore: 2}},
    {id: 4, home: 'Uruguay', away: 'Italy', score: {homeScore: 6, awayScore: 6}},
    {
        id: 5, home: 'Argentina', away: 'Australia', score: {homeScore: 3, awayScore: 1},
        goals: [
            {time: "4", team: Team.HOME, scorer: 'John Doe'},
            {time: "14", team: Team.HOME, scorer: 'John Doe'},
            {time: "24", team: Team.HOME, scorer: 'John Doe'},
            {time: "30", team: Team.AWAY, scorer: 'Joe Moe'}
        ],
        cards: [
            {time: "25", team: Team.HOME, player: 'John Doe', cardColor: CardColor.YELLOW}
        ],
    },
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
