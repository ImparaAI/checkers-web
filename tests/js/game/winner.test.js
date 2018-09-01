import Game from '../../../public/js/game/Game'
import {testNonWinningMoves, testWinningMove} from '../helpers'

let game;

beforeEach(() =>
{
	game = new Game;
});

test('player 1 wins', () =>
{
	testNonWinningMoves(game, [[11, 15], [21, 17], [8, 11], [25, 21], [4, 8], [29, 25], [12, 16], [22, 18], [15, 22], [22, 29], [30, 25], [29, 22], [22, 13], [23, 18],
		[8, 12], [26, 23], [16, 20], [31, 26], [3, 8], [24, 19], [10, 14], [21, 17], [13, 22], [22, 31], [31, 24], [24, 15], [15, 22], [32, 27], [9, 13], [23, 18],
		[14, 23], [23, 32], [28, 24]]);

	testWinningMove(game, [20, 27]);

	expect(game.winner.number).toBe(1);
});

test('player 2 wins', () =>
{
	testNonWinningMoves(game, [[10, 14], [22, 17], [9, 13], [17, 10], [6, 15], [23, 18], [15, 22], [25, 18], [13, 17], [21, 14], [5, 9], [14, 5], [1, 6], [5, 1],
			[11, 15], [1, 10], [10, 19], [12, 16], [19, 12], [7, 10], [26, 23], [10, 14], [18, 9], [3, 7], [12, 3], [3, 10], [2, 6], [9, 2], [4, 8], [2, 7], [8, 11]]);

	testWinningMove(game, [7, 16]);

	expect(game.winner.number).toBe(2);
});

test('player 1 wins by no legal moves', () =>
{
	testNonWinningMoves(game, [[11, 15], [22, 18], [15, 22], [25, 18], [12, 16], [18, 14], [9, 18], [23, 14], [10, 17], [21, 14], [5, 9], [14, 5], [6, 9],
			[29, 25], [9, 13], [25, 22], [2, 6], [22, 18], [13, 17], [27, 23], [17, 21], [24, 19], [8, 12], [30, 25], [21, 30], [28, 24], [4, 8], [18, 14], [6, 10],
			[32, 27], [10, 17], [23, 18], [16, 23], [23, 32], [24, 19], [30, 23], [23, 14], [31, 27], [32, 23]]);

	testWinningMove(game, [23, 16]);

	expect(game.winner.number).toBe(1);
});
