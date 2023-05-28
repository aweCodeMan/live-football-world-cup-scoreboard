import {render, screen} from '@testing-library/react';
import {GameScore} from './gameScore';
import {Game} from "../../interfaces";

describe('Game score component tests', () => {

    const exampleGame: Game = {id: 1, home: 'Home', away: 'Away', score: {homeScore: 0, awayScore: 1}};

    it('shows the team names', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('Home:Away')).toBeInTheDocument();
    });

    it('shows the scores', () => {
        render(<GameScore game={exampleGame}/>);

        expect(screen.getByText('0:1')).toBeInTheDocument();
    });
});