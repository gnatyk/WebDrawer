import { Point, ElementCanvas } from '../declarations';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { error } from '../utils/constants';

export const validateBusketFill = (
  point: Point,
  color: string,
  canvasLayout: ElementCanvas[][],
) => {
  let isValid = true;
  const validateError = validatePoint(point, canvasLayout);
  if (validateError) {
    NotificationManager.error(error, 'Error');
    isValid = false;
  }
  if (!color) {
    NotificationManager.error(error.emptyColor, 'Error');
    isValid = false;
  }
  return isValid;
};

export const validateFigure = (
  point1: Point,
  point2: Point,
  type: string,
  canvasLayout: ElementCanvas[][],
) => {
  let isValid = true;
  if (type === 'line') {
    const errorFirstPoint = validatePoint(point1, canvasLayout);
    const errorSecondPoint = validatePoint(point2, canvasLayout);
    const lineError = errorFirstPoint || errorSecondPoint;
    if (lineError) {
      NotificationManager.error(lineError, 'Error');
      isValid = false;
    } else if (point1.x !== point2.x && point1.y !== point2.y) {
      NotificationManager.error(error.notSamePont, 'Error');
      isValid = false;
    }
  }
  if (type === 'rectangle') {
    const errorFirstPoint = validatePoint(point1, canvasLayout);
    const errorSecondPoint = validatePoint(point2, canvasLayout);
    const rectangleError = errorFirstPoint || errorSecondPoint;
    if (rectangleError) {
      NotificationManager.error(rectangleError, 'Error');
      isValid = false;
    }
  }
  return isValid;
};

export const validatePoint = (point: Point, canvasLayout: ElementCanvas[][]) => {
  const { x, y } = point;
  let textError = '';
  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    textError = error.notNumber;
  }
  if (x >= canvasLayout[0].length || x < 0) {
    textError = error.outOfField;
  }
  if (y >= canvasLayout.length || y < 0) {
    textError = error.outOfField;
  }
  return textError;
};
