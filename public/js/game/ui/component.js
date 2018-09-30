import "./style.scss"
import Game from "../Game"
import Move from "../Move"
import King from "../pieces/King"
import classNames from 'classnames';
import React, { Component } from "react"
import moveSound from "../sounds/move.wav"
import HttpPlayer from "../players/HttpPlayer"
import captureSound from "../sounds/capture.wav"
import HumanPlayer from "../players/HumanPlayer"
import AlphaBetaPlayer from "../players/AlphaBetaPlayer"

class GameUI extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			game: new Game(new HumanPlayer(), new HttpPlayer('/predict')),
			selectedPiece: null,
			availableMoves: [],
		};

		this.state.game.progress((this.updateOnMove).bind(this));
		this.moveSound = new Audio(moveSound);
		this.captureSound = new Audio(captureSound);
	}

	updateOnMove(move)
	{
		this.forceUpdate();

		move.isCapture ? this.captureSound.play() : this.moveSound.play();

		let promise = new Promise((resolve) => {
			setTimeout(() => resolve(), 250);
		});

		return promise;
	}

	render()
	{
		return (
			<div className="cmp-game-ui">
				<div className="cmp-game-ui__board u-unselectable">
					{this.buildRows()}
					{this.buildPieces()}
				</div>
				<div className="cmp-game-ui__move-history">
					{this.buildMoveHistory()}
				</div>
			</div>
		);
	}

	buildRows()
	{
		return this.state.game.board.squares.map((row, index) =>
		(
			<div key={index} className="cmp-game-ui__board-row c-flex">
				{this.buildSquares(row)}
			</div>
		));
	}

	buildSquares(row)
	{
		return row.map((square) =>
		{
			let classes = {
				'cmp-game-ui__square': true,
				'cmp-game-ui__square--dark': !!square.number
			};

			return ( <div key={square.id} className={classNames(classes)}
					      onClick={this.squareClicked.bind(this, square)}>

					<span className="cmp-game-ui__square-number">{square.number}</span>

					{this.buildMoveHint(square)}
				</div>
			);
		});
	}

	buildPieces()
	{
		return this.getOrderedPieces().map((piece) =>
		{
			let classes = [
				'cmp-game-ui__piece-container',
				'cmp-game-ui__piece-container--row-' + piece.square.row,
				'cmp-game-ui__piece-container--column-' + piece.square.column,
			];

			return (
				<div key={piece.id} className={classNames(classes)} onClick={this.squareClicked.bind(this, piece.square)}>
					{this.buildPiece(piece)}
				</div>
			);
		});
	}

	buildPiece(piece)
	{
		let classes = [
			'cmp-game-ui__piece',
			'cmp-game-ui__piece--' + (piece.isFirstPlayer ? 'first-player' : 'second-player'),
			{'cmp-game-ui__piece--selected': this.state.selectedPiece && this.state.selectedPiece.id === piece.id },
			{'cmp-game-ui__piece--king': piece instanceof King }
		];

		return <div className={classNames(classes)}></div>;
	}

	getOrderedPieces()
	{
		let pieces = [];

		this.state.game.board.iteratePieces(null, (piece) =>
		{
			pieces.push(piece);
		});

		return pieces.sort((a, b) => a.id - b.id);
	}

	buildMoveHint(square)
	{
		for (var i = this.state.availableMoves.length - 1; i >= 0; i--)
		{
			if (this.state.availableMoves[i].toSquare.number === square.number)
			{
				return (
					<div className="cmp-game-ui__move-hint-container">
						<div className="cmp-game-ui__move-hint"></div>
					</div>
				);

			}
		}
	}

	buildMoveHistory()
	{
		return this.state.game.board.moveHistory.map((move, index) =>
		{
			return (
				<span key={index} className="cmp-game-ui__move-history-move">
					[{move.fromSquare.number}, {move.toSquare.number}],
				</span>
			);
		});
	}

	squareClicked(square)
	{
		if (square.piece)
		{
			if (square.piece.belongsToPlayerNumber(this.state.game.currentPlayer.number) && square.piece.getMoves().length)
			{
				this.setState({
					selectedPiece: square.piece,
					availableMoves: square.piece.getMoves(),
				});
			}
		}

		else if (this.state.selectedPiece && this.state.selectedPiece.canMoveTo(square))
		{
			let player = this.state.game.getOwnerPlayer(this.state.selectedPiece);

			player.promise.then((move) =>
			{
				if (move.isCapture && move.piece.getCaptureMoves().length)
				{
					this.setState({availableMoves: move.piece.getMoves()})
				}

				else
					this.setState({selectedPiece: null, availableMoves: []})
			});

			player.handleMoveRequest(new Move(this.state.selectedPiece, this.state.selectedPiece.square, square));
		}

	}

}

export default GameUI;