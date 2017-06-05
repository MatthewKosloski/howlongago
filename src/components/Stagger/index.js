import React, { Component } from 'react';
import { TweenMax } from 'gsap';

import defaultProps from './defaultProps';
import propTypes from './propTypes';

class Stagger extends Component {

	constructor(props) {
		super(props);
		this.childNodes = [];
		this.children = React.Children.map(props.children, (child, i) => {
			return React.cloneElement(child, {ref: el => this.childNodes[i] = el});
		});	
	}

	componentWillEnter(callback) {
		const { duration, stagger, fromVars, toVars } = this.props;
		TweenMax.staggerFromTo(this.childNodes, duration, fromVars, {...toVars, onComplete: callback}, stagger);
	}

	componentWillLeave(callback) {
		const { duration, stagger, fromVars, toVars } = this.props;
		TweenMax.staggerFromTo(this.childNodes, duration, toVars, {...fromVars, onComplete: callback}, stagger);
	}

	render() {
		return <div className={this.props.className || ''}>{this.children}</div>;
	}
}

Stagger.defaultProps = defaultProps;
Stagger.propTypes = propTypes;

export default Stagger;