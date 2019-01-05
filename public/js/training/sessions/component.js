import "./style.scss"
import axios from 'axios'
import moment from 'moment'
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
							<th>Limit (sec)</th>
							<th>Episodes</th>
							<th>Created</th>
							<th>Started</th>
							<th>Last Trained</th>
							<th>Ended</th>
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
				<td className="cmp-sessions__row-name">{session.name}</td>
				<td>{session.secondsLimit}</td>
				<td>{session.episodeCount}</td>
				<td title={this.formatDate(session.createdAt)}>{this.formatDateFromNow(session.createdAt)}</td>
				<td title={this.formatDate(session.startTime)}>{this.formatDateFromNow(session.startTime)}</td>
				<td title={this.formatDate(session.latestLessonTime)}>{this.formatDateFromNow(session.latestLessonTime)}</td>
				<td title={this.formatDate(session.endTime)}>{this.formatDateFromNow(session.endTime)}</td>
			</tr>
		));
	}

	loadSessions() {
		return axios.get('/training/sessions').then(response => this.setState({sessions: response.data.sessions}));
	}

	formatDate(value) {
		if (!value)
			return '-';

		return moment.utc(value).local().format('LLL');
	}

	formatDateFromNow(value) {
		if (!value)
			return '-';

		return moment.utc(value).local().calendar();
	}
}

export default TrainingSessions;