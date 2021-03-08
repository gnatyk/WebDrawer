import { validatePoint, validateFigure, validateBusketFill } from './index';
// @ts-ignore
import { NotificationManager } from 'react-notifications';


const canvasLayoutStart = [
    [{isBorder: false, background:''}, {isBorder: false, background:''}],
    [{isBorder: false, background:''}, {isBorder: false, background:''}]
];

test('Validate point with right value', () => {
    expect(validatePoint({x: 0, y: 0}, canvasLayoutStart)).toBe('');
});

test('Validate point with not number value', () => {
    //@ts-ignore
    expect(validatePoint({x: 'f', y: 0}, canvasLayoutStart)).toBe('Must be a number');
});

test('Validate point with x less than mimal border value', () => {
    expect(validatePoint({x: -1 , y: 0}, canvasLayoutStart)).toBe('You are out of the field');
});

test('Validate point with y less than mimal border value', () => {
    expect(validatePoint({x: 0 , y: -1}, canvasLayoutStart)).toBe('You are out of the field');
});

test('Validate point with x more than mimal border value', () => {
    expect(validatePoint({x: 2 , y: 0}, canvasLayoutStart)).toBe('You are out of the field');
});

test('Validate point with y more than mimal border value', () => {
    expect(validatePoint({x: 0 , y: 2}, canvasLayoutStart)).toBe('You are out of the field');
});

test('Validate line figure with right value', () => {
    expect(validateFigure({x: 0 , y: 0}, {x: 0, y: 1}, 'line', canvasLayoutStart)).toBe(true);
});

test('Validate line figure with not same x or y', () => {
    NotificationManager.error = jest.fn();
    expect(validateFigure({x: 0 , y: 0}, {x: 1, y: 1}, 'line', canvasLayoutStart)).toBe(false);
    expect(NotificationManager.error).toBeCalledWith('The line must have the same x or y ', 'Error');
});

test('Validate line figure with invalid values less than mimal border value', () => {
    expect(validateFigure({x: 0 , y: 0}, {x: 0, y: -1}, 'line', canvasLayoutStart)).toBe(false);
});

test('Validate line figure with invalid values more than mimal border value', () => {
    expect(validateFigure({x: 0 , y: 0}, {x: 0, y: 3}, 'line', canvasLayoutStart)).toBe(false);
});

test('Validate rectangle figure with right values', () => {
    expect(validateFigure({x: 0 , y: 0}, {x: 1, y: 1}, 'rectangle', canvasLayoutStart)).toBe(true);
});

test('Validate rectangle figure with invalid values less than mimal border value', () => {
    expect(validateFigure({x: -1 , y: 0}, {x: 1, y: 1}, 'rectangle', canvasLayoutStart)).toBe(false);
});

test('Validate rectangle figure with invalid values more than mimal border value', () => {
    expect(validateFigure({x: 0 , y: 0}, {x: 3, y: 1}, 'rectangle', canvasLayoutStart)).toBe(false);
});

test('Validate BusketFill with valid values', () => {
    expect(validateBusketFill({x: 0 , y: 1}, '#333', canvasLayoutStart)).toBe(true);
});

test('Validate BusketFill with empty color', () => {
    NotificationManager.error = jest.fn();
    expect(validateBusketFill({x: 0 , y: 1}, '', canvasLayoutStart)).toBe(false);
    expect(NotificationManager.error).toBeCalledWith('Please choose a color!', 'Error');
});

test('Validate BusketFill with values more than mimal border value', () => {
    expect(validateBusketFill({x: 0 , y: 11}, '#333', canvasLayoutStart)).toBe(false);
});

test('Validate BusketFill with values less than mimal border value', () => {
    expect(validateBusketFill({x: 0 , y: -11}, '#333', canvasLayoutStart)).toBe(false);
});