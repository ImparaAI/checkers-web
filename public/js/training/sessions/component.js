import "./style.scss"
import axios from 'axios'
import React, { Component } from "react"

class TrainingSessions extends Component {

	constructor(props)
	{
		super(props);

		this.state = {
			sessions: [],
		};

		this.loadSessions();
	}

	render()
	{
		return (
			<div className="cmp-sessions">
				<table className="cmp-sessions__table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Seconds Limit</th>
							<th>Episodes</th>
							<th>Created</th>
							<th>Start Time</th>
							<th>End Time</th>
						</tr>
					</thead>
					<tbody>
						{this.buildRows()}
					</tbody>
				</table>
			</div>
		);
	}

	buildRows()
	{
		return this.state.sessions.map(session =>
		(
			<tr key={session.id} className="cmp-sessions__row">
				<td>{session.name}</td>
				<td>{session.secondsLimit}</td>
				<td>{session.episodeCount}</td>
				<td>{session.createdAt}</td>
				<td>{session.startTime}</td>
				<td>{session.endTime}</td>
			</tr>
		));
	}

	loadSessions() {
		return axios.get('/training/sessions').then(response => this.setState({sessions: response.data.sessions}));
	}
}

export default TrainingSessions;