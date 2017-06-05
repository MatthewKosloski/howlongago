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

export default defaultProps;