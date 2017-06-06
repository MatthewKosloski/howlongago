import PropTypes from 'prop-types';

import * as utils from './utilities';

const propTypes = {
	onDateChange: PropTypes.func.isRequired,
	date: PropTypes.shape({
		dateString: PropTypes.string,
		timeString: PropTypes.string,
		meridiem: PropTypes.string
	}).isRequired,
	defaultDateString: PropTypes.string,
	defaultTimeString: PropTypes.string,
	dateInputPlaceholder: PropTypes.string,
	timeInputPlaceholder: PropTypes.string
};

export default propTypes;