import React from 'react';
import { TweenMax } from 'gsap';

const fadeIn = (Component) => {
	const defaultProps = {
		duration: 0.3
	};

	class FadeIn extends React.Component {

		componentWillEnter(callback) {
			const el = this.container;
			TweenMax.fromTo(el, this.props.duration, {opacity: 0}, {opacity: 1, onComplete: callback});
		}

		componentWillLeave(callback) {
			const el = this.container;
			TweenMax.fromTo(el, this.props.duration, {opacity: 1}, {opacity: 0, onComplete: callback});
		}

		render() {
			return <Component container={el => this.container = el} {...this.props}/>;
		}
	}

	FadeIn.defaultProps = defaultProps;

	return FadeIn;
}

export default fadeIn;