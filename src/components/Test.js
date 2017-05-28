import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AccessibleModal from './AccessibleModal';
import FirstChild from './FirstChild';
import fadeIn from './fadeIn';
import fadeInUp from './fadeInUp';
import s from './AccessibleModal/style';

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
							<p>I am a child!</p>
						</AccessibleModal>
					: null}
				</TransitionGroup>

				<button onClick={this.handleToggle}>Toggle Modal</button>
			</div>
		);
	}
}

export default Test;