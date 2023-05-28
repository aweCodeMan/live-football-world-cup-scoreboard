import {useEffect, useState} from 'react';
import {Game, Score} from "../interfaces";

export function useLiveGames() {
    const [games, setGames] = useState<Game[]>([]);

    function addGame(game: Game) {
        setGames((prevState) => {
            return [...reorderGames([...prevState, game])]
        });
    }

    function finishGame(id: number) {
        setGames((prevState) => {
            const game = prevState.find((game) => game.id === id);

            if (game) {
                prevState.splice(games.indexOf(game), 1);

                return [...prevState];
            }
        });
    }

    function updateGame(id: number, score: Score) {
        setGames((prevState) => {
            return [...reorderGames(prevState.map((game) => {
                if (game.id === id) {
                    return {...game, score: score};
                }

                return game;
            }))];
        })
    }

    function reorderGames(ga: Game[]): Game[] {
        return ga.sort((a: Game, b: Game) => {
            //  Sort by total score
            const totalScoreA = a.score.homeScore + a.score.awayScore;
            const totalScoreB = b.score.homeScore + b.score.awayScore;

            if (totalScoreA !== totalScoreB) {
                return totalScoreB - totalScoreA;
            }

            // Sort by time start, as we assume that id's are ordered
            return b.id - a.id;
        });
    }

    return [
        games,
        {
            addGame,
            finishGame,
            updateGame
        },
    ];
}
