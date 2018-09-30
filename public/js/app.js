import React from 'react'
import ReactDOM from "react-dom";
import Body from "./structure/body/component"
import { BrowserRouter } from 'react-router-dom'
import "../sass/style.scss"

const element = (
	<BrowserRouter>
		<Body/>
	</BrowserRouter>
);

ReactDOM.render(
  element,
  document.getElementById('app')
);