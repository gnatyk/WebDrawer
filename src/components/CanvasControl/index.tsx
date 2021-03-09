import React, { useState, useCallback } from 'react';
import { Button, Input } from 'semantic-ui-react';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import './styles.scss';

interface CanvasControlType {
  createCanvas: (x: number, y: number) => void;
}

const CanvasControl: React.FC<CanvasControlType> = props => {
  const { createCanvas } = props;
  const [isCreateCanvas, setCreateCanvas] = useState<boolean>(false);
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');

  const validate = () => {
    let isValid = true;
    const numberX = parseInt(x);
    const numberY = parseInt(y);
    if (
      typeof numberX !== 'number' ||
      typeof numberY !== 'number' ||
      isNaN(numberX) ||
      isNaN(numberY)
    ) {
      NotificationManager.error('Please enter a number!', 'Error');
      isValid = false;
    } else if (numberX > 100 || numberX < 1 || numberY > 100 || numberY < 1) {
      NotificationManager.error('You are out of the field!', 'Error');
      isValid = false;
    }
    return isValid;
  };

  const onCreateCanvas = useCallback(() => {
    const numbberX = parseInt(x);
    const numbberY = parseInt(y);
    const isValid = validate();
    if (isValid) {
      createCanvas(numbberX, numbberY);
    }
  }, [x, y, createCanvas, validate]);
  return (
    <div>
      <Button onClick={() => setCreateCanvas(true)}>Create canvas</Button>
      {isCreateCanvas && (
        <div className="canvas-input-container">
          <div className="input-container">
            <Input
              className="input-margin"
              placeholder="Enter X"
              value={x}
              onChange={e => setX(e.target.value)}
            />
            <Input placeholder="Enter Y" value={y} onChange={e => setY(e.target.value)} />
          </div>
          <Button disabled={!x || !y} onClick={() => onCreateCanvas()}>
            Create
          </Button>
          <Button disabled={!x || !y} className="reset-button" onClick={() => {setY(''); setX(''); createCanvas(0,0)}}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default CanvasControl;
