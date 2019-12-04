import { Point, ElementCanvas } from '../declarations';

export const drawLine = (point1: Point, point2: Point, canvasLayout: ElementCanvas[][]) => {
  const newCanvasLayout = canvasLayout.map(i => i.map(j => ({ ...j })));
  if (point1.x === point2.x) {
    //vertical
    const startPoint = point1.y > point2.y ? point2 : point1;
    const endPoint = point1.y > point2.y ? point1 : point2;
    for (let i: number = startPoint.y - 1; i < endPoint.y; i++) {
      newCanvasLayout[i][startPoint.x - 1] = {
        background: 'red',
        isBorder: true,
      };
    }
  } else {
    //horizontal
    const startPoint = point1.x > point2.x ? point2 : point1;
    const endPoint = point1.x > point2.x ? point1 : point2;
    for (let i: number = startPoint.x - 1; i < endPoint.x; i++) {
      newCanvasLayout[startPoint.y - 1][i] = {
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
