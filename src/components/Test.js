import React, { Component } from 'react';
import { spring } from 'react-motion';
import FirstChild from './FirstChild';
import CustomStaggeredMotion from './CustomStaggeredMotion';
import Modal from './Modal';


class App extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false,
			phrases: ['Hello', 'world', '!']
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleToggle() {
		this.setState({ isVisible: !this.state.isVisible });
	}

	handleClose() {
		this.setState({ isVisible: false });
	}

	render() {
		const { isVisible, phrases } = this.state;
		const child = phrases.map((phrase, i) =>
			<p key={i}>{phrase}</p>
		);
		return(
			<div>
				<CustomStaggeredMotion 
					isVisible={isVisible}
					defaultStyles={{
						opacity: 0,
						y: 20
					}}
					from={{
						opacity: 0,
						y: spring(20, {stiffness: 270, damping: 5})
					}}
					to={{
						opacity: 1,
						y: spring(0, {stiffness: 270, damping: 5})
					}}
					interpolatedStyles={({opacity, y}) => ({
						opacity: opacity,
						transform: `translate3d(0, ${y}px, 0)`
					})}>
					{child}
				</CustomStaggeredMotion>
				<button onClick={this.handleToggle}>Toggle Visibility</button>
			</div>
		);
	}
}

export default App;