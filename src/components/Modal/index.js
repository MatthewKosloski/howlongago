import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import s from './style';

const propTypes = {
	ariaLabel: PropTypes.string.isRequired,
	ariaDescription: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	shouldCloseOnOverlayClick: PropTypes.bool,
	shouldHideBodyOverflow: PropTypes.bool,
	duration: PropTypes.number,
	animation: PropTypes.shape({
		componentWillEnter: PropTypes.shape({
			fromVars: PropTypes.object,
			toVars: PropTypes.object
		}).isRequired,
		componentWillLeave: PropTypes.shape({
			fromVars: PropTypes.object,
			toVars: PropTypes.object
		}).isRequired
	})
}

const defaultProps = {
	duration: 0.3,
	shouldCloseOnOverlayClick: true,
	shouldHideBodyOverflow: true,
	animation: {
		componentWillEnter: {
			fromVars: {
				y: 100,
				opacity: 0
			},
			toVars: {
				y: 0,
				opacity: 1,
				ease: Back.easeInOut.config(4)
			}
		},
		componentWillLeave: {
			fromVars: {
				y: 0,
				opacity: 1
			},
			toVars: {
				y: 100,
				opacity: 0,
				ease: Back.easeInOut.config(4)
			}
		}
	}
};

class Modal extends Component {

	constructor() {
		super();
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidMount() {
		if(this.props.shouldHideBodyOverflow) {
			document.body.style.overflow = 'hidden';
		}
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
    	if(this.props.shouldHideBodyOverflow) {
			document.body.style.overflow = 'visible';
		}
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleClickOutside(e) {
    	if(this.props.shouldCloseOnOverlayClick && this.dialog && !this.dialog.contains(e.target)) {
    		this.props.onClose();
    	}
    }

    handleKeyDown(e) {
    	// ESC
    	if(e.keyCode === 27) {
    		this.props.onClose();
    	}
    }

    componentWillEnter(callback) {
    	const { duration, animation } = this.props;
    	const { fromVars, toVars } = animation.componentWillEnter; 

		TweenMax.fromTo(this.container, duration, {opacity: 0}, {opacity: 1, onComplete: callback});
		TweenMax.fromTo(this.dialog, duration + (duration * 0.5), fromVars, {...toVars, onComplete: callback});
	}

	componentWillLeave(callback) {
		const { duration, animation } = this.props;
		const { fromVars, toVars } = animation.componentWillLeave; 

		TweenMax.fromTo(this.container, duration, {opacity: 1}, {opacity: 0, onComplete: callback});
		TweenMax.fromTo(this.dialog, duration + (duration * 0.5), fromVars, {...toVars, onComplete: callback});
	}

	render() {
		const { children, isOpen, ariaLabel, ariaDescription } = this.props;
		return(
			<div 
				ref={el => this.container = el} 
				className={s.container} 
				aria-hidden={!isOpen}>
	            <div 
					ref={el => this.dialog = el}
	            	className={s.dialog} 
	            	role="dialog" 
	            	aria-labelledby="modal-title" 
	            	aria-describedby="modal-description">
	                <h1 tabIndex="-1" id="modal-title" className={s.srOnly}>{ariaLabel}</h1>
	                <p tabIndex="-1" id="modal-description" className={s.srOnly}>{ariaDescription}</p>
	                {children}
	            </div>
	            <div 
					className={s.overlay} 
					tabIndex="-1">
				</div>
	        </div>
		);
	}
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;