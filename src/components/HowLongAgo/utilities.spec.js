import expect from 'expect';
import moment from 'moment';

import * as utils from './utilities';
import { daysOfTheWeek, monthsOfTheYear } from './constants';

/*
*
* Returns a String.  If the given Number is < 10, 
* it appends a 0 in front of it.
*
* @param {Number} num
* @return {String}
*/
const _prefixWithZero = (num) => {
	return num < 10 ? ('0' + num) : String(num);
}

const _toTwelveHours = (hours, minutes) => {
	let meridiem;
	if(hours >= 12) {
		hours = _prefixWithZero(hours - 12);
		meridiem = 'PM';
	} else if(hours === 0) {
		hours = String(12);
		meridiem = 'AM';
	} else {
		meridiem = 'AM';
	}
	minutes = String(minutes);
	return { hours, minutes, meridiem };
}

describe.only('HowLongAgo/utilities', () => {

	describe('getCurrentDate() and getCurrentDateString()', () => {

		let day, month, year;
		before(() => {
			day = _prefixWithZero(moment().date());
			month = _prefixWithZero(moment().month() + 1);
			year = String(moment().year());
		});

		describe('getCurrentDate()', () => {
			it('should return the current month, day, and year as a String', () => {
				expect({ day, month, year }).toEqual(utils.getCurrentDate());
			});
		});

		describe('getCurrentDateString()', () => {
			it('should return the current date as a String in the form of MM/DD/YYYY', () => {
				expect(`${month}/${day}/${year}`).toBe(utils.getCurrentDateString());
			});
		});
	});	

	describe('deconstructDateString()', () => {
		it('should return a month, day, and year as a Number', () => {
			expect({
				month: 10,
				day: 17,
				year: 1997
			}).toEqual(utils.deconstructDateString('10/17/1997'));
		});
	});

	describe('toTwelveHours()', () => {
		it('should return AM time for hours less than 12', () => {
			expect({
				hours: '09',
				minutes: '41',
				meridiem: 'AM'
			}).toEqual(utils.toTwelveHours(9, 41));
		});
		it('should return PM time for hours greater than 12', () => {
			expect({
				hours: '08',
				minutes: '05',
				meridiem: 'PM'
			}).toEqual(utils.toTwelveHours(20, 5));
		}); 
		it('should return 12 AM when no arguments are provided', () => {
			expect({
				hours: '12',
				minutes: '00',
				meridiem: 'AM'
			}).toEqual(utils.toTwelveHours());
		});
	});

	describe('getCurrentTime() and getCurrentTimeString()', () => {

		let hours, minutes, meridiem;
		before(() => {
			const current12Hours = _toTwelveHours(moment().hours(), moment().minutes());
			hours = current12Hours.hours;
			minutes = current12Hours.minutes;
			meridiem = current12Hours.meridiem;
		});

		describe('getCurrentTime()', () => {
			it('should return the current hrs, mins, and meridiem (12 hrs)', () => {
				expect({ hours, minutes, meridiem }).toEqual(utils.getCurrentTime());
			});
		});

		describe('getCurrentTimeString()', () => {
			it('should return the current hrs, mins, and meridiem (12 hrs)', () => {
				expect({ hours, minutes, meridiem }).toEqual(utils.getCurrentTime());
			});
		})
	});

	describe('deconstructTimeString()', () => {
		it('should return hours and minutes as a Number', () => {
			expect({
				hours: 9,
				minutes: 19 
			}).toEqual(utils.deconstructTimeString('09:19'));
		});
	});

	describe('getSummary()', () => {

		/*
		* A helper function to easily construct date blueprints
		* with a predefined time of 12:00 AM.
		*/
		let testDate;
		before(() => {
			testDate = (dateString) => {
				return {dateString, timeString: '12:00', meridiem: 'AM'};
			};
		});

		it('should work for two past dates', () => {
			const date1 = testDate('10/17/1997');
			const date2 = testDate('10/17/2000');

			const expectation = `Time elapsed between ${date1.dateString} and ${date2.dateString}`;

			expect(utils.getSummary(date1, date2)).toBe(expectation);
		});

		it('should work for a past date and present date', () => {
			const date2 = testDate('10/17/1997');
			const date1 = utils.getNowDate();

			const expectation = `Time elapsed since ${date2.dateString}`;

			expect(utils.getSummary(date1, date2)).toBe(expectation);
		});

		it('should work for a past and future date', () => {
			const date2 = testDate('10/17/1997');
			const date1 = testDate('10/17/9999');

			const expectation = `Time that will elaspe between ${date2.dateString} and ${date1.dateString}`;

			expect(utils.getSummary(date1, date2)).toBe(expectation);
		});

		it('should work for two present dates', () => {
			const date1 = utils.getNowDate();
			const date2 = utils.getNowDate();

			const expectation = `Time elapsed between ${date1.dateString} and ${date2.dateString}`;
				
			expect(utils.getSummary(date1, date2)).toEqual(expectation);
		});

		it('should work for a present and future date', () => {
			const date1 = utils.getNowDate();
			const date2 = testDate('10/17/9999');

			const expectation = `Time remaining until ${date2.dateString}`;
			
			expect(utils.getSummary(date1, date2)).toBe(expectation);
		});

		it('should work for two future dates', () => {
			const date1 = testDate('10/17/9998');
			const date2 = testDate('10/17/9999');

			const expectation = `Time that will elaspe between ${date1.dateString} and ${date2.dateString}`;
			
			expect(utils.getSummary(date1, date2)).toBe(expectation);
		});

	});

});