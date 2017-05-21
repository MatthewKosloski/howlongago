import React, { PropTypes, Component } from 'react';
import * as utils from './utilities.js';
import s from './style.scss';

const AM = 'AM', PM = 'PM';

class howLongAgo extends Component {

	constructor() {
		super();

		this.state = {
			dateString: '10/17/1997', // utils.getCurrentDateString()
			timeString: '02:50', // utils.getCurrentTimeString()
			meridiem: 'AM', // utils.getCurrentTime().meridiem
			data: null
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleDateKeyUp = this.handleDateKeyUp.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleTimeKeyUp = this.handleTimeKeyUp.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleDateChange(e) {
		const dateString = utils.validateDateInput(e.target.value);
		this.setState({ dateString });
	}

	handleDateKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			const dateString = '';
			this.setState({ dateString });
		}
	}

	handleTimeChange(e) {
		const timeString = utils.validateTimeInput(e.target.value);
		this.setState({ timeString });
	}

	handleTimeKeyUp(e) {
		if(e.which === 8) {
			e.target.value = '';
			const timeString = '';
			this.setState({ timeString });
		}
	}

	handleMeridiemChange(e) {
		const meridiem = e.target.value;
		this.setState({ meridiem });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const { dateString, timeString, meridiem } = this.state;

		const date = utils.deconstructDateString(dateString); // MM/DD/YYYY -> {mm, dd, yy}
		const time = utils.deconstructTimeString(timeString); // hh:mm -> {hh, mm}
		const time24 = utils.toTwentyFourHours(String(time.hours), String(time.minutes), meridiem);

		const { year, month, day } = date;
		const { hours, minutes } = time24;

		const dateObj = new Date(year, month - 1, day, hours, minutes);

		const data = utils.getTimeSince(dateObj);

		this.setState({ data });
	}

	render() {

		const { dateString, timeString, meridiem, data} = this.state;

		let dataNodes;

		if(data) {
			dataNodes = Object.keys(data).map((key) => {
				return(
					<div key={key} className="l-col-xs-4-of-12">
						<h3>{key}</h3>
						<p>{data[key].toLocaleString()}</p>
					</div>
				);
			});
		}

		return(
			<div className="container">
				<div className="l-row">
					<div className="l-col-xs-12-of-12">
						<h1>How long since...</h1>
					</div>
				</div>
				<div className="l-row">
					<div className="l-col-xs-12-of-12">
						<form onSubmit={this.handleFormSubmit}>
							<div className="l-row">
								<div className="l-col-xs-12-of-12 l-col-sm-6-of-12">
									<label className={s.blockLabel} htmlFor="dateInput">Date (mm/dd/yyyy):</label>
									<input 
										type="text" 
										id="dateInput" 
										ref="dateInput"
										placeholder="mm/dd/yyyy"
										maxLength="10"
										value={dateString}
										onKeyUp={this.handleDateKeyUp}
										onChange={this.handleDateChange}
									/>
								</div>
								<div className="l-col-xs-12-of-12 l-col-sm-6-of-12">
									<div className="l-col-xs-12-of-12">
										<label className={s.blockLabel} htmlFor="dateInput">Time (hh:mm):</label>
										<input 
											type="text" 
											id="timeInput" 
											ref="timeInput"
											placeholder="hh:mm"
											maxLength="5"
											value={timeString}
											onKeyUp={this.handleTimeKeyUp}
											onChange={this.handleTimeChange}
										/>
										<label htmlFor="am">
											AM
											<input
												type="radio"
												id="am"
												name="meridiem"
												value={AM}
												onChange={this.handleMeridiemChange}
												checked={meridiem === AM}
											/>
										</label>

										<label htmlFor="pm">
											PM
											<input
												type="radio"
												id="pm"
												name="meridiem"
												value={PM}
												onChange={this.handleMeridiemChange}
												checked={meridiem === PM}
											/>
										</label>
									</div>
								</div>
							</div>
							<div className="l-row">
								<div className="l-col-xs-12-of-12">
									<button type="submit">Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				{data && 
					<div className="l-row">
						{dataNodes}
					</div>
				}
			</div>
		);
	}
}

export default howLongAgo;