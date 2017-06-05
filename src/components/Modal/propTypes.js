import PropTypes from 'prop-types';

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
};

export default propTypes;