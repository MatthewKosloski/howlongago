import * as constants from './constants';

export const dateStringPropType = (props, propName, componentName) => {
	if(!constants.DATE_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be a String in the form of mm/dd/yyyy.`
		);
	}
}

export const timeStringPropType = (props, propName, componentName) => {
	if(!constants.TIME_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be a String in the form of hh:mm.`
		);
	}
}

export const meridiemPropType = (props, propName, componentName) => {
	if(!constants.MERIDIEM_REGEX.test(props[propName])) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName}.  
			${propName} must be either AM or PM.`
		);
	}
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

/*
* Takes a string that should properly represent a date
* in the form MM-DD-YYYY, and if it does not properly 
* represent a date, it returns one that does so.
*
* The min and max values for MM are 1 and 12, respectively
* The min and max values for DD are 1 and 31, respectively
* The min and max values for YYYY are 1000 and 9999, respectively
*
* If the date hasn't happened yet, one year is subtracted from [Current Year]
*
* @param {String} dateInput
* @return {String}
*/
export const validateDateInput = (dateInput) => {

	const _prefixWith0 = (num) => {
		return String('0' + num).substr(String(num).length - 1);
	}

	const delimeter = '/';

	// Only allow numbers 0-9 and the delimeter
	let input = dateInput.replace(new RegExp(`[^0-9|\\${delimeter}]`), '');

	const len = input.length;

	const now = new Date();

	// min and max values for the month, day, and year
	const mmRange = [1, 12];
	const ddRange = [1, 31];
	const yyyyRange = [1000, 9999];

	// if lower than minimum, use minimum. if higher than maximum, use maximum.
	let mm = Math.max(mmRange[0], Math.min(mmRange[1], parseInt(input.substr(0, 2), 10)));
	let dd = Math.max(ddRange[0], Math.min(ddRange[1], parseInt(input.substr(3, 2), 10)));
	let yyyy = Math.max(yyyyRange[0], Math.min(yyyyRange[1], parseInt(input.substr(6, 4), 10)));

	// add 0 prefix to numbers less than 10
	let month = _prefixWith0(mm);
	let day = _prefixWith0(dd);

	// if user types in a bunch of slashes, replace them with the minimum value
	if(isNaN(month)) month = _prefixWith0(mmRange[0]);
	if(isNaN(day)) day = _prefixWith0(ddRange[0]);
	if(isNaN(yyyy)) yyyy = yyyyRange[0];

	if(len === 2) {
		input = month + delimeter;
	} else if(len === 5) {
		input = month + delimeter + day + delimeter;
	} else if(len === 10) {
		input = month + delimeter + day + delimeter + yyyy;
	}

	return input;
}

/*
* Takes a string that should properly represent a time
* in the form hh:mm, and if it does not properly 
* represent a time, it returns one that does so.
*
* The min and max values for hh are 1 and 12, respectively
* The min and max values for mm are 0 and 59, respectively
*
* @param {String} dateInput
* @return {String}
*/
export const validateTimeInput = (timeInput) => {

	const _prefixWith0 = (num) => {
		return String('0' + num).substr(String(num).length - 1);
	}

	const delimeter = ':';
    let input = timeInput.replace(new RegExp(`[^0-9|\\${delimeter}]`), '');

    const len = input.length;

    const hhRange = [1, 12];
    const mmRange = [0, 59];

    // hh:mm
    const hh = Math.max(hhRange[0], Math.min(hhRange[1], parseInt(input.substr(0, 2), 10)));
    const mm = Math.max(mmRange[0], Math.min(mmRange[1], parseInt(input.substr(3, 2), 10)));

    // add 0 prefix to numbers less than 10
    let hour = _prefixWith0(hh);
    let minute = _prefixWith0(mm);

    // if user types in a bunch of colons, replace them with the minimum values
    if(isNaN(hour)) hour = _prefixWith0(hhRange[0]);
	if(isNaN(minute)) minute = _prefixWith0(mmRange[0]);

    if(len === 2) {
        input = hour + delimeter;
    } else if(len === 5) {
        input = hour + delimeter + minute;
    }

    return input;
}