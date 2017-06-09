import PropTypes from 'prop-types';

const propTypes = {
	onDateChange: PropTypes.func.isRequired,
	date: PropTypes.shape({
		dateString: PropTypes.string,
		timeString: PropTypes.string,
		meridiem: PropTypes.string
	}).isRequired,
	dateLabel: PropTypes.string,
	timeLabel: PropTypes.string
};

export default propTypes;