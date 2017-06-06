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
			<div>
				<Switch 
					name="switcheroo"
					labels={['AM', 'PM']}
					onChange={this.handleChange}
					value={this.state.value}
				/>
				<button onClick={() => {
					this.handleChange(false);
				}}>Change</button>
			</div>
		);
	}
}

export default Test;