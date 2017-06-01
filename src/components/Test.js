import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup'; 
import FirstChild from './FirstChild';
import Modal from './Modal';

import { Motion, TransitionMotion, spring } from 'react-motion';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isModalVisible: false
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleToggle() {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	handleClose() {
		this.setState({ isModalVisible: false });
	}

	render() {
		const { isModalVisible } = this.state;
		return(
			<div>
				<TransitionGroup component={FirstChild}>
					{isModalVisible ? 
						<Modal
							ariaLabel="Title"
							ariaDescription="Description"
							isOpen={isModalVisible}
							shouldCloseOnOverlayClick={true}
							shouldHideBodyOverflow={true}
							onClose={this.handleClose}>
							<h1>Dialog Title</h1>
							<p>This is an accessible dialog window built in React.</p>
							<form action="">
								<label htmlFor="field1">Some Label</label>
								<input type="text" id="field1" placeholder="Some field"/>
								<button type="submit">Submit</button>
							</form>
						</Modal>
					: null}
				</TransitionGroup>

				<button onClick={this.handleToggle}>Toggle Visibility</button>
			</div>
		);
	}
}

export default App;