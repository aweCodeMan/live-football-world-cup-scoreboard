import {Game} from "../../interfaces";

export interface GameScoreProps {
    game: Game;
}

export function GameScore(prop: GameScoreProps) {

    return <>
        <span>{prop.game.home}:{prop.game.away}</span> | <span>{prop.game.score.homeScore}:{prop.game.score.awayScore}</span>
    </>
}