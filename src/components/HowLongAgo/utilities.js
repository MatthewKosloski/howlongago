/*
* Returns an Object of Strings containing the current
* month, day, and year:
*
* Example: {month: "05", day: "17", year: "2017"}
*
* @return {Object}
*/
export const getCurrentDate = () => {

	const _prefixWith0 = (val) => {
		return val < 10 ? ('0' + val) : val + '';
	}

	const now = new Date();

	let day = now.getDate();
	let month = now.getMonth() + 1;
	let year = now.getFullYear();

	day = _prefixWith0(day);
	month = _prefixWith0(month);

	year = year + '';

	return { month, day, year };
}

/*
* Returns a String containing the month, day,
* and year in the following format: MM/DD/YYYY
*
* Example: "05/17/2017"
*
* @return {String}
*/
export const getCurrentDateString = () => {
	const { month, day, year } = getCurrentDate();
	return `${month}/${day}/${year}`;
}

/*
* Takes a String in the form MM/DD/YYYY and 
* returns an Object of Numbers indicating the month,
* day, and year.
*
* @param {String} dateString
* @return {Object}
*/
export const deconstructDateString = (dateString) => {
	const parts = dateString.split('/');
	const month = +parts[0], day = +parts[1], year = +parts[2];
	return { month, day, year };
}

/*
* Converts 24-hour time to 12-hour time. Returns
* an Object of Strings including hours, minutes, and 
* a meridiem value (AM/PM)
*
* @param {Number} hours || 0
* @param {Number} minutes || 0
* @return {Object}
*/
export const toTwelveHours = (hours = 0, minutes = 0) => {

	let meridiem;

	// convert 24-hours to 12-hours
	if(hours >= 12) {
		hours = hours - 12;
		meridiem = 'PM';
	} else if(hours === 0){
		hours = 12;
		meridiem = 'AM';
	} else {
		meridiem = 'AM';
	}

	// add 0 prefix to strings less than 10, else convert to String
	if(hours < 10) {
		hours = '0' + hours;
	} else {
		hours = hours + '';
	}

	if(minutes < 10) {
		minutes = '0' + minutes;
	} else {
		minutes = minutes + '';
	}

	return { hours, minutes, meridiem};
}

/*
* Returns an Object of Strings containing the current
* time in hours and minutes and a meridiem (AM/PM)
*
* Example: {hours: "09", minutes: "16", meridiem: "PM"}
*
* @return {Object}
*/
export const getCurrentTime = () => {
	const now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let meridiem;

	// convert hours and minutes to 12-hour
	let twelveHourUnits = toTwelveHours(hours, minutes);
	hours = twelveHourUnits.hours;
	minutes = twelveHourUnits.minutes;
	meridiem = twelveHourUnits.meridiem;

	return { hours, minutes, meridiem };
}

/*
* Returns a String containing the current
* hours and minutes in the following format: hh:mm
*
* Example: "10:05"
*
* @return {String}
*/
export const getCurrentTimeString = () => {
	const { hours, minutes } = getCurrentTime();
	return `${hours}:${minutes}`;
}

/*
* Takes a String in the form hh:mm and 
* returns an Object of Numbers indicating the
* hours and minutes
*
* @param {String} timeString
* @return {Object}
*/
export const deconstructTimeString = (timeString) => {
	const parts = timeString.split(':');
	const hours = +parts[0], minutes = +parts[1];
	return { hours, minutes };
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
	let mm = Math.max(mmRange[0], Math.min(mmRange[1], +input.substr(0, 2)));
	let dd = Math.max(ddRange[0], Math.min(ddRange[1], +input.substr(3, 2)));
	let yyyy = Math.max(yyyyRange[0], Math.min(yyyyRange[1], +input.substr(6, 4)));

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

/*
* Takes two Date objects and returns an Object
* returned from getTimeDifference.
*
* @param {Date} date1
* @param {Date} date2
* @return {Object}
*/
export const getDifferenceOfDates = (date1, date2) => {
	const dateObj1 = createDate(date1);
	const dateObj2 = createDate(date2);
	let dataObj;

	if(dateObj1 < dateObj2) {
		dataObj = getTimeDifference(dateObj2, dateObj1);
	} else {
		dataObj = getTimeDifference(dateObj2, dateObj1);
	}

	return dataObj;
}

/*
* A function that is passed in two Date objects and returns
* an Object of Numbers indicating the difference in milliseconds,
* seconds, etc.
*
* @param {Date} higherDate
* @param {Date} lowerDate
* @return {Object}
*/
export const getTimeDifference = (higherDate, lowerDate) => {

	/*
		Values must be absolute to compensate if both
		dates were in the past.
	*/
	const _adjust = (num) => Math.abs(Math.round(num));

	const milliseconds = higherDate.getTime() - lowerDate.getTime(),
		seconds = _adjust(milliseconds / 1000),
		minutes = _adjust(seconds / 60),
		hours = _adjust(minutes / 60),
		moments = _adjust(hours / 0.025),
		days = _adjust(hours / 24),
		weeks = _adjust(days / 7),
		fortnights = _adjust(weeks / 2),
		months = _adjust(weeks / 4.35),
		years = _adjust(months / 12),
		decades = _adjust(years / 10),
		centuries = _adjust(decades / 10);

	return {
		milliseconds,
		seconds,
		minutes,
		hours,
		moments,
		days,
		weeks,
		fortnights,
		months,
		years,
		decades,
		centuries,
	}
}

/*
* A function that takes in two Numbers for hours
* and minutes and a String for AM/PM; returns
* Object containing 24-hour time.
*
* @param {Number} hours
* @param {Number} minutes
* @param {String} meridiem
* @return {Object}
*/
export const toTwentyFourHours = (hours, minutes, meridiem) => {

	// convert 12-hours to 24-hours
	if(meridiem === 'PM' && hours < 12) hours = hours + 12;
	if(meridiem === 'AM' && hours === 12) hours = hours - 12;

	return { hours, minutes };
}

/*
* Constructs and returns a Date object
* from a "blueprint" object containing keys
* for a dateString, timeString, and meridiem.
*
* @param {Object} blueprint
* @return {Date}
*/
export const createDate = (blueprint) => {
	const { dateString, timeString, meridiem } = blueprint;

	const date = deconstructDateString(dateString);
	const time = deconstructTimeString(timeString);

	const { year, month, day } = date;
	const { hours, minutes } = toTwentyFourHours(time.hours, time.minutes, meridiem);

	return new Date(year, month - 1, day, hours, minutes);
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}