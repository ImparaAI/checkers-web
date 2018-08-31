import Player from "./Player";
import Game from "../Game";
import Move from "../Move";
import Man from "../pieces/Man";

class AlphaBetaPlayer extends Player {

	constructor(searchDepth)
	{
		super();

		this.infinity = 999999;
		this.searchDepth = searchDepth;
	}

	move(game)
	{
		let moves = game.board.getPlayerMoves(this),
			bestScore = -this.infinity,
			bestMoves = [];

		if (moves.length === 1)
			return Promise.resolve(moves[0]);

		for (var i = 0; i < moves.length; i++)
		{
			let move = moves[i],
				currentGame = this.cloneGame(game),
				score = null;

			currentGame.move(this.cloneMove(currentGame, move));

			score = this.alphaBetaSearch(currentGame, this.searchDepth, -this.infinity, this.infinity);

			if (score === bestScore)
			{
				bestMoves.push(move);
			}

			else if (score > bestScore)
			{
				bestScore = score;
				bestMoves = [move];
			}
		}

		return Promise.resolve(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
	}

	alphaBetaSearch(game, searchDepth, a, b)
	{
		if (searchDepth === 0 || game.gameOver)
		{
			return this.evaluate(game);
		}

		if (game.currentPlayer.number === this.number)
		{
			return this.searchMyMoves(game, searchDepth, a, b);
		}

		return this.searchOpponentMoves(game, searchDepth, a, b);
	}

	searchMyMoves(game, searchDepth, a, b)
	{
		let value = -this.infinity,
			children = this.buildChilden(game);

		for (var i = 0; i < children.length; i++)
		{
			value = Math.max(value, this.alphaBetaSearch(children[i], searchDepth - 1, a, b));

			a = Math.max(a, value);

			if (a >= b)
				break;
		}

		return value;
	}

	searchOpponentMoves(game, searchDepth, a, b)
	{
		let value = this.infinity,
			children = this.buildChilden(game);

		for (var i = 0; i < children.length; i++)
		{
			value = Math.min(value, this.alphaBetaSearch(children[i], searchDepth - 1, a, b));
			b = Math.min(b, value);

			if (a >= b)
				break;
		}

		return value;
	}

	buildChilden(game)
	{
		let childGames = [],
		    moves = game.board.getPlayerMoves(game.currentPlayer);

		for (var i = 0; i < moves.length; i++)
		{
			let currentGame = this.cloneGame(game);

			currentGame.move(this.cloneMove(currentGame, moves[i]));

			childGames.push(currentGame);
		}

		return childGames;
	}

	evaluate(game)
	{
		let score = 0;

		game.board.iteratePieces(null, (piece) =>
		{
			let mulitplier = piece.belongsToPlayerNumber(this.number) ?  1 : -1;

			score += mulitplier * (piece instanceof Man ? 1 : 1.4);
		});

		return score;
	}

	cloneGame(game)
	{
		let newGame = new Game();

		for (var i = 0; i < game.board.moveHistory.length; i++)
		{
			let move = game.board.moveHistory[i],
				fromSquare = newGame.board.squares[move.fromSquare.row][move.fromSquare.column],
				toSquare = newGame.board.squares[move.toSquare.row][move.toSquare.column],
				piece =  fromSquare.piece;

			newGame.move(this.cloneMove(newGame, move));
		}

		return newGame;
	}

	cloneMove(game, move)
	{
		let fromSquare = game.board.squares[move.fromSquare.row][move.fromSquare.column],
			toSquare = game.board.squares[move.toSquare.row][move.toSquare.column],
			piece =  fromSquare.piece;

		return new Move(piece, fromSquare, toSquare);
	}

}

export default AlphaBetaPlayer;