import React, { Component } from 'react';

import defaultProps from './defaultProps';
import propTypes from './propTypes';
import s from './style.scss';

class Switch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isChecked: props.value
		};
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(this.state.isChecked !== nextProps.value) {
			this.setState({ isChecked: nextProps.value });
		}
	}

	onChange(e) {
		this.setState({isChecked: !this.state.isChecked});
		this.props.onChange(e.target.checked);
	}

	render() {
		const { isChecked } = this.state;
		const { labels, name } = this.props;
		const [ label1, label2 ] = labels;

		return(
			<div className={s.switch}>
				<input 
					type="checkbox" 
					id={name}
					name={name}
					className={`${s.checkbox} ${s.srOnly}`}
					onChange={this.onChange} 
					checked={isChecked}
					tabIndex="1"
				/>
				<label 
					htmlFor={name}>
					<div 
						className={s.toggle} 
						data-checked={label1} 
						data-unchecked={label2}>
					</div>
				</label>
			</div>
		);
	}
}

Switch.defaultProps = defaultProps;
Switch.propTypes = propTypes;

export default Switch;