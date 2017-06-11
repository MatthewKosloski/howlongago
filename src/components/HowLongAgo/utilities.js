import { daysOfTheWeek, monthsOfTheYear } from './constants';

/*
* If val is less than 10, it prefixes it with 0.
*
* @param {Number} val
* @return {String}
*
*/
export const prefixWith0 = (val) => {
	return val < 10 ? ('0' + val) : val + '';
}

/*
* Returns an Object of Strings containing the current
* month, day, and year:
*
* Example: {month: "05", day: "17", year: "2017"}
*
* @return {Object}
*/
export const getCurrentDate = () => {
	const now = new Date();

	let day = now.getDate();
	let month = now.getMonth() + 1;
	let year = now.getFullYear();

	day = prefixWith0(day);
	month = prefixWith0(month);

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
		years = _adjust(months / 12);
		// decades = _adjust(years / 10),
		// centuries = _adjust(decades / 10);

	// removed milliseconds because it is almost the same as seconds
	return {
		// milliseconds,
		seconds,
		minutes,
		hours,
		moments,
		days,
		weeks,
		fortnights,
		months,
		years,
		// decades,
		// centuries,
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

/*
*
* Takes a "blueprint" Object containing keys
* for a dateString, timeString, and meridiem
* and returns a boolean indicating whether or not
* they are equal to the current date and time.
*
* @param {Object} date
* @return {Boolean}
*/
export const isNow = (date) => {
	const { dateString, timeString, meridiem } = getNowDate();
	if(date.dateString === dateString &&
		date.timeString === timeString &&
		date.meridiem === meridiem
	) {
		return true;
	} else {
		return false;
	}
}

/*
* Returns a "blueprint" Object containing keys
* for a dateString, timeString, and meridiem.
*
* @return {Object}
*/
export const getNowDate = () => {
	const dateString = getCurrentDateString();
	const timeString = getCurrentTimeString();
	const meridiem = getCurrentTime().meridiem;
	return { dateString, timeString, meridiem };
}

/*
* Takes a "blueprint" object containing keys
* for a dateString, timeString, and meridiem
* and returns the days of the week as a String 
* (e.g., "Monday").
*
* @param {Object} date
* @return {String}
*
*/
export const getDayOfTheWeek = (date) => {
	return daysOfTheWeek[createDate(date).getDay()];
}

/*
* Takes a Number (a day of the month) and returns its ordinal value.
*
* @param {Number} day
* @return {String}
*/
export const addOrdinal = (day) => {
	switch (day) {
		case 1:
		case 21:
			return day + 'st';
			break;
		case 2:
		case 22:
			return day + 'nd';
			break;
		case 3:
		case 23:
			return day + 'rd';
			break;
		default:
			return day + 'th';
	}
}

/*
* Takes a "blueprint" object containing keys
* for a dateString, timeString, and meridiem
* and returns a String describing it 
* (e.g., "Friday, October 17th, 1997 at 12:00 AM").
*
* @param {Object} date
* @return {String}
*
*/
export const getDateStringDescriptor = (date) => {
	const { dateString, timeString, meridiem } = date;
	const { month, day, year } = deconstructDateString(dateString);
	const { hours, minutes } = deconstructTimeString(timeString);

	return `${getDayOfTheWeek(date)}, ${monthsOfTheYear[month - 1]} ${addOrdinal(day)}, ${year} at ${prefixWith0(hours)}:${prefixWith0(minutes)} ${meridiem}`;
}

/*
* Takes two "blueprint" objects containing keys
* for a dateString, timeString, and meridiem
* and returns a summary relative to the present time.
*
* @param {Object} date1
* @param {Object} date2
* @return {String}
*
*/
export const getSummary = (date1, date2) => {
	const now = createDate(getNowDate());
	const dateObj1 = createDate(date1);
	const dateObj2 = createDate(date2);

	const isDate1Past = dateObj1 < now;
	const isDate1Present = isNow(date1);
	const isDate1Future = dateObj1 > now;

	const isDate2Past = dateObj2 < now;
	const isDate2Present = isNow(date2);
	const isDate2Future = dateObj2 > now;

	let summary;

	const date1Descriptor = getDateStringDescriptor(date1);
	const date2Descriptor = getDateStringDescriptor(date2);

	if((isDate1Past && isDate2Past) || (isDate1Present && isDate2Present)) {
		summary = `Time elapsed between ${date1Descriptor} and ${date2Descriptor}`; 
	} else if(isDate1Future && isDate2Future || ((isDate1Past || isDate2Past) && (isDate1Future || isDate2Future))) {
		summary = `Time that will elaspe between ${date1Descriptor} and ${date2Descriptor}`; 
	} else if((isDate1Present || isDate2Present) && (isDate1Future || isDate2Future)) {
		summary = `Time remaining until ${isDate1Future ? date1Descriptor : date2Descriptor}`;
	} else if((isDate1Present || isDate2Present) && (isDate1Past || isDate2Past)) {
		summary = `Time elapsed since ${isDate1Past ? date1Descriptor : date2Descriptor}`;
	}

	return summary;
}