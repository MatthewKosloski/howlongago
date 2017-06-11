import React, { Component } from 'react';
import { TweenMax } from 'gsap';

import defaultProps from './defaultProps';
import propTypes from './propTypes';
import s from './style';

class Modal extends Component {

	constructor() {
		super();
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleCloseButton = this.handleCloseButton.bind(this);
		this._close = this._close.bind(this);
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
    		this._close();
    	}
    }

    handleCloseButton() {
    	this._close();
    }

    handleKeyDown(e) {
    	// ESC
    	if(e.keyCode === 27) {
    		this._close();
    	}
    }

    componentWillEnter(callback) {
    	const { duration, animation, delay } = this.props;
    	const { fromVars, toVars } = animation; 

		TweenMax.fromTo(this.container, duration, {opacity: 0}, {opacity: 1, onComplete: callback});
		TweenMax.fromTo(this.dialog, duration + (duration * 0.5), fromVars, {...toVars, delay, onComplete: callback});
	}

	componentWillLeave(callback) {
		const { duration, animation, delay } = this.props;
		const { fromVars, toVars } = animation; 

		TweenMax.fromTo(this.container, duration, {opacity: 1}, {opacity: 0, onComplete: callback});
		TweenMax.fromTo(this.dialog, duration + (duration * 0.5), toVars, {...fromVars, delay, onComplete: callback});
	}

	_close() {
		if(this.props.canClose) {
			this.props.onClose();
		}
    }

	render() {
		const { children, isOpen, ariaLabelledBy, ariaDescribedBy, overlayOpacity } = this.props;
		return(
			<div 
				ref={el => this.container = el} 
				className={s.container} 
				aria-hidden={!isOpen}>
	            <div 
					ref={el => this.dialog = el}
	            	className={s.dialog} 
	            	role="dialog" 
	            	aria-labelledby={ariaLabelledBy} 
	            	aria-describedby={ariaDescribedBy}>
	                	<a 
	                		role="button"
	                		aria-label="Close dialog window"
	                		href="#" 
	                		className={`${s.close} ${!this.props.canClose ? s.closeDisabled : ''}`} 
	                		onClick={this.handleCloseButton}>
	                			<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><title>close</title><path d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7" fill="#DDE2EE" fillRule="evenodd"/></svg>
	                	</a>
	                {children}
	            </div>
	            <div 
	            	style={{opacity: overlayOpacity}}
					className={s.overlay} 
					aria-hidden="true">
				</div>
	        </div>
		);
	}
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;