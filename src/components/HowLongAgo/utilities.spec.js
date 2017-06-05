import expect from 'expect';
import moment from 'moment';

import * as utils from './utilities';

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

describe('HowLongAgo/utilities', () => {

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
			if(moment().hours() >= 12) {
				hours = _prefixWithZero(moment().hours() - 12);
				meridiem = 'PM';
			} else if(moment().hours() === 0) {
				hours = String(12);
				meridiem = 'AM';
			} else {
				meridiem = 'AM';
			}
			minutes = _prefixWithZero(moment().minutes());
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

});