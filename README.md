# Live Football World Cup Score Board

The purpose of this library is to offer you premade components for showing a football world cup score board.

### Considerations

- We're using `id` as an alternative to a game start time (we assume that a game with a lower `id` started before a game with a higher `id`)
- As we're using Typescript, we're not validating for the correct input, and the library has shortcomings if used inside a JS project.
- We're assuming that we don't get a list of games with a duplicated `id`

## Running the example

`npm run dev` will start a dev server with the `Example.tsx` showing a usecase for `useLiveGames` custom hook. Once
running you can check `http://localhost:5173/` in your browser.

## Usage

The library is made out of 3 parts.

### `GameScore`

A basic visual component that displays the team names and their respective scores.

```
 const game: Game = {id: 1, home: 'Home team', away: 'Away team', score: {homeScore: 0, awayScore: 1}};

 <GameScore game={game} />
```

### `GameScoreTable`

A basic visual component that displays a table of game scores.

```
const games: Game[] = [
    {id: 1, home: 'Home team 1', away: 'Away team 1', score: {homeScore: 0, awayScore: 1}},
    {id: 2, home: 'Home team 2', away: 'Away team 2', score: {homeScore: 2, awayScore: 1}},
];

<GameScoreTable games={games}/>
```

### `useLiveGames`

A custom React hook that allows you to manage your live games. Check `Example.tsx` for a simple use case for `useLiveGames` and `GameScoreTable`.

```
const [games, {addGame, finishGame, updateGame}] = useLiveGames();  
```

#### `addGame`

This method allows you to add new games. 

```
const [games, {addGame, finishGame, updateGame}] = useLiveGames();  

addGame({id: 1, home: 'Home team 1', away: 'Away team 1', score: {homeScore: 0, awayScore: 1}});
```

#### `updateGame`

This method allows you to update the score of an existing game.

```
const [games, {addGame, finishGame, updateGame}] = useLiveGames();  

//  id, score
updateGame(1, {homeScore: 0, awayScore: 1}});
```

#### `finishGame`

This method allows you to finish an existing game.

```
const [games, {addGame, finishGame, updateGame}] = useLiveGames();  

//  id
finishGame(1);
```


## Build
`npm run build` will create the `dist` folder for the library.


## Running tests

`npm run test` for running the test suite while watching for file changes.

`npm run coverage` for running the tests with code coverage.

![Code coverage](/tests/coverage_test.png)