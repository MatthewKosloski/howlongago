import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import FirstChild from './FirstChild';
import Stagger from './Stagger';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false
		};
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount() {
		this.setState({isVisible: true});
	}

	handleToggle() {
		this.setState({ isVisible: !this.state.isVisible });
	}

	render() {
		const { isVisible } = this.state;
		return(
			<div>
				<TransitionGroup component={FirstChild}>
					{isVisible ?
						<Stagger
							fromVars={{
								ease: Elastic.easeInOut,
								opacity: 0,
								y: 0
							}}
							toVars={{
								ease: Elastic.easeInOut,
								opacity: 1,
								y: 100
							}}
							duration={1}>
							<div>
								<p>Lorem</p>
							</div>
							<div>
								<p>ipsum</p>
							</div>
							<div>
								<p>dolor</p>
							</div>
							<div>
								<p>sit</p>
							</div>
							<div>
								<p>amet</p>
							</div>
						</Stagger>
					: null}
				</TransitionGroup>
				<button onClick={() => {
					this.setState({isVisible: !isVisible})
				}}>Toggle</button>
			</div>
		);
	}
}

export default App;