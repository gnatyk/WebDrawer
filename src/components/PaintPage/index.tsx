import React, { useState, useEffect, useCallback } from 'react';
import { CanvasCoordinatesTypes, ShapeCoordinatesTypes } from '../../declarations';
import CanvasControl from '../CanvasControl';
import DrawingPanel from '../DrawingPanel';
import ShapesControl from '../ShapesControl';

import './styles.scss';

const PaintPage: React.FC = () => {
  const [canvasCoordinates, setCanvasCoordinates] = useState<Partial<CanvasCoordinatesTypes>>({});
  const [shapeCoordinates, setShapeCoordinates] = useState<Partial<ShapeCoordinatesTypes>>({});
  const [canvasLayout, setCanvasLayout] = useState<string[][]>([]);

  const createCanvasLayout = useCallback((x: number, y: number) => {
    let matrix = [];
    for (let i: number = 0; i < y; i++) {
      const array = new Array(x);
      matrix[i] = array.fill('', 0, array.length);
    }
    setCanvasLayout(matrix);
  }, []);

  useEffect(() => {
    if (canvasCoordinates.XCoordinate && canvasCoordinates.YCoordinate) {
      createCanvasLayout(canvasCoordinates.XCoordinate, canvasCoordinates.YCoordinate);
    }
  }, [createCanvasLayout, canvasCoordinates]);

  const changeCanvasCoordinates = (coordinates: CanvasCoordinatesTypes) => {
    setCanvasCoordinates(coordinates);
  };

  const changeShapesCoordinates = useCallback(
    (coordinates: ShapeCoordinatesTypes, shapeType: string) => {
      console.log(coordinates, 'ShapeCoordinatesTypes');
      console.log(shapeType, 'ShapeCoordinatesTypes');
    },
    [],
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
