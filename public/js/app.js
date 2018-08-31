import React from 'react'
import ReactDOM from "react-dom";
import Body from "./structure/body/component"
import "../sass/style.scss"

const element = (
	<div>
		<Body/>
	</div>
);

ReactDOM.render(
  element,
  document.getElementById('app')
);