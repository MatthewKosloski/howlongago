import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import FirstChild from '../FirstChild';
import Modal from '../Modal';
import Form from '../Form';
import Stagger from '../Stagger';
import * as utils from './utilities';
import s from './style.scss';

class HowLongAgo extends Component {

	constructor() {
		super();

		this.state = {
			dates: [
				{
					dateString: '10/17/1997',
					timeString: '02:50',
					meridiem: 'AM'
				},
				{
					dateString: utils.getCurrentDateString(),
					timeString: utils.getCurrentTimeString(),
					meridiem: utils.getCurrentTime().meridiem
				}
			],
			isModalOpen: false,
			data: null,
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this._setData = this._setData.bind(this);
	}

	componentDidMount() {
		this.openModal();
	}

	handleDateChange(index, date) {
		console.log(index, date);
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

	render() {

		const { dates, isModalOpen, data } = this.state;

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
								dates={dates}
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