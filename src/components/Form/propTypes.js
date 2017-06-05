import PropTypes from 'prop-types';

const propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onDateChange: PropTypes.func.isRequired,
	dates: PropTypes.arrayOf(PropTypes.object)
};

export default propTypes;