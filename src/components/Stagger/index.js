import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';

const defaultProps = {
	duration: 1,
	stagger: 0.1,
	fromVars: {
		ease: Elastic.easeInOut,
		opacity: 0,
		y: 0
	},
	toVars: {
		ease: Elastic.easeInOut,
		opacity: 1,
		y: 20
	}
};

const propTypes = {
	duration: PropTypes.number,
	stagger: PropTypes.number,
	fromVars: PropTypes.object,
	toVars: PropTypes.object,
	className: PropTypes.string
};

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