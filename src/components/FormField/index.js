import React, { Component } from 'react';
import s from './style.scss';

class FormField extends Component {

	constructor() {
		super();
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// clear the field when user hits the backspace key
	handleKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			this.props.onChange(e.target.value);
		}
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		const { id, label, length, placeholder, value, isRequired, ariaLabel } = this.props;
		return(
			<div className={s.component}>

				<input type="text" 
					id={id} 
					maxLength={length}
					value={value}
					onKeyUp={this.handleKeyUp}
					onChange={this.handleChange}
					className={s.componentInput} 
					required={isRequired}
					aria-required={isRequired}
					aria-label={ariaLabel}
				/>
				<label 
					aria-hidden="true"
					className={s.componentLabel} 
					htmlFor={id}>
					{label}
				</label>
				<span className={s.componentStroke} aria-hidden="true"></span>
			</div>
		);
	}
};

export default FormField;