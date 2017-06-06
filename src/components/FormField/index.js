import React, { Component } from 'react';

class FormField extends Component {

	constructor() {
		super();
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	/*
	* Clear the field when user hits the backspace key
	*/
	handleKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			this.handleOnChange(e.target.value);
		}
	}

	/*
	* If the value inside the text field does not
	* match the provided regular expression when focus
	* is removed, replace the value with the provided default.
	*
	* Example: Pasting in an invalid string and hitting submit
	*/
	handleBlur(e) {
		const { regex, onChange, defaultValue } = this.props;
		if(!regex.test(e.target.value)) {
			e.target.value = defaultValue;
			this.handleOnChange(e.target.value);
		}
	}

	handleChange(e) {
		this.handleOnChange(e.target.value);
	}

	handleOnChange(val) {
		this.props.onChange(val);
	}

	render() {
		const { id, label, length, placeholder, value } = this.props;
		return(
			<div>
				<label 
					htmlFor={id}>
					{label}
				</label>
				<input 
					type="text" 
					id={id} 
					maxLength={length}
					value={value}
					placeholder={placeholder}
					onKeyUp={this.handleKeyUp}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
};

export default FormField;