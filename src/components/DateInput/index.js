import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../HowLongAgo/utilities';

const AM = 'AM', PM = 'PM';

const DATE_REGEX = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/([1-9]\d{3})$/,
	TIME_REGEX = /^(0[1-9]|[1][012])\:([0-5][0-9])$/,
	MERIDIEM_REGEX = /^(AM|PM)$/;

const _dateStringPropType = (props, propName, componentName) => {
	if(!DATE_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be a String in the form of mm/dd/yyyy.`
		);
	}
}

const _timeStringPropType = (props, propName, componentName) => {
	if(!TIME_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be a String in the form of hh:mm.`
		);
	}
}

const _meridiemPropType = (props, propName, componentName) => {
	if(!MERIDIEM_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be either AM or PM.`
		);
	}
}

const defaultProps = {
	defaultDateString: '01/01/1000',
	defaultTimeString: '12:00',
	dateInputPlaceholder: 'mm/dd/yyyy',
	timeInputPlaceholder: 'hh:mm'
};

const propTypes = {
	onDateChange: PropTypes.func.isRequired,
	date: PropTypes.shape({
		dateString: _dateStringPropType,
		timeString: _timeStringPropType,
		meridiem: _meridiemPropType
	}).isRequired,
	defaultDateString: _dateStringPropType,
	defaultTimeString: _timeStringPropType,
	dateInputPlaceholder: PropTypes.string,
	timeInputPlaceholder: PropTypes.string
};

class DateInput extends Component {

	constructor() {
		super();

		this.state = {
			id: utils.getRandomInt(0, 100000)
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleDateKeyUp = this.handleDateKeyUp.bind(this);
		this.handleDateBlur = this.handleDateBlur.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleTimeKeyUp = this.handleTimeKeyUp.bind(this);
		this.handleTimeBlur = this.handleTimeBlur.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.handleTodayClick = this.handleTodayClick.bind(this);
		this.setDateString = this.setDateString.bind(this);
		this.setTimeString = this.setTimeString.bind(this);
		this.setMeridiem = this.setMeridiem.bind(this);
	}

	handleDateChange(e) {
		const dateString = utils.validateDateInput(e.target.value);
		this.setDateString(dateString);
	}

	handleTimeChange(e) {
		const timeString = utils.validateTimeInput(e.target.value);
		this.setTimeString(timeString);
	}

	handleMeridiemChange(e) {
		const meridiem = e.target.value;
		this.setMeridiem(meridiem);
	}

	handleTodayClick() {
		const dateString = utils.getCurrentDateString();
		const timeString = utils.getCurrentTimeString();
		const meridiem = utils.getCurrentTime().meridiem;

		this.props.onDateChange({ dateString, timeString, meridiem });
	}

	handleDateKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			const dateString = '';
			this.setDateString(dateString);
		}
	}

	handleDateBlur(e) {
		if(!DATE_REGEX.test(e.target.value)) {
			const dateString = this.props.defaultDateString;
			this.setDateString(dateString);
		}
	}

	handleTimeKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			const timeString = '';
			this.setTimeString(timeString);
		}
	}

	handleTimeBlur(e) {
		if(!TIME_REGEX.test(e.target.value)) {
			const timeString = this.props.defaultTimeString;
			this.setTimeString(timeString);
		}
	}

	setDateString(dateString) {
		this.props.onDateChange({
			...this.props.date,
			dateString
		});
	}

	setTimeString(timeString) {
		this.props.onDateChange({
			...this.props.date,
			timeString
		});
	}

	setMeridiem(meridiem) {
		this.props.onDateChange({
			...this.props.date,
			meridiem
		});
	}

	render() {
		const { date, dateInputPlaceholder, timeInputPlaceholder } = this.props;
		const { dateString, timeString, meridiem } = date;
		const { id } = this.state;

		return(
			<div className="l-row">
				<div className="l-col-xs-12-of-12 l-col-sm-2-of-12">
					<button type="button" onClick={this.handleTodayClick}>Today</button>
				</div>
				<div className="l-col-xs-12-of-12 l-col-sm-5-of-12">
					<label htmlFor={`date-${id}`}>Date</label>
					<input 
						type="text" 
						maxLength="10"
						id={`date-${id}`} 
						placeholder={dateInputPlaceholder}
						value={dateString}
						onKeyUp={this.handleDateKeyUp}
						onChange={this.handleDateChange}
						onBlur={this.handleDateBlur}
					/>
				</div>
				<div className="l-col-xs-12-of-12 l-col-sm-5-of-12">
					<div className="l-col-xs-12-of-12">
						<label htmlFor={`time-${id}`}>Time</label>
						<input 
							type="text" 
							maxLength="5"
							id={`time-${id}`} 
							placeholder={timeInputPlaceholder}
							value={timeString}
							onKeyUp={this.handleTimeKeyUp}
							onChange={this.handleTimeChange}
							onBlur={this.handleTimeBlur}
						/>
						<label htmlFor={`am-${id}`}>
							AM
							<input
								type="radio"
								id={`am-${id}`}
								name={`meridiem-${id}`}
								value={AM}
								onChange={this.handleMeridiemChange}
								checked={meridiem === AM}
							/>
						</label>

						<label htmlFor={`pm-${id}`}>
							PM
							<input
								type="radio"
								id={`pm-${id}`}
								name={`meridiem-${id}`}
								value={PM}
								onChange={this.handleMeridiemChange}
								checked={meridiem === PM}
							/>
						</label>
					</div>
				</div>
			</div>
		);
	}

}

export default DateInput;