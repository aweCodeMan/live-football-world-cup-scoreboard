import {render, screen} from '@testing-library/react';
import {GameScore} from './gameScore';
import {CardColor, Game, Team} from "../../interfaces";

describe('Game score component tests', () => {

    const exampleGame: Game = {
        id: 1,
        home: 'Home',
        away: 'Away',
        score: {homeScore: 0, awayScore: 1},
        goals: [{time: "20", team: Team.AWAY, scorer: 'John Doe'}],
        cards: [{time: "25", team: Team.HOME, player: 'Joe Moe', cardColor: CardColor.YELLOW}]
    };

    it('shows the team names', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('Home:Away')).toBeInTheDocument();
    });

    it('shows the scores', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('0:1')).toBeInTheDocument();
    });

    it('shows the time and the scorer of the goal', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('GOAL 20: JD')).toBeInTheDocument();
    });

    it('shows the time and the player yellow carded', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('CARD 25: JM(YELLOW)')).toBeInTheDocument();
    });

    it('shows the time and the player red carded', () => {
        const redCardGame = {...exampleGame, cards: [{time: '25', team: Team.HOME, player: 'Joe Moe', cardColor: CardColor.RED}]};
        render(<GameScore game={redCardGame}/>);

        expect(screen.getByText('CARD 25: JM(RED)')).toBeInTheDocument();
    });
});