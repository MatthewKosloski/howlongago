const defaultProps = {
	duration: 0.3,
	overlayOpacity: 0.7,
	shouldCloseOnOverlayClick: true,
	shouldHideBodyOverflow: true,
	animation: {
		componentWillEnter: {
			fromVars: {
				scale: 0,
				opacity: 0
			},
			toVars: {
				scale: 1,
				opacity: 1,
				ease: Back.easeInOut.config(1)
			}
		},
		componentWillLeave: {
			fromVars: {
				scale: 1,
				opacity: 1
			},
			toVars: {
				scale: 0,
				opacity: 0,
				ease: Back.easeInOut.config(1)
			}
		}
	}
};

export default defaultProps;