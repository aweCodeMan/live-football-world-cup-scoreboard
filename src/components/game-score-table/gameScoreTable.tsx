import {Game} from "../../interfaces";
import {GameScore} from "../game-score/gameScore.tsx";

export interface GameScoreBoardProps {
    games: Game[];
}

export function GameScoreTable(prop: GameScoreBoardProps) {

    return <>
        <ol>
            {prop.games.map((game) => <li key={game.id}><GameScore game={game}/></li>)}
        </ol>
    </>
}