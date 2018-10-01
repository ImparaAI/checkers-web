import "./style.scss"
import axios from 'axios'
import React, { Component } from "react"

class Retrain extends Component {

	constructor(props)
	{
		super(props);
		this.state = {secondsLimit: 500};
	}

	render() {
		return (
			<div className="cmp-retrain">
				<div>
					<div><label>Seconds Limit</label></div>
					<div>
						<input
						   type="text"
						   value={this.state.secondsLimit}
						   onChange={this.handleSecondsLimitChange.bind(this)}/>
					</div>
				</div>
				<button onClick={this.retrain} className="c-button c-button--big c-button--gray">Retrain the AI</button>
			</div>
		);
	}

	handleSecondsLimitChange(event)
	{
		this.setState({secondsLimit: event.target.value});
	}

	retrain = () => {
		let data = {
			secondsLimit: this.state.secondsLimit,
		};

		return axios.post('/training/session', data).then(response => this.props.history.push('/sessions'));
	}
}

export default Retrain;