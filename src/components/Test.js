import React, { Component } from 'react';
import AccessibleModal from './AccessibleModal';

class Test extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: true
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
		return(
			<div>
				{this.state.isVisible ?
					<AccessibleModal 
						isOpen={this.state.isVisible}
						onClose={this.handleClose}
						ariaLabel={"Label"}
						ariaDescription={"Description"}
						animationDuration={333}>
						<h1>Modal Title</h1>
						<p>Modal paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, quis!</p>
						<input type="text"/>
					</AccessibleModal> 
				: null}
				<button onClick={this.handleToggle}>Toggle modal</button>
			</div>
		);
	}
}

export default Test;