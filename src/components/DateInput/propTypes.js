import PropTypes from 'prop-types';

import * as utils from './utilities';

const propTypes = {
	onDateChange: PropTypes.func.isRequired,
	date: PropTypes.shape({
		dateString: utils.dateStringPropType,
		timeString: utils.timeStringPropType,
		meridiem: utils.meridiemPropType
	}).isRequired,
	defaultDateString: utils.dateStringPropType,
	defaultTimeString: utils.timeStringPropType,
	dateInputPlaceholder: PropTypes.string,
	timeInputPlaceholder: PropTypes.string
};

export default propTypes;