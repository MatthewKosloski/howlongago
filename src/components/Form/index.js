import React from 'react';

import DateInput from '../DateInput';

const Form = (props) => {
	return(
		<form onSubmit={props.onSubmit}>
			{props.dates.map((date, i) =>
				<DateInput
					key={i}
					date={date}
					onDateChange={props.onDateChange.bind(null, `date${i+1}`)}
					onTimeChange={props.onTimeChange.bind(null, `date${i+1}`)}
					onMeridiemChange={props.onMeridiemChange.bind(null, `date${i+1}`)}
					onTodayClick={props.onTodayClick.bind(null, `date${i+1}`)}
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

export default Form;