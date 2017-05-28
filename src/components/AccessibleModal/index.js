import React, { Component } from 'react';
import s from './style';

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
    	if(this.ref && !this.ref.contains(e.target)) {
    		this.props.onClose();
    	}
    }

	render() {
		const { children, isOpen, ariaLabel, ariaDescription } = this.props;
		return(
			<div className={s.modal} aria-hidden={!isOpen}>
	            <div 
	            	ref={node => this.ref = node}
	            	className={s.modalContent} 
	            	role="dialog" 
	            	aria-labelledby="modal-title" 
	            	aria-describedby="modal-description">

	                <h1 tabIndex="-1" id="modal-title" className={s.srOnly}>{ariaLabel}</h1>
	                <p tabIndex="-1" id="modal-description" className={s.srOnly}>{ariaDescription}</p>
	                {children}

	            </div>
	            <div className={s.modalOverlay} tabIndex="-1"></div>
	        </div>
		);
	}
}

export default AccessibleModal;