import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import FirstChild from '../FirstChild';
import Modal from '../Modal';
import Form from '../Form';
import Stagger from '../Stagger';
import * as utils from './utilities';
import s from './style.scss';

const AM = 'AM', PM = 'PM';

class HowLongAgo extends Component {

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
		this.setState({
			[key]: {
				...this.state[key],
				dateString
			}
		});
	}

	handleTimeChange(key, timeString) {
		this.setState({
			[key]: {
				...this.state[key],
				timeString
			}
		});
	}

	handleMeridiemChange(key, meridiem) {
		this.setState({
			[key]: {
				...this.state[key],
				meridiem
			}
		});
	}

	handleTodayClick(key, dateString, timeString, meridiem) {
		this.setState({
			[key]: {
				...this.state[key],
				dateString,
				timeString,
				meridiem
			}
		});
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

		return(
			<div className="container">
				<TransitionGroup component={FirstChild}>
					{isModalOpen ?
						<Modal
							ariaLabel="Modal title goes here"
							ariaDescription="Modal description goes here"
							isOpen={isModalOpen}
							onClose={this.handleModalClose}>
							<Form
								onSubmit={this.handleFormSubmit}
								onDateChange={this.handleDateChange}
								onTimeChange={this.handleTimeChange}
								onMeridiemChange={this.handleMeridiemChange}
								onTodayClick={this.handleTodayClick}
								dates={[date1, date2]}
							/>
						</Modal>
					: null}
				</TransitionGroup>
				<TransitionGroup component={FirstChild}>
					{(data && !isModalOpen) ?
						<Stagger className="l-row">
							{Object.keys(data).map((key) =>
								<div key={key} className="l-col-xs-4-of-12">
									<h3>{key}</h3>
									<p>{data[key].toLocaleString()}</p>
								</div>
							)}
						</Stagger>
					: null}
				</TransitionGroup>
				<button onClick={this.openModal}>Again</button>
			</div>
		);
	}
}

export default HowLongAgo;