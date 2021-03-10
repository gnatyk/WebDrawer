import React, { useState } from 'react';
import { ElementCanvas, Point } from '../../declarations';
import { drawLine, drawRectangle, fillBusket } from '../../utils';
import CanvasControl from '../CanvasControl';
import DrawingPanel from '../DrawingPanel';
import ShapesControl from '../ShapesControl';
import './styles.css';

export const createCanvas = (x: number, y: number) => {
  const matrix = [];
  for (let i: number = 0; i < y; i++) {
    const array = new Array(x);
    matrix[i] = array.fill({ isBorder: false }, 0, array.length);
  }
  return matrix;
};

const PaintPage: React.FC = () => {
  const [canvasLayout, setCanvasLayout] = useState<ElementCanvas[][]>([]);

  const onSetCanvas = (x: number, y: number) => {
    const matrix = createCanvas(x, y);
    setCanvasLayout(matrix);
  };

  const lineHandler = (point1: Point, point2: Point) => {
    const newCanvasLayout = drawLine(point1, point2, canvasLayout);
    setCanvasLayout(newCanvasLayout);
  };

  const rectangleHandler = (point1: Point, point2: Point) => {
    const newCanvasLayout = drawRectangle(point1, point2, canvasLayout);
    setCanvasLayout(newCanvasLayout);
  };

  const bucketFillHandler = (point: Point, color: string) => {
    const copyCanvasLayout = canvasLayout.map((i) => i.map((j) => ({ ...j })));
    const newCanvasLayout = fillBusket(point, copyCanvasLayout, color);
    setCanvasLayout(newCanvasLayout);
  };

  return (
    <div className="paint-container">
      <div style={{ position: 'relative' }}>
        <CanvasControl createCanvas={onSetCanvas} />
        {canvasLayout.length > 0 && (
          <ShapesControl
            rectangleHandler={rectangleHandler}
            canvasLayout={canvasLayout}
            bucketFillHandler={bucketFillHandler}
            lineHandler={lineHandler}
          />
        )}
      </div>
      <DrawingPanel canvasLayout={canvasLayout} />
    </div>
  );
};

export default PaintPage;
