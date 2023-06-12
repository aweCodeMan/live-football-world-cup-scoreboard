export interface Game {
    id: number;
    away: string;
    home: string;
    score: Score;
    goals?: Goal[];
    cards?: Card[];
}

export interface Score {
    homeScore: number;
    awayScore: number;
}

export enum Team {
    HOME,
    AWAY,
}

export interface Goal {
    time: string;
    team: Team;
    scorer: string;
}

export interface Card {
    time: string;
    team: Team;
    player: string;
    cardColor: CardColor;
}

export enum CardColor {
    YELLOW,
    RED,
}