import { validatePoint, validateFigure, validateBusketFill } from './index';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { error, color } from '../utils/constants';


const canvasLayoutStart = [
    [{ isBorder: false, background: '' }, { isBorder: false, background: '' }],
    [{ isBorder: false, background: '' }, { isBorder: false, background: '' }]
];

describe('Validations', () => {
    describe('Validate Point', () => {
        it('Should return empty string with right value', () => {
            expect(validatePoint({ x: 0, y: 0 }, canvasLayoutStart)).toBe('');
        })
        it(`Should return ${error.notNumber} string with string value`, () => {
            //@ts-ignore
            expect(validatePoint({ x: 'f', y: 0 }, canvasLayoutStart)).toBe(error.notNumber);
        })
        it(`Should return ${error.outOfField} string with invalid x value`, () => {
            expect(validatePoint({ x: -1, y: 0 }, canvasLayoutStart)).toBe(error.outOfField);
        })

        it(`Should return ${error.outOfField} string with invalid y value`, () => {
            expect(validatePoint({ x: 0, y: -1 }, canvasLayoutStart)).toBe(error.outOfField);
        });


        it(`Should return ${error.outOfField} string with with x more than max border`, () => {
            expect(validatePoint({ x: 2, y: 0 }, canvasLayoutStart)).toBe(error.outOfField);
        });

        it(`Should return ${error.outOfField} string with with xy more than max border`, () => {
            expect(validatePoint({ x: 0, y: 2 }, canvasLayoutStart)).toBe(error.outOfField);
        });
    })

    describe('Validate Line figure', () => {
        it('Should return true with valid values', () => {
            expect(validateFigure({ x: 0, y: 0 }, { x: 0, y: 1 }, 'line', canvasLayoutStart)).toBe(true);
        });

        it('Should return false with not same x or y', () => {
            NotificationManager.error = jest.fn();
            expect(validateFigure({ x: 0, y: 0 }, { x: 1, y: 1 }, 'line', canvasLayoutStart)).toBe(false);
            expect(NotificationManager.error).toBeCalledWith(error.notSamePont, 'Error');
        });

        it('Should return false with invalid values less than mimal border value', () => {
            expect(validateFigure({ x: 0, y: 0 }, { x: 0, y: -1 }, 'line', canvasLayoutStart)).toBe(false);
        });

        it('Should return false with invalid values more than mimal border value', () => {
            expect(validateFigure({ x: 0, y: 0 }, { x: 0, y: 3 }, 'line', canvasLayoutStart)).toBe(false);
        });
    })
    describe('Validate Rectangle figure', () => {
        it('Should return true figure with right values', () => {
            expect(validateFigure({ x: 0, y: 0 }, { x: 1, y: 1 }, 'rectangle', canvasLayoutStart)).toBe(true);
        });

        it('Should return false with invalid values less than mimal border value', () => {
            expect(validateFigure({ x: -1, y: 0 }, { x: 1, y: 1 }, 'rectangle', canvasLayoutStart)).toBe(false);
        });

        it('Should return false with invalid values more than mimal border value', () => {
            expect(validateFigure({ x: 0, y: 0 }, { x: 3, y: 1 }, 'rectangle', canvasLayoutStart)).toBe(false);
        });
    })
    describe('Validate BusketFill figure', () => {
        it('Should return true with valid values', () => {
            expect(validateBusketFill({ x: 0, y: 1 }, color.fillBusketColor, canvasLayoutStart)).toBe(true);
        });

        it('Should return error with empty color', () => {
            NotificationManager.error = jest.fn();
            expect(validateBusketFill({ x: 0, y: 1 }, '', canvasLayoutStart)).toBe(false);
            expect(NotificationManager.error).toBeCalledWith(error.emptyColor, 'Error');
        });

        it('Should return false with values more than mimal border value', () => {
            expect(validateBusketFill({ x: 0, y: 11 }, color.fillBusketColor, canvasLayoutStart)).toBe(false);
        });

        it('Should return false with values less than mimal border value', () => {
            expect(validateBusketFill({ x: 0, y: -11 }, color.fillBusketColor, canvasLayoutStart)).toBe(false);
        });
    })
})
