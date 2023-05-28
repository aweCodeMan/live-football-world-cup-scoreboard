import {act, renderHook} from '@testing-library/react';
import {useLiveGames} from "./useLiveGames.tsx";

describe('Live games hook tests', () => {

    it('initializes with an empty array of games', () => {
        const {result} = renderHook(() => useLiveGames());

        expect(result.current[0].length).toBe(0);
    });


    it('starts a new game', () => {
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].addGame({id: 1, home: 'Home', away: 'Away', score: {homeScore: 0, awayScore: 0}});
        })

        expect(result.current[0].length).toBe(1);
        expect(result.current[0][0].id).toBe(1);
    });

    it('can update the score of a game', () => {
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].addGame({id: 1, home: 'Home', away: 'Away', score: {homeScore: 0, awayScore: 0}});
            result.current[1].updateGame(1, {homeScore: 0, awayScore: 1});
        })

        expect(result.current[0][0].score.homeScore).toBe(0);
        expect(result.current[0][0].score.awayScore).toBe(1);
    });

    it('can finish a game', () => {
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].addGame({id: 1, home: 'Home', away: 'Away', score: {homeScore: 0, awayScore: 0}});
            result.current[1].finishGame(1);
        })

        expect(result.current[0].length).toBe(0);
    });

    it('handles finishing a game that does not exist', () => {
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].finishGame(1);
        })

        expect(result.current[0].length).toBe(0);
    });

    it('the games are ordered by their total score', () => {
        //  The games with the same total score will be returned ordered by the most recently started match in the scoreboard
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].addGame({id: 1, home: 'Home 1', away: 'Away 1', score: {homeScore: 0, awayScore: 0}});
            result.current[1].addGame({id: 2, home: 'Home 2', away: 'Away 2', score: {homeScore: 0, awayScore: 0}});
            result.current[1].addGame({id: 3, home: 'Home 3', away: 'Away 3', score: {homeScore: 0, awayScore: 0}});
            result.current[1].addGame({id: 4, home: 'Home 4', away: 'Away 4', score: {homeScore: 0, awayScore: 0}});
        })

        // Should be ordered by their start time in reverse order (newest at the beginning)
        expect(result.current[0].map((game) => game.id)).toStrictEqual([4, 3, 2, 1]);

        //  Game 3 should be at the beginning, as it has the biggest total score
        act(() => {
            result.current[1].updateGame(3, {homeScore: 0, awayScore: 1});
        })

        expect(result.current[0].map((game) => game.id)).toStrictEqual([3, 4, 2, 1]);

        //  Game 2 should be returned after Game 3, as it started earlier (they have the same total score)
        act(() => {
            result.current[1].updateGame(2, {homeScore: 0, awayScore: 1});
        })

        expect(result.current[0].map((game) => game.id)).toStrictEqual([3, 2, 4, 1]);

        //  Game 4 should be at the beginning, as it has the biggest total score
        act(() => {
            result.current[1].updateGame(4, {homeScore: 1, awayScore: 1});
        })

        expect(result.current[0].map((game) => game.id)).toStrictEqual([4, 3, 2, 1]);

        //  Game 1 should be at the beginning, as it has the biggest total score
        act(() => {
            result.current[1].updateGame(1, {homeScore: 2, awayScore: 2});
        })

        expect(result.current[0].map((game) => game.id)).toStrictEqual([1, 4, 3, 2]);
    });

    it('has the correct order from the requirements', () => {
        const {result} = renderHook(() => useLiveGames());

        act(() => {
            result.current[1].addGame({id: 1, home: 'Mexico', away: 'Canada', score: {homeScore: 0, awayScore: 5}});
            result.current[1].addGame({id: 2, home: 'Spain', away: 'Brazil', score: {homeScore: 10, awayScore: 2}});
            result.current[1].addGame({id: 3, home: 'Germany', away: 'France', score: {homeScore: 2, awayScore: 2}});
            result.current[1].addGame({id: 4, home: 'Uruguay', away: 'Italy', score: {homeScore: 6, awayScore: 6}});
            result.current[1].addGame({id: 5, home: 'Argentina', away: 'Australia', score: {homeScore: 3, awayScore: 1}
            });
        })

        expect(result.current[0].map((game) => game.id)).toStrictEqual([4, 2, 1, 5, 3]);
    });
});