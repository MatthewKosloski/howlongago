import React, { Component } from 'react';

import { getCurrentDateString, getCurrentTimeString, getCurrentTime } from '../HowLongAgo/utilities';
import * as constants from './constants';
import * as utils from './utilities';
import defaultProps from './defaultProps';
import propTypes from './propTypes';
import Switch from '../Switch';
import FormField from '../FormField';

const CHECKED_LABEL = constants.AM,
	UNCHECKED_LABEL = constants.PM;

class DateInput extends Component {

	constructor() {
		super();

		this.state = {
			id: utils.getRandomInt(0, 100000)
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.handleTodayClick = this.handleTodayClick.bind(this);
	}

	handleDateChange(date) {
		const dateString = utils.validateDateInput(date);
		this.props.onDateChange({
			...this.props.date,
			dateString
		});
	}

	handleTimeChange(time) {
		const timeString = utils.validateTimeInput(time);
		this.props.onDateChange({
			...this.props.date,
			timeString
		});
	}

	handleMeridiemChange(isChecked) {
		const meridiem = isChecked 
		? CHECKED_LABEL 
		: UNCHECKED_LABEL;

		this.props.onDateChange({
			...this.props.date,
			meridiem
		});
	}

	handleTodayClick() {
		const dateString = getCurrentDateString();
		const timeString = getCurrentTimeString();
		const meridiem = getCurrentTime().meridiem;

		this.props.onDateChange({ dateString, timeString, meridiem });
	}

	render() {
		const { date, defaultDateString, defaultTimeString, dateInputPlaceholder, timeInputPlaceholder } = this.props;
		const { dateString, timeString, meridiem } = date;
		const { id } = this.state;

		return(
			<div className="l-row">

				<div className="l-col-xs-12-of-12 l-col-sm-2-of-12">
					<button type="button" onClick={this.handleTodayClick}>Today</button>
				</div>

				<div className="l-col-xs-12-of-12 l-col-sm-5-of-12">
					<FormField
						id={`date-${id}`}
						label="Date"
						length="10"
						placeholder={dateInputPlaceholder}
						value={dateString}
						defaultValue={defaultDateString}
						onChange={this.handleDateChange}
						regex={constants.DATE_REGEX}
					/>
				</div>

				<div className="l-col-xs-12-of-12 l-col-sm-5-of-12">
					<FormField
						id={`time-${id}`}
						label="Time"
						length="5"
						placeholder={timeInputPlaceholder}
						value={timeString}
						defaultValue={defaultTimeString}
						onChange={this.handleTimeChange}
						regex={constants.TIME_REGEX}
					/>
					<Switch
						name={`meridiem-${id}`}
						labels={[CHECKED_LABEL, UNCHECKED_LABEL]}
						onChange={this.handleMeridiemChange}
						value={meridiem === CHECKED_LABEL}
					/>
				</div>

			</div>
		);
	}

}

DateInput.defaultProps = defaultProps;
DateInput.propTypes = propTypes;

export default DateInput;