import {CardColor, Game} from "../../interfaces";

export interface GameScoreProps {
    game: Game;
}

export function GameScore(prop: GameScoreProps) {

    const getInitials = (name: string): string => {
        //  We assume that player's names are space delimited
        return name.split(" ").reduce((initials, name) => `${initials}${name.substring(0, 1)}`, "")
    }

    //  NOTE: I am using the index as the key for the list, knowing that it's not recommended. This is for simplicity's sake.
    return <>
        <span>{prop.game.home}:{prop.game.away}</span> | <span>{prop.game.score.homeScore}:{prop.game.score.awayScore}</span>
        <ul>
            {prop.game.goals?.map((goal, index) => <li
                key={index}><span>GOAL {goal.time}: {getInitials(goal.scorer)}</span></li>)}
        </ul>
        <ul>
            {prop.game.cards?.map((card, index) => <li
                key={index}>
                <span>CARD {card.time}: {getInitials(card.player)}({card.cardColor === CardColor.YELLOW ? 'YELLOW' : 'RED'})</span>
            </li>)}
        </ul>
    </>
}