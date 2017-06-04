import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import FirstChild from '../FirstChild';
import Modal from '../Modal';
import DateInput from '../DateInput';
import Stagger from '../Stagger';
import * as utils from './utilities';
import s from './style.scss';

const AM = 'AM', PM = 'PM';

class howLongAgo extends Component {

	constructor() {
		super();

		this.state = {
			date1: {
				dateString: '10/17/1997',
				timeString: '02:50',
				meridiem: 'AM'
			},
			date2: {
				dateString: utils.getCurrentDateString(),
				timeString: utils.getCurrentTimeString(),
				meridiem: utils.getCurrentTime().meridiem
			},
			isModalOpen: false,
			data: null,
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
		this.handleTodayClick = this.handleTodayClick.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this._setData = this._setData.bind(this);
	}

	componentDidMount() {
		this.openModal();
	}

	handleDateChange(key, dateString) {
		let state = {};
		state[key] = { ...this.state[key], dateString };
		this.setState(state);
	}

	handleTimeChange(key, timeString) {
		let state = {};
		state[key] = { ...this.state[key], timeString };
		this.setState(state);
	}

	handleMeridiemChange(key, meridiem) {
		let state = {};
		state[key] = { ...this.state[key], meridiem };
		this.setState(state);
	}

	handleTodayClick(key, dateString, timeString, meridiem) {
		let state = {};
		state[key] = { ...this.state[key], dateString, timeString, meridiem };
		this.setState(state);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this._setData();
		this.closeModal();
	}

	handleModalClose() {
		this.closeModal();
	}

	openModal() {
		this.setState({isModalOpen: true});
	}

	closeModal() {
		this.setState({isModalOpen: false});
	}

	_setData() {
		const { date1, date2 } = this.state;
		this.setState({ data: utils.getDifferenceOfDates(date1, date2)});
	}

	render() {

		const { date1, date2, isModalOpen, data } = this.state;

		let dataNodes;

		if(data) {
			dataNodes = Object.keys(data).map((key) =>
				<div key={key} className="l-col-xs-4-of-12">
					<h3>{key}</h3>
					<p>{data[key].toLocaleString()}</p>
				</div>
			);
		}

		return(
			<div className="container">
				<TransitionGroup component={FirstChild}>
					{isModalOpen ?
						<Modal
							ariaLabel="Modal title goes here"
							ariaDescription="Modal description goes here"
							isOpen={isModalOpen}
							onClose={this.handleModalClose}>
							<form onSubmit={this.handleFormSubmit}>
								<DateInput
									dateLabelText="Date1" 
									timeLabelText="Time1"
									defaultDateString="01/01/1000"
									defaultTimeString="12:00"
									dateString={date1.dateString}
									timeString={date1.timeString}
									meridiem={date1.meridiem}
									onDateChange={this.handleDateChange.bind(null, 'date1')}
									onTimeChange={this.handleTimeChange.bind(null, 'date1')}
									onMeridiemChange={this.handleMeridiemChange.bind(null, 'date1')}
									onTodayClick={this.handleTodayClick.bind(null, 'date1')}
								/>
								<DateInput
									dateLabelText="Date2" 
									timeLabelText="Time2"
									defaultDateString="01/01/1000"
									defaultTimeString="12:00"
									dateString={date2.dateString}
									timeString={date2.timeString}
									meridiem={date2.meridiem}
									onDateChange={this.handleDateChange.bind(null, 'date2')}
									onTimeChange={this.handleTimeChange.bind(null, 'date2')}
									onMeridiemChange={this.handleMeridiemChange.bind(null, 'date2')}
									onTodayClick={this.handleTodayClick.bind(null, 'date2')}
								/>
								<div className="l-row">
									<div className="l-col-xs-12-of-12">
										<button type="submit">Submit</button>
									</div>
								</div>
							</form>
						</Modal>
					: null}
				</TransitionGroup>
				<TransitionGroup component={FirstChild}>
					{(data && !isModalOpen) ?
						<Stagger className="l-row">
							{dataNodes}
						</Stagger>
					: null}
				</TransitionGroup>
				<button onClick={this.openModal}>Again</button>
			</div>
		);
	}
}

export default howLongAgo;