import React, { Component } from 'react';

class Parent extends Component {

	constructor() {
		super();
		this.state = {
			value: 'foo'
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.setState({ value });
	}

	render() {
		return(
			<Child value={this.state.value} onChange={this.handleChange}/>
		)
	}

}

class Child extends Component {

	constructor() {
		super();
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	setValue(value) {
		this.props.onChange(value);
	}

	handleChange(e) {
		const { value } = e.target;
		this.setValue(value);
	}

	handleButtonClick() {
		this.setValue('bar');
	}

	render() {
		return(
			<div>
				<button onClick={this.handleButtonClick}>"bar"</button>
				<input type="text" value={this.props.value} onChange={this.handleChange}/>
			</div>
		)
	}

}

export default Parent;