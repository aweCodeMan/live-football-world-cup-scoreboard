import {render, screen} from '@testing-library/react';
import {GameScoreTable} from './gameScoreTable.tsx';
import {Game} from "../../interfaces";

describe('Game score table component tests', () => {

    const exampleGame1: Game = {id: 1, home: 'Home 1', away: 'Away 1', score: {homeScore: 0, awayScore: 1}};
    const exampleGame2: Game = {id: 2, home: 'Home 2', away: 'Away 2', score: {homeScore: 2, awayScore: 1}};
    const exampleGame3: Game = {id: 3, home: 'Home 3', away: 'Away 3', score: {homeScore: 1, awayScore: 2}};

    it('shows the game scores in order', () => {
        const games = [exampleGame1, exampleGame2, exampleGame3];

        render(<GameScoreTable games={games}/>);

        const position1 = screen.getByText("Home 1:Away 1");
        const position2 = screen.getByText("Home 2:Away 2");
        const position3 = screen.getByText("Home 3:Away 3");

        expect(position1.compareDocumentPosition(position2)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(position2.compareDocumentPosition(position3)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
});