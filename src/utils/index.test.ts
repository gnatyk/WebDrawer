import { drawLine, drawRectangle, fillBusket } from './index';
import { Point, ElementCanvas } from '../declarations';
import { color } from './constants';
import { createCanvas } from '../components/PaintPage'

const canvasLayoutStart = createCanvas(4, 4);

describe('Utils', () => {
  describe('drawLine', () => {
    it('Should draw horizontal line with valid values', () => {
      const expectedCanvas = fillPoints([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color.defaultColor, canvasLayoutStart);
      expect(drawLine({ x: 0, y: 0 }, { x: 2, y: 0 }, canvasLayoutStart)).toEqual(expectedCanvas);
    });

    it('Should draw vertical line with valid values', () => {
      const expectedCanvas = fillPoints([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], color.defaultColor, canvasLayoutStart);
      expect(drawLine({ x: 0, y: 0 }, { x: 0, y: 2 }, canvasLayoutStart)).toEqual(expectedCanvas);
    });
  })
  describe('rectangle', () => {
    it('Should draw rectangle', () => {
      const expectedCanvas = fillPoints([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], color.defaultColor, canvasLayoutStart);
      expect(drawRectangle({ x: 0, y: 0 }, { x: 1, y: 1 }, canvasLayoutStart)).toEqual(expectedCanvas);
    });
  })

  describe('FillBusket', () => {

    it('All canvas should be filled color', () => {
      const canvasLayoutStart = createCanvas(2, 2);
      const expectedCanvas = fillPoints([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], color.fillBusketColor, canvasLayoutStart, false);

      expect(fillBusket({ x: 0, y: 1 }, canvasLayoutStart, color.fillBusketColor)).toEqual(expectedCanvas);
    });


    it('Inside figure should be filled color', () => {
      const canvas1 = drawRectangle({ x: 0, y: 0 }, { x: 3, y: 3 }, canvasLayoutStart)
      const canvas2 = fillPoints([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }], color.fillBusketColor, canvas1, false);
      expect(fillBusket({ x: 1, y: 1 }, canvas1, color.fillBusketColor)).toEqual(canvas2);
    });

    it('Inside figure should not be filled color', () => {
      const canvas1 = drawRectangle({ x: 0, y: 0 }, { x: 3, y: 3 }, canvasLayoutStart)
      expect(fillBusket({ x: 0, y: 1 }, canvas1, color.fillBusketColor)).toEqual(canvas1);

    })
  })

  const fillPoints = (arrayOfPoints: Point[], color: string, canvas: ElementCanvas[][], isBorder: boolean = true) => {
    const newCanvas = canvas.map((row: ElementCanvas[]) => row.map((elementCanvas: ElementCanvas) => ({ ...elementCanvas })))
    arrayOfPoints.forEach((point: Point) => {
      newCanvas[point.y][point.x].background = color;
      newCanvas[point.y][point.x].isBorder = isBorder;
    })
    return newCanvas;
  }
});
