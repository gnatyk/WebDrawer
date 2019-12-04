import React, { useState, useEffect, useCallback } from 'react';
import { CanvasCoordinatesTypes, ElementCanvas, Point } from '../../declarations';
import { drawLine, drawRectangle } from '../../utils';
import CanvasControl from '../CanvasControl';
import DrawingPanel from '../DrawingPanel';
import ShapesControl from '../ShapesControl';

import './styles.scss';

const PaintPage: React.FC = () => {
  const [canvasLayout, setCanvasLayout] = useState<ElementCanvas[][]>([]);
  const [canvasCoordinates, setCanvasCoordinates] = useState<Partial<CanvasCoordinatesTypes>>({});

  const createCanvasLayout = useCallback((x: number, y: number) => {
    let matrix = [];
    for (let i: number = 0; i < y; i++) {
      const array = new Array(x);
      matrix[i] = array.fill({ isBorder: false }, 0, array.length);
    }
    setCanvasLayout(matrix);
  }, []);

  useEffect(() => {
    if (canvasCoordinates.XCoordinate && canvasCoordinates.YCoordinate) {
      createCanvasLayout(canvasCoordinates.XCoordinate, canvasCoordinates.YCoordinate);
    }
  }, [createCanvasLayout, canvasCoordinates]);

  const changeCanvasCoordinates = useCallback(
    (coordinates: CanvasCoordinatesTypes) => {
      setCanvasCoordinates(coordinates);
    },
    [setCanvasCoordinates],
  );

  const lineHandler = useCallback(
    (point1: Point, point2: Point) => {
      const newCanvasLayout = drawLine(point1, point2, canvasLayout);
      setCanvasLayout(newCanvasLayout);
    },
    [canvasLayout, setCanvasLayout],
  );

  const RectangleHandler = useCallback(
    (point1: Point, point2: Point) => {
      const newCanvasLayout = drawRectangle(point1, point2, canvasLayout);
      setCanvasLayout(newCanvasLayout);
    },
    [canvasLayout, setCanvasLayout],
  );

  const changeShapesCoordinates = useCallback(
    (point1: Point, point2: Point, shapeType: string) => {
      if (shapeType === 'line') {
        lineHandler(point1, point2);
      }
      if (shapeType === 'rectangle') {
        RectangleHandler(point1, point2);
      }
    },
    [lineHandler, RectangleHandler],
  );

  return (
    <div className="paint-container">
      <div>
        <CanvasControl changeCanvasCoordinates={changeCanvasCoordinates} />
        {canvasCoordinates.XCoordinate && (
          <ShapesControl changeShapesCoordinates={changeShapesCoordinates} />
        )}
      </div>
      <DrawingPanel canvasLayout={canvasLayout} />
    </div>
  );
};

export default PaintPage;