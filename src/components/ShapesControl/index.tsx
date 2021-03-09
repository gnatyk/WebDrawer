import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { Button, Input } from 'semantic-ui-react';
import { Point, ElementCanvas } from '../../declarations';
import { validateFigure, validateBusketFill } from '../../validations';
import './styles.scss';

const options = [
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'line', label: 'Line' },
  { value: 'busket_fill', label: 'Bucket Fill' },
];

interface ShapesControlType {
  lineHandler: (point1: Point, point2: Point) => void;
  rectangleHandler: (point1: Point, point2: Point) => void;
  canvasLayout: ElementCanvas[][];
  bucketFillHandler: (point: Point, color: string) => void;
}

const ShapesControl: React.FC<ShapesControlType> = (props) => {
  const { lineHandler, rectangleHandler, bucketFillHandler, canvasLayout } = props;

  const [shapeType, setShapeType] = useState<any>({});
  const [x1, setX1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [color, setColor] = useState<string>('#77bae9');

  const disableButton = useMemo(
    () => (shapeType.value === 'busket_fill' ? !x1 || !y1 : !x1 || !x2 || !y1 || !y2),
    [shapeType, x1, y1, x2, y2],
  );

  const changeType = useCallback((value: { value: string; label: string }) => {
    setShapeType(value);
    setX1('');
    setX2('');
    setY1('');
    setY2('');
  }, []);

  const createShape = useCallback(() => {
    if (shapeType.value === 'line') {
      const firstPoint = { x: parseInt(x1) - 1, y: parseInt(y1) - 1 };
      const secondPoint = { x: parseInt(x2) - 1, y: parseInt(y2) - 1 };
      const isValid = validateFigure(firstPoint, secondPoint, 'line', canvasLayout);
      if (isValid) {
        lineHandler(firstPoint, secondPoint);
      }
    }
    if (shapeType.value === 'rectangle') {
      const firstPoint = { x: parseInt(x1) - 1, y: parseInt(y1) - 1 };
      const secondPoint = { x: parseInt(x2) - 1, y: parseInt(y2) - 1 };
      const isValid = validateFigure(firstPoint, secondPoint, 'rectangle', canvasLayout);
      if (isValid) {
        rectangleHandler(firstPoint, secondPoint);
      }
    }
    if (shapeType.value === 'busket_fill') {
      const point = { x: parseInt(x1) - 1, y: parseInt(y1) - 1 };
      const isValid = validateBusketFill(point, color, canvasLayout);
      if (isValid) {
        bucketFillHandler(point, color);
      }
    }
  }, [
    x1,
    x2,
    y1,
    y2,
    color,
    bucketFillHandler,
    rectangleHandler,
    lineHandler,
    canvasLayout,
    shapeType.value,
  ]);

  return (
    <div className="shapes-container">
      <Select options={options} value={shapeType} onChange={(value) => changeType(value!!)} />
      {shapeType.value && (
        <div>
          {shapeType.value !== 'busket_fill' ? (
            <div className="inputs-container">
              <div className="imput-row">
                <Input placeholder="Enter x1" value={x1} onChange={(e) => setX1(e.target.value)} />
                <Input placeholder="Enter x2" value={x2} onChange={(e) => setX2(e.target.value)} />
              </div>
              <div className="imput-row">
                <Input placeholder="Enter y1" value={y1} onChange={(e) => setY1(e.target.value)} />
                <Input placeholder="Enter y2" value={y2} onChange={(e) => setY2(e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="inputs-container">
              <div className="imput-row">
                <Input placeholder="Enter x1" value={x1} onChange={(e) => setX1(e.target.value)} />
                <Input placeholder="Enter y1" value={y1} onChange={(e) => setY1(e.target.value)} />
              </div>
              <div className="imput-row">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
            </div>
          )}
          <Button disabled={disableButton} onClick={createShape}>
            create
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShapesControl;
