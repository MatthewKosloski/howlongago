import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import FirstChild from '../FirstChild';
import Modal from '../Modal';
import Form from '../Form';
import Stagger from '../Stagger';

import { getDifferenceOfDates, getNowDate, getSummary } from './utilities';
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
					dateString: '',
					timeString: '',
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
		this.setState({ data: getDifferenceOfDates(date1, date2)});
	}

	_setToday(index) {
		const { dateString, timeString, meridiem } = getNowDate();
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

		let dataNodes, dataSummary;

		if(data) {
			dataNodes = Object.keys(data).map((key) => {
				return(
					<div key={key} className="l-col-xs-6-of-12 l-col-md-4-of-12">
						<div className={s.dataNode}>
							<h2 className="heading-three">
								{data[key].toLocaleString()}
							</h2>
							<p className={s.dataNode__label}>
								{key}
							</p>
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
							duration={0.3}
							delay={data ? 0.1 : 0}
							overlayOpacity={0}
							ariaLabelledBy="modal-label"
							ariaDescribedBy="modal-description"
							isOpen={isModalOpen}
							canClose={data !== null}
							onClose={this.handleModalClose}>
							<div className={s.modalTitleContainer}>
								<h1 id="modal-label" className={s.modalTitleContainer__title}>Date Analyzer</h1>
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
							<Stagger 
								duration={0.67}
								delay={0.3}
								className="l-row">
								<div className="l-col-xs-12-of-12">
									<h1 className={`${s.summary} heading-two`}>{getSummary(dates[0], dates[1])}</h1>
								</div>
								{dataNodes}
								<div className="l-col-xs-12-of-12">
									<div className={s.buttonContainer}>
										<button 
											className="btn btn--blue btn--with-arrow"
											onClick={this.openModal}>
											Another
										</button>
									</div>
								</div>
							</Stagger>
						: null}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default HowLongAgo;