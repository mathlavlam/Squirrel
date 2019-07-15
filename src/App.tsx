import React from 'react';
import Calculator from './Calculator/Calculator';
import './App.scss';

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<div className="App">
				<Calculator/>
			</div>
		);
	}
}
