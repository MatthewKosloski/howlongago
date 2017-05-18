import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Switch from '../Switch';
import s from './style.scss';

class TimePicker extends Component {

	constructor(props) {
		super(props);

		this.am = 'AM';
		this.pm = 'PM';

		this.state = {
			date: moment(props.selected),
			hours: null,
			minutes: null,
			meridiem: null,
			isTooltipVisible: false
		};		

		this.handleTooltipClick = this.handleTooltipClick.bind(this);
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
	}

	componentWillMount() {
		const { date } = this.state;
		const { hours, minutes, meridiem } = this.toTwelveHours(date.hours(), date.minutes());
		this.setState({ hours, minutes, meridiem });
	}

	/*
	*	@param {String} hours
	*	@param {String} minutes
	*	@param {String} meridiem
	*
	*	@return {Object} => {Number} hours, {Number} minutes
	*/
	toTwentyFourHours(hours = '00', minutes = '00', meridiem = this.am) {

		// remove 0 prefix from strings less than 10
		if(hours < 10) hours = hours.replace(/0/, '');
		if(minutes < 10) minutes = minutes.replace(/0/, '');

		// convert to Number
		hours = +hours;
		minutes = +minutes;

		// convert 12-hours to 24-hours
		if(meridiem === 'PM' && hours < 12) hours = hours+12;
		if(meridiem === 'AM' && hours === 12) hours = hours-12;

		return { hours, minutes };
	}

	/*
	*	@param {Number} hours
	*	@param {Number} minutes
	*
	*	@return {Object} => {String} hours, {String} minutes, {String} meridiem
	*/
	toTwelveHours(hours = 0, minutes = 0) {

		let meridiem;

		// convert 24-hours to 12-hours
		if(hours >= 12) {
			hours = hours - 12;
			meridiem = 'PM';
		} else if(hours === 0){
			hours = 12;
			meridiem = 'AM';
		} else {
			meridiem = 'AM';
		}

		// add 0 prefix to strings less than 10, else convert to String
		if(hours < 10) {
			hours = '0' + hours;
		} else {
			hours = hours + '';
		}

		if(minutes < 10) {
			minutes = '0' + minutes;
		} else {
			minutes = minutes + '';
		}

		return { hours, minutes, meridiem};
	}

	handleTooltipClick() {
		const { isTooltipVisible } = this.state;
		this.setState({ isTooltipVisible: !isTooltipVisible});
	}

	handleHoursChange(e) {
		const hours = e.target.value.replace(/[^0-9]/, '');

		console.log(hours, this.toTwentyFourHours(hours, '00', this.state.meridiem).hours);
		// const date = this.state.date.hours(this.toTwentyFourHours(hours, '00', this.state.meridiem));

		this.setState({ hours });
	}

	handleMinutesChange(e) {
		const minutes = e.target.value.replace(/[^0-9]/, '');
		const date = this.state.date.minutes(this.toTwentyFourHours(minutes, '00', this.state.meridiem));
		
		this.setState({ date, minutes });
	}

	handleMeridiemChange(isMorning) {
		const meridiem = isMorning ? this.am : this.pm;
		this.setState({ meridiem });
	}


	render() {

		const { date, hours, minutes, meridiem, isTooltipVisible } = this.state;
		const hhmm = `${hours || '00'}:${minutes || '00'} ${meridiem}`;

		return(
			<div className={s.component}>

				<p>Date object: {`${date.hours()} ${date.minutes()}`}</p>

				<p className={s.hhmm} onClick={this.handleTooltipClick}>{hhmm}</p>

				<div className={`${s.tooltipOuter} ${isTooltipVisible ? s.tooltipOuterIsOpen : ''}`}>
					<div className={s.tooltip}>
						<div className={s.tooltipInner}>
							<div className={s.timeInput}>
								<input 
									type="text"
									maxLength="2" 
									placeholder="hh"
									className={s.numberInput} 
									value={hours}
									onChange={this.handleHoursChange}
								/>
								<span className={s.delimiter}>:</span>
								<input 
									type="text"
									maxLength="2" 
									placeholder="mm"
									className={s.numberInput} 
									value={minutes}
									onChange={this.handleMinutesChange}
								/>
							</div>
							<Switch 
								checked={this.am} 
								unchecked={this.pm}
								value={meridiem}
								onChange={this.handleMeridiemChange} 
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default TimePicker;