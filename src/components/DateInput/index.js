import React, { Component } from 'react';

import propTypes from './propTypes';
import Switch from '../Switch';
import FormField from '../FormField';

import { AM as CHECKED_LABEL, PM as UNCHECKED_LABEL } from './constants';
import * as utils from './utilities';
import defaultProps from './defaultProps';
import s from './style';

class DateInput extends Component {

	constructor() {
		super();

		this.state = {
			id: utils.getRandomInt(0, 99999) // unique integer for input id
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.handleTodayClick = this.handleTodayClick.bind(this);
		this._onDateChange = this._onDateChange.bind(this);
	}

	handleDateChange(date) {
		const dateString = utils.validateDateInput(date); // validates input while typing
		this._onDateChange({
			...this.props.date,
			dateString
		});
	}

	handleTimeChange(time) {
		const timeString = utils.validateTimeInput(time); // validates input while typing
		this._onDateChange({
			...this.props.date,
			timeString
		});
	}

	handleMeridiemChange(isChecked) {
		const meridiem = isChecked 
		? CHECKED_LABEL 
		: UNCHECKED_LABEL;

		this._onDateChange({
			...this.props.date,
			meridiem
		});
	}

	handleTodayClick() {
		this.props.onTodayClick();
	}

	_onDateChange(date) {
		// set isToday to false if user is typing in input fields
		if(date.isToday) date.isToday = false;

		this.props.onDateChange(date);
	}

	render() {
		const { date, defaultDateString, defaultTimeString, dateInputPlaceholder, timeInputPlaceholder } = this.props;
		const { dateString, timeString, meridiem, isToday } = date;
		const { id } = this.state;

		return(
			<div className={`l-row ${s.container}`}>
				<div className="l-col-xs-12-of-12 l-col-md-7-of-12">
					<div className="l-row">
						<div className={`${s.formField} l-col-xs-12-of-12 l-col-sm-6-of-12`}>
							<FormField
								id={`date-${id}`}
								label={dateInputPlaceholder}
								length="10"
								placeholder={dateInputPlaceholder}
								value={dateString}
								defaultValue={defaultDateString}
								onChange={this.handleDateChange}
								ariaLabel="Date in the form of MM/DD/YYYY"
								isRequired={true}
							/>
						</div>
						<div className={`${s.formField} l-col-xs-12-of-12 l-col-sm-6-of-12`}>
							<FormField
								id={`time-${id}`}
								label={timeInputPlaceholder}
								length="5"
								placeholder={timeInputPlaceholder}
								value={timeString}
								defaultValue={defaultTimeString}
								onChange={this.handleTimeChange}
								ariaLabel="Time in the form of HH:MM"
								isRequired={true}
							/>
						</div>
					</div>
				</div>
				<div className="l-col-xs-12-of-12 l-col-md-5-of-12">
					<div className="l-row">
						<div className={`${s.switch} l-col-xs-12-of-12 l-col-sm-6-of-12`}>
							<Switch
								name={`meridiem-${id}`}
								labels={[CHECKED_LABEL, UNCHECKED_LABEL]}
								onChange={this.handleMeridiemChange}
								value={meridiem === CHECKED_LABEL}
							/>
						</div>
						<div className="l-col-xs-12-of-12 l-col-sm-6-of-12">
							<button 
								type="button" 
								className={`btn btn--default btn--full-width ${isToday ? 'btn--active' : ''}`}
								onClick={this.handleTodayClick}>
								Today
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

DateInput.defaultProps = defaultProps;
DateInput.propTypes = propTypes;

export default DateInput;