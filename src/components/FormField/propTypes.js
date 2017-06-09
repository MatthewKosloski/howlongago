import PropTypes from 'prop-types';

const propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	ariaLabel: PropTypes.string.isRequired,
	isRequired: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	length: PropTypes.oneOfType([
		PropTypes.number, 
		PropTypes.string
	]).isRequired
};

export default propTypes;