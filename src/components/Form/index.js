import React from 'react';

import propTypes from './propTypes';
import DateInput from '../DateInput';

const Form = (props) => {
	return(
		<form onSubmit={props.onSubmit}>
			{props.dates.map((date, i) =>
				<DateInput
					key={i}
					date={date}
					onDateChange={props.onDateChange.bind(null, i)}
					onTodayClick={props.onTodayClick.bind(null, i)}
				/>
			)}
			<button 
				type="submit" 
				className="btn btn--blue btn--with-arrow" 
				disabled={!props.canSubmit} 
				aria-disabled={!props.canSubmit}>
				Submit
			</button>
		</form>
	);
}

Form.propTypes = propTypes;

export default Form;