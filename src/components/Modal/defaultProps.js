const defaultProps = {
	duration: 0.3,
	delay: 0,
	overlayOpacity: 0.7,
	shouldCloseOnOverlayClick: true,
	shouldHideBodyOverflow: true,
	canClose: true,
	animation: {
		fromVars: {
			scale: 0,
			opacity: 0
		},
		toVars: {
			scale: 1,
			opacity: 1,
			ease: Back.easeInOut
		}
	}
};

export default defaultProps;