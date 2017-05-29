import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AccessibleModal from './AccessibleModal';
import FirstChild from './FirstChild';

class Test extends Component {
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
						<AccessibleModal
							isOpen={isModalVisible}
							onClose={this.handleClose}
							ariaDescription="Description"
							ariaLabel="Title">
							<h1>Modal Title</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum veniam explicabo itaque dolore, omnis dolor debitis similique culpa pariatur aliquam.</p>
						</AccessibleModal>
					: null}
				</TransitionGroup>

				<button onClick={this.handleToggle}>Toggle Modal</button>
			</div>
		);
	}
}

export default Test;