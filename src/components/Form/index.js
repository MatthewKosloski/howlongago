import React from 'react';
import PropTypes from 'prop-types';

import DateInput from '../DateInput';

const propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onDateChange: PropTypes.func.isRequired,
	dates: PropTypes.arrayOf(PropTypes.object)
};

const Form = (props) => {
	return(
		<form onSubmit={props.onSubmit}>
			{props.dates.map((date, i) =>
				<DateInput
					key={i}
					date={date}
					onDateChange={props.onDateChange.bind(null, i)}
				/>
			)}
			<div className="l-row">
				<div className="l-col-xs-12-of-12">
					<button type="submit">Submit</button>
				</div>
			</div>
		</form>
	);
}

Form.propTypes = propTypes;

export default Form;