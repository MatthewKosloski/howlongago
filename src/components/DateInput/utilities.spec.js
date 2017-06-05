import expect from 'expect';

import * as utils from './utilities';

describe.only('DateInput/utilities', () => {
	describe('dateStringPropType()', () => {
		it('should throw Error if String doesn\'t match MM/DD/YYYY', () => {
			expect(
				utils.dateStringPropType({dateString: ''}, 'dateString', '')
			).toBeAn(Error)
		});

		it('should NOT throw Error if String matches MM/DD/YYYY', () => {
			expect(
				utils.dateStringPropType({dateString: '10/17/1997'}, 'dateString', '')
			).toBe(undefined)
		});
	});

	describe('timeStringPropType()', () => {
		it('should throw Error if String doesn\'t match hh:mm', () => {
			expect(
				utils.timeStringPropType({timeString: ''}, 'timeString', '')
			).toBeAn(Error)
		});

		it('should NOT throw Error if String matches hh:mm', () => {
			expect(
				utils.timeStringPropType({timeString: '05:23'}, 'timeString', '')
			).toBe(undefined)
		});
	});

	describe('meridiemPropType()', () => {
		it('should throw Error if String isn\'t AM or PM', () => {
			expect(
				utils.meridiemPropType({meridiem: ''}, 'meridiem', '')
			).toBeAn(Error)
		});

		it('should NOT throw Error if String isn\'t AM or PM', () => {
			expect(
				utils.meridiemPropType({meridiem: 'AM'}, 'meridiem', '')
			).toBe(undefined)
		});
	});

	describe('getRandomInt()', () => {
		let num, min, max
		before(() => {
			min = 0;
			max = 100;
			num = utils.getRandomInt(min, max);
		});

		it('Should return a number between a given range', () => {
			expect(num).toBeGreaterThanOrEqualTo(min);
			expect(num).toBeLessThanOrEqualTo(max);
		})
	})

});