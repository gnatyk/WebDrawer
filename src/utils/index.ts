import { Point, ElementCanvas } from '../declarations';
import { validatePoint } from '../validations/index';
import { color } from './constants';

export const drawLine = (point1: Point, point2: Point, canvasLayout: ElementCanvas[][]) => {
  const newCanvasLayout = canvasLayout.map(i => i.map(j => ({ ...j })));
  if (point1.x === point2.x) {
    //vertical
    const startPoint = point1.y > point2.y ? point2 : point1;
    const endPoint = point1.y > point2.y ? point1 : point2;
    for (let i: number = startPoint.y; i <= endPoint.y; i++) {
      newCanvasLayout[i][startPoint.x] = {
        background: color.defaultColor,
        isBorder: true,
      };
    }
  } else {
    //horizontal
    const startPoint = point1.x > point2.x ? point2 : point1;
    const endPoint = point1.x > point2.x ? point1 : point2;
    for (let i: number = startPoint.x; i <= endPoint.x; i++) {
      newCanvasLayout[startPoint.y][i] = {
        background: color.defaultColor,
        isBorder: true,
      };
    }
  }
  return newCanvasLayout;
};

export const drawRectangle = (point1: Point, point2: Point, canvasLayout: ElementCanvas[][]) => {
  const line1 = drawLine({ x: point1.x, y: point1.y }, { x: point2.x, y: point1.y }, canvasLayout);
  const line2 = drawLine({ x: point2.x, y: point1.y }, { x: point2.x, y: point2.y }, line1);
  const line3 = drawLine({ x: point2.x, y: point2.y }, { x: point1.x, y: point2.y }, line2);
  const line4 = drawLine({ x: point1.x, y: point2.y }, { x: point1.x, y: point1.y }, line3);
  return line4;
};

const isFilled = (point: Point, canvasLayout: ElementCanvas[][], color: string) => {
  return (canvasLayout[point.x][point.y].background === color || canvasLayout[point.x][point.y].isBorder)
}

const pointHash = (point: { x: number, y: number }) => {
  return `x${point.x}y${point.y}`
}

// new fillBusket
export const fillBusket = (point: Point, canvasLayout: ElementCanvas[][], color: string) => {
  const started = new Date().getTime();
  const cellsToFill = [point];
  const handledSells = new Set();
  handledSells.add(pointHash(point));
  let currentCell = point;
  while (cellsToFill.length) {
    currentCell = cellsToFill.shift()!!;

    canvasLayout[currentCell.x][currentCell.y].background = color;
    const rightPoint = { x: currentCell.x + 1, y: currentCell.y }
    if (!validatePoint(rightPoint, canvasLayout) && !isFilled(rightPoint, canvasLayout, color) && !handledSells.has(pointHash(rightPoint))) {
      cellsToFill.push(rightPoint);
      handledSells.add(pointHash(rightPoint));
    }
    const bottomPoint = { x: currentCell.x, y: currentCell.y + 1 }
    if (!validatePoint(bottomPoint, canvasLayout) && !isFilled(bottomPoint, canvasLayout, color) && !handledSells.has(pointHash(bottomPoint))) {
      cellsToFill.push(bottomPoint);
      handledSells.add(pointHash(bottomPoint));
    }
    const leftPoint = { x: currentCell.x - 1, y: currentCell.y }
    if (!validatePoint(leftPoint, canvasLayout) && !isFilled(leftPoint, canvasLayout, color) && !handledSells.has(pointHash(leftPoint))) {
      cellsToFill.push(leftPoint);
      handledSells.add(pointHash(leftPoint));
    }
    const topPoint = { x: currentCell.x, y: currentCell.y - 1 }
    if (!validatePoint(topPoint, canvasLayout) && !isFilled(topPoint, canvasLayout, color) && !handledSells.has(pointHash(topPoint))) {
      cellsToFill.push(topPoint);
      handledSells.add(pointHash(topPoint));
    }
  }

  const finished = new Date().getTime();
  console.log('took', finished - started); // display processing time
  return canvasLayout;
};

// previous fillBusket
export const fillBusketOld = (point: Point, canvasLayout: ElementCanvas[][], color: string) => {
  if (point.y === canvasLayout.length || point.y === -1) {
    return canvasLayout;
  }
  if (point.x === canvasLayout[point.y].length || point.x === -1) {
    return canvasLayout;
  }
  if (canvasLayout[point.y][point.x].background === color) {
    return canvasLayout;
  }
  if (canvasLayout[point.y][point.x].isBorder) {
    return canvasLayout;
  }

  canvasLayout[point.y][point.x].background = color;
  fillBusket({ x: point.x + 1, y: point.y }, canvasLayout, color);
  fillBusket({ x: point.x, y: point.y + 1 }, canvasLayout, color);
  fillBusket({ x: point.x - 1, y: point.y }, canvasLayout, color);
  fillBusket({ x: point.x, y: point.y - 1 }, canvasLayout, color);
  return canvasLayout;

}