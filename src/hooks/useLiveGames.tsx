import {useEffect, useState} from 'react';
import {Card, Game, Goal, Score} from "../interfaces";
import {s} from "vitest/dist/types-ad1c3f45";

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
            }

            return [...prevState];
        });
    }

    function updateGame(id: number, score: Score, goals: Goal[] = [], cards: Card[] = []) {
        setGames((prevState) => {
            const existingGame = prevState.find((game: Game) => game.id === id);

            if (!existingGame) {
                console.error("Cannot update a non-existing game");
                return [...prevState];
            }

            if (score) {
                const currentTotalScore = existingGame.score.homeScore + existingGame.score.awayScore;
                const newTotalScore = score.homeScore + score.awayScore;
                const diff = Math.abs(currentTotalScore - newTotalScore);

                if (diff > 1) {
                    console.error("You can only update the score incrementally (by 1)");
                    return [...prevState];
                }
            }

            return [...reorderGames(prevState.map((game) => {
                if (game.id === id) {
                    return {...game, score, goals, cards};
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
