export interface Game {
    away: string;
    home: string;
    score: Score;
}

export interface Score {
    homeScore: number;
    awayScore: number;
}