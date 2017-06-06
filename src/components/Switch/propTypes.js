import PropTypes from 'prop-types';

const propTypes = {
	value: PropTypes.bool,
	labels: PropTypes.array,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default propTypes;