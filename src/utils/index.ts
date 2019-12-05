import { Point, ElementCanvas } from '../declarations';

export const drawLine = (point1: Point, point2: Point, canvasLayout: ElementCanvas[][]) => {
  const newCanvasLayout = canvasLayout.map(i => i.map(j => ({ ...j })));
  if (point1.x === point2.x) {
    //vertical
    const startPoint = point1.y > point2.y ? point2 : point1;
    const endPoint = point1.y > point2.y ? point1 : point2;
    for (let i: number = startPoint.y; i <= endPoint.y; i++) {
      newCanvasLayout[i][startPoint.x] = {
        background: 'red',
        isBorder: true,
      };
    }
  } else {
    //horizontal
    const startPoint = point1.x > point2.x ? point2 : point1;
    const endPoint = point1.x > point2.x ? point1 : point2;
    for (let i: number = startPoint.x; i <= endPoint.x; i++) {
      newCanvasLayout[startPoint.y][i] = {
        background: 'red',
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

export const fillBusket = (point: Point, canvasLayout: ElementCanvas[][], color: string) => {
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
};
