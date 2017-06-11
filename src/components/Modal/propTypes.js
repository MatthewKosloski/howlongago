import PropTypes from 'prop-types';

const propTypes = {
	ariaLabelledBy: PropTypes.string.isRequired,
	ariaDescribedBy: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	shouldCloseOnOverlayClick: PropTypes.bool,
	shouldHideBodyOverflow: PropTypes.bool,
	overlayOpacity: PropTypes.number,
	duration: PropTypes.number,
	delay: PropTypes.number,
	canClose: PropTypes.bool,
	animation: PropTypes.shape({
		fromVars: PropTypes.object,
		toVars: PropTypes.object
	})
};

export default propTypes;