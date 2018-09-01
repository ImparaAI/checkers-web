export function testNonWinningMoves(game, moves)
{
	moves.forEach((move) =>
	{
		game.move(move);

		expect(game.gameOver).toBe(false);
	});
};

export function testWinningMove(game, move)
{
	game.move(move);

	expect(game.gameOver).toBe(true);
};