import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import FirstChild from '../FirstChild';
import Modal from '../Modal';
import Form from '../Form';
import Stagger from '../Stagger';
import { 
	getCurrentDateString, 
	getCurrentTimeString, 
	getCurrentTime 
} from '../HowLongAgo/utilities';

import * as utils from './utilities';
import * as constants from './constants';
import s from './style.scss';

class HowLongAgo extends Component {

	constructor() {
		super();

		this.state = {
			dates: [
				{
					dateString: '',
					timeString: '',
					meridiem: 'AM',
					isToday: false,
				},
				{
					dateString: '10/17/1997',
					timeString: '02:50',
					meridiem: 'AM',
					isToday: false,
				}
			],
			isModalOpen: false,
			data: null,
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleTodayClick = this.handleTodayClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.getSubmissionStatus = this.getSubmissionStatus.bind(this);
		this._setData = this._setData.bind(this);
		this._setToday = this._setToday.bind(this);
	}

	componentDidMount() {
		this._setToday(0);
		this.openModal();
	}

	handleDateChange(index, date) {
		const { dates } = this.state;
		this.setState({
			dates: [
				...dates.slice(0, index),
				date,
				...dates.slice(index + 1)
			]
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

	handleTodayClick(index) {
		this._setToday(index);
	}

	getSubmissionStatus() {
		const { dates } = this.state;
		let canSubmit = true;

		// if the current date's dateString OR timeString are invalid, return false
		for(let i = 0; i < dates.length; i++) {
			const { dateString, timeString } = dates[i];
			if(!constants.DATE_REGEX.test(dateString) || !constants.TIME_REGEX.test(timeString)) {
				canSubmit = false;
				break;
			}
		}

		return canSubmit;
	}

	openModal() {
		this.setState({isModalOpen: true});
	}

	closeModal() {
		this.setState({isModalOpen: false});
	}

	_setData() {
		const [ date1, date2 ] = this.state.dates;
		this.setState({ data: utils.getDifferenceOfDates(date1, date2)});
	}

	_setToday(index) {
		const dateString = getCurrentDateString();
		const timeString = getCurrentTimeString();
		const meridiem = getCurrentTime().meridiem;
		const { isToday } = this.state.dates[index];

		this.handleDateChange(index, { 
			dateString: !isToday ? dateString : '',
			timeString: !isToday ? timeString : '',
			meridiem: !isToday ? meridiem : 'AM',
			isToday: !isToday
		});
	}

	render() {

		const { dates, isModalOpen, data } = this.state;

		let dataNodes;

		if(data) {
			dataNodes = Object.keys(data).map((key) => {
				return(
					<div key={key} className="l-col-xs-6-of-12 l-col-md-4-of-12">
						<div className={s.dataNode}>
							<h2 className={s.dataNode__number}>{data[key].toLocaleString()}</h2>
							<p className={s.dataNode__label}>{key}</p>
						</div>
					</div>
				);
			});
		}

		return(
			<div className={s.outer}>
				<TransitionGroup component={FirstChild}>
					{isModalOpen ?
						<Modal
							overlayOpacity={0}
							ariaLabelledBy="modal-label"
							ariaDescribedBy="modal-description"
							isOpen={isModalOpen}
							onClose={this.handleModalClose}>
							<div className={s.modalTitleContainer}>
								<h1 id="modal-label" className={s.modalTitleContainer__title}>How much time?</h1>
								<p id="modal-description" className={s.modalTitleContainer__subTitle}>
									Enter in any two dates, past, present, or future, to get how much time is in between them.  
									Click "Today" to automatically fill in the immediately preceeding fields with the current date and time.
								</p>
							</div>
							<Form
								onSubmit={this.handleFormSubmit}
								onDateChange={this.handleDateChange}
								onTodayClick={this.handleTodayClick}
								canSubmit={this.getSubmissionStatus()}
								dates={dates}
							/>
						</Modal>
					: null}
				</TransitionGroup>
				<div className="container">
					<TransitionGroup component={FirstChild}>
						{(data && !isModalOpen) ?
							<Stagger className="l-row">
								{dataNodes}
							</Stagger>
						: null}
					</TransitionGroup>
					<div className="l-row">
						<div className="l-col-xs-12-of-12">
							<div className={s.buttonContainer}>
								<button 
									className="btn btn--blue"
									onClick={this.openModal}>
									Again
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HowLongAgo;