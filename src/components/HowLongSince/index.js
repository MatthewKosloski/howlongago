import React, { PropTypes, Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from '../TimePicker';
import moment from 'moment';
import s from './style.scss';

class howLongSince extends Component {

	constructor() {
		super();
		this.state = {
			date: moment().subtract(1, 'years'),
			data: null
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleHoursChange = this.handleHoursChange.bind(this);
		this.handleMinutesChange = this.handleMinutesChange.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.getData = this.getData.bind(this);
		this.setData = this.setData.bind(this);
		this.startRepeat = this.startRepeat.bind(this);
		this.stopRepeat = this.stopRepeat.bind(this);
		this.repeat = this.repeat.bind(this);
	}

	componentWillMount() {

		this.getData();
	}

	componentDidMount() {

		this.startRepeat();
	}

	componentWillUnmount() {

		this.stopRepeat();
	}

	startRepeat() {

		if(!this.frameId) this.frameId = window.requestAnimationFrame(this.repeat);
	}

	stopRepeat() {

		window.cancelAnimationFrame(this.frameId);
	}

	repeat() {
		this.getData();

		// next iteration
		this.frameId = window.requestAnimationFrame(this.repeat);
	}

	getTimeSince(date) {
		const _toNum = (num) => +num,
			_hundredths = (num) => _toNum((num).toFixed(2));

		const present = new Date();

		const milliseconds = present - date.getTime(),
			seconds = _hundredths(milliseconds / 1000),
			//jiffies = _hundredths(seconds / 0.01),
			minutes = _hundredths(seconds / 60),
			//kiloseconds = _hundredths(seconds / 1000),
			hours = _hundredths(minutes / 60),
			moments = _hundredths(hours / 0.025),
			days = _hundredths(hours / 24),
			weeks = _hundredths(days / 7),
			fortnights = _hundredths(weeks / 2),
			//megaseconds = _hundredths(seconds / 1000000),
			months = _hundredths(weeks / 4.35),
			years = _hundredths(months / 12),
			decades = _hundredths(years / 10),
			centuries = _hundredths(decades / 10);
			//milennia = _hundredths(centuries / 10);

		return {
			milliseconds,
			seconds,
			minutes,
			hours,
			moments,
			days,
			weeks,
			fortnights,
			months,
			years,
			decades,
			centuries,
			//milennia,
			//jiffies,
			//kiloseconds,
			//megaseconds,
		}
	}

	toTwentyFourHours(hours, minutes, meridiem) {

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

	handleDateChange(date) {
		this.setState({ date });
		this.getData();
	}

	handleHoursChange(hours) {
		this.setState({ hours });
		this.getData();
	}

	handleMinutesChange(minutes) {
		this.setState({ minutes });
		this.getData();
	}

	handleMeridiemChange(meridiem) {
		this.setState({ meridiem });
		this.getData();
	}

	getData() {
		const {date} = this.state;

		const yr = date.year(),
			mnth = date.month(),
			day = date.date(),
			hrs = date.hours(),
			mins = date.minutes();

		let data = this.getTimeSince(new Date(yr, mnth, day, hrs, mins));

		this.setData(data);
	}

	setData(data) {

		this.setState({ data });
	}

	render() {

		const {state, handleDateChange, handleHoursChange, 
			handleMinutesChange, handleMeridiemChange} = this;
		const {date, data} = state;

		const title = `Time elapsed since ${date.format('dddd, MMMM Do, gggg [at] hh:mm A')}`;

		const dataItems = Object.keys(data).map((key) => {
			return(
				<div className="l-col-xs-12-of-12 l-col-sm-6-of-12 l-col-md-4-of-12" key={key} style={{marginTop: '32px'}}>
					<h2 style={{fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: '#666'}}>{key}</h2>
					<p style={{fontSize: '32px'}}>{data[key].toLocaleString()}</p>
				</div>
			);
		});

		return(
			<div className="container">
				<div className="l-row">
					<div className="l-col-xs-12-of-12">
						<p className={s.title}>{title}</p>
					</div>
				</div>
				<div className="l-row">
					<div className="l-col-xs-12-of-12 l-col-md-6-of-12">
						<h3>Date:</h3>
						<DatePicker
						    selected={date}
						    onChange={handleDateChange}
						/>
					</div>
					<div className="l-col-xs-12-of-12 l-col-md-6-of-12">
						<h3>Time</h3>
						<TimePicker
							selected={date}
						/>
					</div>
				</div>
				<div className="l-row">
					{dataItems}
				</div>
			</div>
		);
	}
}

export default howLongSince;