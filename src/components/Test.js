import React, { Component } from 'react';
import Switch from './Switch';

class Test extends Component {
	constructor() {
		super();
		this.state = {
			value: true
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.setState({ value });
	}

	render() {
		return(
			<Switch 
				labels={['AM', 'PM']}
				onChange={this.handleChange}
				value={this.state.value}
			/>
		);
	}
}

export default Test;