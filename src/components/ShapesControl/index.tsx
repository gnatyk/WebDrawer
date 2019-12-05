import React, { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { Button, Input } from 'semantic-ui-react';
import { Point, ElementCanvas } from '../../declarations';
import './styles.scss';

const options = [
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'line', label: 'Line' },
  { value: 'busket_fill', label: 'Bucket Fill' },
];

interface ShapesControlType {
  changeShapesCoordinates: (point1: Point, point2: Point, shapeType: string) => void;
  canvasLayout: ElementCanvas[][];
  bucketFillHandler: (point: Point, color: string) => void;
}

const ShapesControl: React.FC<ShapesControlType> = props => {
  const { changeShapesCoordinates, canvasLayout, bucketFillHandler } = props;

  const [shapeType, setShapeType] = useState<any>({});
  const [coordinateX1, setCoordinateX1] = useState<string>('');
  const [coordinateX2, setCoordinateX2] = useState<string>('');
  const [coordinateY1, setCoordinateY1] = useState<string>('');
  const [coordinateY2, setCoordinateY2] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [error, setError] = useState<string>('');

  const disableButton = useMemo(
    () =>
      shapeType.value === 'busket_fill'
        ? !coordinateX1 || !coordinateY1
        : !coordinateX1 || !coordinateX2 || !coordinateY1 || !coordinateY2,
    [shapeType, coordinateX1, coordinateY1, coordinateX2, coordinateY2],
  );

  const createBusketFill = useCallback(() => {
    bucketFillHandler({ x: parseInt(coordinateX1) - 1, y: parseInt(coordinateY1) - 1 }, color);
  }, [bucketFillHandler, coordinateX1, coordinateY1, color]);

  const createShape = useCallback(() => {
    if (shapeType.value === 'busket_fill') {
      createBusketFill();
    } else {
      if (
        !parseInt(coordinateX1) ||
        !parseInt(coordinateX2) ||
        !parseInt(coordinateY1) ||
        !parseInt(coordinateY2)
      ) {
        setError('coordinates should be a number!');
      } else {
        changeShapesCoordinates(
          { x: parseInt(coordinateX1), y: parseInt(coordinateY1) },
          { x: parseInt(coordinateX2), y: parseInt(coordinateY2) },
          shapeType.value,
        );
      }
    }
  }, [
    coordinateX1,
    coordinateX2,
    coordinateY1,
    coordinateY2,
    changeShapesCoordinates,
    createBusketFill,
  ]);

  return (
    <div className="shapes-container">
      <Select options={options} value={shapeType} onChange={value => setShapeType(value)} />
      {shapeType.value && (
        <div>
          {shapeType.value !== 'busket_fill' ? (
            <div className="inputs-container">
              <div className="imput-row">
                <Input
                  placeholder="Enter x1"
                  value={coordinateX1}
                  onChange={e => setCoordinateX1(e.target.value)}
                />
                <Input
                  placeholder="Enter x2"
                  value={coordinateX2}
                  onChange={e => setCoordinateX2(e.target.value)}
                />
              </div>
              <div className="imput-row">
                <Input
                  placeholder="Enter y1"
                  value={coordinateY1}
                  onChange={e => setCoordinateY1(e.target.value)}
                />
                <Input
                  placeholder="Enter y2"
                  value={coordinateY2}
                  onChange={e => setCoordinateY2(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="inputs-container">
              <div className="imput-row">
                <Input
                  placeholder="Enter x1"
                  value={coordinateX1}
                  onChange={e => setCoordinateX1(e.target.value)}
                />
                <Input
                  placeholder="Enter y1"
                  value={coordinateY1}
                  onChange={e => setCoordinateY1(e.target.value)}
                />
              </div>
              <div className="imput-row">
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
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
