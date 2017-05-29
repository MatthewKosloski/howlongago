import React, { Component } from 'react';
import { TweenMax } from 'gsap';
import s from './style';

const defaultProps = {
	duration: 0.3
};

class AccessibleModal extends Component {

	constructor() {
		super();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
    	if(this.dialog && !this.dialog.contains(e.target)) {
    		this.props.onClose();
    	}
    }

    componentWillEnter(callback) {
		TweenMax.fromTo(this.container, this.props.duration, {opacity: 0}, {opacity: 1, onComplete: callback});
		TweenMax.fromTo(this.dialog, this.props.duration + (this.props.duration * 0.5), {y: 100, opacity: 0}, {y: 0, opacity: 1, ease: Back.easeInOut.config(4), onComplete: callback});
	}

	componentWillLeave(callback) {
		TweenMax.fromTo(this.container, this.props.duration, {opacity: 1}, {opacity: 0, onComplete: callback});
		TweenMax.fromTo(this.dialog, this.props.duration + (this.props.duration * 0.5), {y: 0, opacity: 1}, {y: 100, opacity: 0, ease: Back.easeInOut.config(4), onComplete: callback});
	}

	render() {
		const { children, isOpen, ariaLabel, ariaDescription } = this.props;
		return(
			<div 
				ref={el => this.container = el} 
				className={s.modal} 
				aria-hidden={!isOpen}>
	            <div 
					ref={el => this.dialog = el}
	            	className={s.modalContent} 
	            	role="dialog" 
	            	aria-labelledby="modal-title" 
	            	aria-describedby="modal-description">

	                <h1 tabIndex="-1" id="modal-title" className={s.srOnly}>{ariaLabel}</h1>
	                <p tabIndex="-1" id="modal-description" className={s.srOnly}>{ariaDescription}</p>
	                {children}
	            </div>
	            <div 
					className={s.modalOverlay} 
					tabIndex="-1">
				</div>
	        </div>
		);
	}
}

AccessibleModal.defaultProps = defaultProps;

export default AccessibleModal;