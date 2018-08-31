import Player from "./Player";
import Game from "../Game";
import Move from "../Move";

class AlphaBetaPlayer extends Player {

	constructor(number)
	{
		super(number);

		this.infinity = 999999;
		this.positionsAnalyzed = 0;
	}

	move(game)
	{
		let moves = game.board.getPlayerMoves(this),
			bestScore = -this.infinity,
			bestMove = null;

		for (var i = 0; i < moves.length; i++)
		{
			let move = moves[i],
				currentGame = this.cloneGame(game),
				score = null;

			currentGame.move(this.cloneMove(currentGame, move));

			score = this.ab(currentGame, 8, -this.infinity, this.infinity);

			if (score > bestScore)
				bestMove = move;
		}

		console.log('positionsAnalyzed', this.positionsAnalyzed);

		return Promise.resolve(bestMove);
	}

	ab(game, depth, a, b)
	{
		this.positionsAnalyzed++;

		if (depth === 0 || game.gameOver)
		{
			return this.evaluate(game);
		}

		if (game.currentPlayer.number === this.number)
		{
			let value = -this.infinity,
				children = this.buildChilden(game);

			for (var i = 0; i < children.length; i++)
			{
				value = Math.max(value, this.ab(children[i], depth - 1, a, b, null));

				a = Math.max(a, value);

				if (a >= b)
					break;
			}

			return value;
		}

		else
		{
			let value = this.infinity,
				children = this.buildChilden(game);

			for (var i = 0; i < children.length; i++)
			{
				value = Math.min(value, this.ab(children[i], depth - 1, a, b, true));
				b = Math.min(b, value);

				if (a >= b)
					break;
			}

			return value;
		}
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
		let myPieceCount = game.board.countPieces(this.number),
			opponentPieceCount = game.board.countPieces(this.number === 1 ? 2 : 1);

		return myPieceCount - opponentPieceCount;
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