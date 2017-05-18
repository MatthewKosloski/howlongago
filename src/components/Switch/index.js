import React, {PropTypes, Component} from 'react';
import s from './style.scss';

class Switch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isChecked: props.value === props.checked
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({isChecked: !this.state.isChecked});
		this.props.onChange(e.target.checked);
	}

	render() {
		const {isChecked} = this.state;
		const {checked, unchecked} = this.props;

		return(
			<div className={s.switch}>
				<input 
					type="checkbox" 
					id={s.checkbox}
					onChange={this.onChange} 
					checked={isChecked}
				/>
				<label 
					htmlFor={s.checkbox}>
					<div 
						className={s.toggle} 
						data-checked={checked} 
						data-unchecked={unchecked}>
					</div>
				</label>
			</div>
		);
	}
}

export default Switch;