import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { TweenMax } from 'gsap';
import FirstChild from '../FirstChild';

const defaultProps = {
	duration: 0.3
};

class FadeInUpWrapper extends Component {
	componentWillEnter(callback) {
		const el = this.container;
		TweenMax.fromTo(el, this.props.duration, {y: 25, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
	}

	componentWillLeave(callback) {
		const el = this.container;
		TweenMax.fromTo(el, this.props.duration, {y: 0, opacity: 1}, {y: -25, opacity: 0, onComplete: callback});
	}

	render() {
		return <div ref={c => this.container = c}>{this.props.children}</div>;
	}
}

const FadeInUp = ({isVisible, children, duration}) => {
	return(
		<TransitionGroup component={FirstChild}>
			{isVisible && 
				<FadeInUpWrapper duration={duration}>
					{children}
				</FadeInUpWrapper>
			}
		</TransitionGroup>
	);
}

FadeInUp.defaultProps = defaultProps;

export default FadeInUp;