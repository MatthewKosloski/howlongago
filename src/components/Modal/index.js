import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FadeIn from '../FadeIn';
import s from './style.scss';

class Modal extends Component {

	constructor() {
		super();
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.setRef = this.setRef.bind(this);
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

    setRef(node) {
    	this.ref = node;
    }

	render() {

		const { isOpen, children } = this.props;

		return(
			<div>
				{isOpen && <div className={s.outer}>
				<FadeIn isVisible={isOpen}>
					<div className={s.overlay}></div>
				</FadeIn>
				<FadeIn isVisible={isOpen}>
					<div className={s.content}>
						<div className={s.inner} ref={this.setRef}>
							{children}
						</div>
					</div>
				</FadeIn>
			</div>}
			</div>
		);
	}
}

export default Modal;