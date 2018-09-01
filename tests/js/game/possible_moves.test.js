import Game from '../../../public/js/game/Game'
import {testNonWinningMoves, testWinningMove} from '../helpers'

let game;

let sortMoves = (moveA, moveB) =>
{
	if (moveA[0] === moveB[0])
	{
		return moveB[1] - moveA[1];
	}

	return moveB[0] - moveA[0];
}

let checkMoves = (expected) =>
{
	let actual = game.getPossibleMoves().map((move) => [move.fromSquare.number, move.toSquare.number]);

	expect(actual.sort(sortMoves)).toEqual(expected.sort(sortMoves));

	return game;
}

beforeEach(() =>
{
	game = new Game;
});

test('possible moves', () =>
{
	checkMoves([[9, 13], [9, 14], [10, 14], [10, 15], [11, 15], [11, 16], [12, 16]]).move([10, 14])
	checkMoves([[21, 17], [22, 17], [22, 18], [23, 18], [23, 19], [24, 19], [24, 20]]).move([23, 18])
	checkMoves([[14, 23]]).move([14, 23])
	checkMoves([[26, 19], [27, 18]]).move([27, 18])
	checkMoves([[6, 10], [7, 10], [9, 13], [9, 14], [11, 15], [11, 16], [12, 16]]).move([9, 13])
	checkMoves([[18, 14], [18, 15], [21, 17], [22, 17], [24, 19], [24, 20], [26, 23], [31, 27], [32, 27]]).move([21, 17])
	checkMoves([[5, 9], [6, 9], [6, 10], [7, 10], [11, 15], [11, 16], [12, 16]]).move([6, 10])
	checkMoves([[17, 14], [18, 14], [18, 15], [24, 19], [24, 20], [25, 21], [26, 23], [31, 27], [32, 27]]).move([18, 14])
	checkMoves([[1, 6], [2, 6], [5, 9], [10, 15], [11, 15], [11, 16], [12, 16]]).move([2, 6])
	checkMoves([[14, 9], [22, 18], [24, 19], [24, 20], [25, 21], [26, 23], [31, 27], [32, 27]]).move([31, 27])
	checkMoves([[5, 9], [6, 9], [10, 15], [11, 15], [11, 16], [12, 16]]).move([11, 16])
	checkMoves([[14, 9], [22, 18], [24, 19], [24, 20], [25, 21], [26, 23], [27, 23]]).move([22, 18])
	checkMoves([[13, 22]]).move([13, 22])
	checkMoves([[22, 31]]).move([22, 31])
	checkMoves([[14, 9], [18, 15], [24, 19], [24, 20], [25, 21], [25, 22], [27, 23], [30, 26]]).move([24, 19])
	checkMoves([[10, 17], [16, 23], [31, 24]]).move([31, 24])
	checkMoves([[24, 15]]).move([24, 15])
	checkMoves([[15, 22]]).move([15, 22])
	checkMoves([[25, 18]]).move([25, 18])
	checkMoves([[10, 17]]).move([10, 17])
	checkMoves([[18, 14], [18, 15], [28, 24], [29, 25], [30, 25], [30, 26], [32, 27]]).move([29, 25])
	checkMoves([[5, 9], [6, 9], [6, 10], [7, 10], [7, 11], [8, 11], [16, 19], [16, 20], [17, 21], [17, 22]]).move([17, 21])
	checkMoves([[18, 14], [18, 15], [25, 22], [28, 24], [30, 26], [32, 27]]).move([30, 26])
	checkMoves([[21, 30]]).move([21, 30])
	checkMoves([[18, 14], [18, 15], [26, 22], [26, 23], [28, 24], [32, 27]]).move([18, 15])
	checkMoves([[30, 23]]).move([30, 23])
	checkMoves([[15, 10], [15, 11], [28, 24], [32, 27]]).move([15, 11])
	checkMoves([[8, 15]]).move([8, 15])
	checkMoves([[28, 24], [32, 27]]).move([28, 24])
	checkMoves([[3, 8], [4, 8], [5, 9], [6, 9], [6, 10], [7, 10], [7, 11], [15, 18], [15, 19], [16, 19], [16, 20], [23, 26], [23, 27], [23, 18], [23, 19]]).move([4, 8])
	checkMoves([[24, 19], [24, 20], [32, 27], [32, 28]]).move([24, 19])
	checkMoves([[15, 24]]).move([15, 24])
	checkMoves([[32, 27], [32, 28]]).move([32, 27])
	checkMoves([[23, 32], [24, 31]]).move([23, 32])
	checkMoves([])
});