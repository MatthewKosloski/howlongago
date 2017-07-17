import expect from 'expect';

import * as utils from './utilities';

describe('DateInput/utilities', () => {
	// describe('dateStringPropType()', () => {
	// 	it('should throw Error if String doesn\'t match MM/DD/YYYY', () => {
	// 		expect(
	// 			utils.dateStringPropType({dateString: ''}, 'dateString', '')
	// 		).toBeAn(Error)
	// 	});

	// 	it('should NOT throw Error if String matches MM/DD/YYYY', () => {
	// 		expect(
	// 			utils.dateStringPropType({dateString: '10/17/1997'}, 'dateString', '')
	// 		).toBe(undefined)
	// 	});
	// });

	// describe('timeStringPropType()', () => {
	// 	it('should throw Error if String doesn\'t match hh:mm', () => {
	// 		expect(
	// 			utils.timeStringPropType({timeString: ''}, 'timeString', '')
	// 		).toBeAn(Error)
	// 	});

	// 	it('should NOT throw Error if String matches hh:mm', () => {
	// 		expect(
	// 			utils.timeStringPropType({timeString: '05:23'}, 'timeString', '')
	// 		).toBe(undefined)
	// 	});
	// });

	// describe('meridiemPropType()', () => {
	// 	it('should throw Error if String isn\'t AM or PM', () => {
	// 		expect(
	// 			utils.meridiemPropType({meridiem: ''}, 'meridiem', '')
	// 		).toBeAn(Error)
	// 	});

	// 	it('should NOT throw Error if String isn\'t AM or PM', () => {
	// 		expect(
	// 			utils.meridiemPropType({meridiem: 'AM'}, 'meridiem', '')
	// 		).toBe(undefined)
	// 	});
	// });

	describe('getRandomInt()', () => {
		let num, min, max;
		before(() => {
			min = 0;
			max = 100;
			num = utils.getRandomInt(min, max);
		});

		it('Should return a number between a given range', () => {
			expect(num).toBeGreaterThanOrEqualTo(min);
			expect(num).toBeLessThanOrEqualTo(max);
		})
	});

	describe('validateDateInput()', () => {
		it('Should prepend 0s to integers less than 10', () => {
			expect(utils.validateDateInput('1/')).toEqual('01/');
			expect(utils.validateDateInput('01/9/')).toEqual('01/09/');
		});
		it('Should automatically add "/"', () => {
			expect(utils.validateDateInput('01')).toEqual('01/');
			expect(utils.validateDateInput('01/31')).toEqual('01/31/');
		});
		it('Should restrict month between 01 and 12', () => {
			expect(utils.validateDateInput('00')).toEqual('01/');
			expect(utils.validateDateInput('13')).toEqual('12/');
		});
		it('Should restrict day between 01 and 31', () => {
			expect(utils.validateDateInput('01/00')).toEqual('01/01/');
			expect(utils.validateDateInput('01/32')).toEqual('01/31/');
		});
		it('Should replace NaN with the minimums', () => {
			expect(utils.validateDateInput('//')).toEqual('01/');
			expect(utils.validateDateInput('01///')).toEqual('01/01/');
			expect(utils.validateDateInput('01/01/////')).toEqual('01/01/1000');
		});
	});
	
	describe('validateTimeInput()', () => {
		it('Should prepend 0s to integers less than 10', () => {
			expect(utils.validateTimeInput('1:')).toEqual('01:');
		});
		it('Should automatically add ":"', () => {
			expect(utils.validateTimeInput('01')).toEqual('01:');
		});
		it('Should restrict hour between 01 and 12', () => {
			expect(utils.validateTimeInput('00')).toEqual('01:');
			expect(utils.validateTimeInput('13')).toEqual('12:');
		});
		it('Should restrict minute between 00 and 59', () => {
			expect(utils.validateTimeInput('01:60')).toEqual('01:59');
		});
	});

});