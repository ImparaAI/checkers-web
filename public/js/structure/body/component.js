import "./style.scss"
import Header from "./header/component"
import Home from "../../home/component"
import React, { Component } from "react"
import { Route } from "react-router-dom"
import GameUI from "../../game/ui/component"
import Retrain from "../../training/retrain/component"
import TrainingSessions from "../../training/sessions/component"

class Body extends Component {
	render()
	{
		return (
			<div className="cmp-body">
				<Header />

				<Route exact path="/" component={Home}/>
				<Route path="/play" component={GameUI}/>
				<Route path="/sessions" component={TrainingSessions}/>
				<Route path="/training/session/restart" component={Retrain}/>
			</div>
		);
	}
}

export default Body;