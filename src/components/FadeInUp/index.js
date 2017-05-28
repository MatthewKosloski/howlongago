import React from 'react';
import { TweenMax } from 'gsap';

const fadeInUp = (Component) => {
	const defaultProps = {
		duration: 0.3
	};

	class FadeInUp extends React.Component {

		componentWillEnter(callback) {
			const el = this.container;
			TweenMax.fromTo(el, this.props.duration, {y: 25, opacity: 0}, {y: 0, opacity: 0.2, onComplete: callback});
		}

		componentWillLeave(callback) {
			const el = this.container;
			TweenMax.fromTo(el, this.props.duration, {y: 0, opacity: 1}, {y: -25, opacity: 0, onComplete: callback});
		}

		render() {
			return(
				<div ref={el => this.container = el}>
					<Component {...this.props}/>
				</div>
			);
		}
	}

	FadeInUp.defaultProps = defaultProps;

	return FadeInUp;
}

export default fadeInUp;