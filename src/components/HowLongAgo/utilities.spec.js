import expect from 'expect';
import * as utils from './utilities';

describe('HowLongAgo/utilities', () => {

	describe('getCurrentDate()', () => {

		let day, month, year;
		before(() => {
			const now = new Date();
			
			day = now.getDate();
			month = now.getMonth() + 1;
			year = now.getFullYear();

			day = day < 10 ? ('0' + day) : day + '';
			month = month < 10 ? ('0' + month) : month + '';

			year = year + '';
		});

		it('should return the current month, day, and year as a String', () => {
			expect({ day, month, year }).toEqual(utils.getCurrentDate());
		});
	});	

	describe('getCurrentDateString()', () => {

		let day, month, year;
		before(() => {
			const now = new Date();
			
			day = now.getDate();
			month = now.getMonth() + 1;
			year = now.getFullYear();

			day = day < 10 ? ('0' + day) : day + '';
			month = month < 10 ? ('0' + month) : month + '';

			year = year + '';
		});

		it('should return the current date as a String in the form of MM/DD/YYYY', () => {
			expect(`${month}/${day}/${year}`).toBe(utils.getCurrentDateString());
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

	describe('getCurrentTime()', () => {
		let hours, minutes, meridiem;
		before(() => {
			const now = new Date();

			hours = now.getHours();
			minutes = now.getMinutes();
			
			if(hours >= 12) {
				hours = hours - 12;
				meridiem = 'PM';
			} else if(hours === 0){
				hours = 12;
				meridiem = 'AM';
			} else {
				meridiem = 'AM';
			}

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

		});

		it('should return the current hours, minutes, and meridiem value (12-hours)', () => {
			expect({ hours, minutes, meridiem }).toEqual(utils.getCurrentTime());
		});
	});

	describe('getCurrentTimeString()', () => {
		let hours, minutes;
		before(() => {
			const now = new Date();

			hours = now.getHours();
			minutes = now.getMinutes();
			
			if(hours >= 12) {
				hours = hours - 12;
			} else if(hours === 0){
				hours = 12;
			}

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

		});

		it('should return the current time as a String in the form hh:mm (12-hours)', () => {
			expect(`${hours}:${minutes}`).toEqual(utils.getCurrentTimeString());
		});
	});

	describe('deconstructTimeString()', () => {
		it('should return hours and minutes as a Number', () => {
			expect({
				hours: 9,
				minutes: 19 
			}).toEqual(utils.deconstructTimeString('09:19'));
		});
	});

	describe('validateDateInput()', () => {
		it('should not modify a date in the proper form', () => {
			const valid = ['10/17/1997', '04/20/2012', '12/01/1985'];
			valid.forEach((date) => {
				expect(date).toEqual(utils.validateDateInput(date));
			})
		});
		it('should modify a date in an invalid form', () => {
			// const invalid = [
			// 	{before: '5/10/2015', after: '05/10/2015'}, 
			// 	{before: '12/5/2010', after: '12/05/2010'},
			// 	{before: '10/17/97', after: '10/17/1997'},
			// 	{before: '//25/1958', after: '01/25/1958'},
			// 	{before: '07////1997', after: '07/01/1997'},
			// ];

			// invalid.forEach((date) => {
			// 	console.log(utils.validateDateInput(date.before))
			// })
			console.log('1/', utils.validateDateInput('1/'));
		});
	});

});