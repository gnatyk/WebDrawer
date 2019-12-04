import React, { useState, useCallback } from 'react';
import Select from 'react-select';
import { Button, Input } from 'semantic-ui-react';
import { Point } from '../../declarations';
import './styles.scss';

const options = [
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'line', label: 'Line' },
  { value: 'busket_fill', label: 'Bucket Fill' },
];

interface ShapesControlType {
  changeShapesCoordinates: (point1: Point, point2: Point, shapeType: string) => void;
}

const ShapesControl: React.FC<ShapesControlType> = props => {
  const { changeShapesCoordinates } = props;

  const [shapeType, setShapeType] = useState<any>({});
  const [coordinateX1, setCoordinateX1] = useState<string>('');
  const [coordinateX2, setCoordinateX2] = useState<string>('');
  const [coordinateY1, setCoordinateY1] = useState<string>('');
  const [coordinateY2, setCoordinateY2] = useState<string>('');
  const [error, setError] = useState<string>('');

  const createShape = useCallback(() => {
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
  }, [coordinateX1, coordinateX2, coordinateY1, coordinateY2, changeShapesCoordinates]);

  return (
    <div className="shapes-container">
      <Select options={options} value={shapeType} onChange={value => setShapeType(value)} />
      {shapeType.value && (
        <div>
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
          <Button
            disabled={!coordinateX1 || !coordinateX2 || !coordinateY1 || !coordinateY2}
            onClick={createShape}
          >
            create
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShapesControl;
