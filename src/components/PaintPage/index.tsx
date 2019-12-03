import React, { useState, useEffect, useCallback } from 'react';
import { CanvasCoordinatesTypes } from '../../declarations';
import CanvasControl from '../CanvasControl';
import DrawingPanel from '../DrawingPanel';
import ShapesControl from '../ShapesControl';

import './styles.scss';

const PaintPage: React.FC = () => {
  const [canvasCoordinates, setCanvasCoordinates] = useState<Partial<CanvasCoordinatesTypes>>({});
  const [canvasLayout, setCanvasLayout] = useState<string[][]>([]);

  useEffect(() => {
    if (canvasCoordinates.XCoordinate && canvasCoordinates.YCoordinate) {
      createCanvasLayout(canvasCoordinates.XCoordinate, canvasCoordinates.YCoordinate);
    }
  }, [canvasCoordinates]);

  const createCanvasLayout = useCallback((x: number, y: number) => {
    let matrix = [];
    for (let i: number = 0; i < y; i++) {
      const array = new Array(x);
      matrix[i] = array.fill('', 0, array.length);
    }
    setCanvasLayout(matrix);
  }, []);

  const changeCanvasCoordinates = (coordinates: CanvasCoordinatesTypes) => {
    setCanvasCoordinates(coordinates);
  };
  return (
    <div className="paint-container">
      <div>
        <CanvasControl changeCanvasCoordinates={changeCanvasCoordinates} />
        {canvasCoordinates.XCoordinate && <ShapesControl />}
      </div>
      <DrawingPanel canvasLayout={canvasLayout} />
    </div>
  );
};

export default PaintPage;
