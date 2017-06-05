import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import FirstChild from './FirstChild';
import Stagger from './Stagger';

class App extends Component {
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
					dateString: '06/04/2017',
					timeString: '08:46',
					meridiem: 'PM'
				}
			],
		};
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		this.handleDateChange(0, {
			dateString: '06/05/2017',
			timeString: '08:46',
			meridiem: 'PM'
		});
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

	render() {
		return(
			<div>
				lol
			</div>
		);
	}
}

export default App;