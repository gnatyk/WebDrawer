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

  const validate = useCallback(() => {
    let isValid = true;
    const numberX = parseInt(x) - 1;
    const numberY = parseInt(y) - 1;
    if (!numberX || !numberY) {
      NotificationManager.error('Please enter a number!', 'Error');
      isValid = false;
    }
    if (numberX >= 24 || numberX < 0 || numberY >= 16 || numberY < 0) {
      NotificationManager.error('You are out of the field!', 'Error');
      isValid = false;
    }
    return isValid;
  }, [x, y]);

  const onCreateCanvas = useCallback(() => {
    const numbberX = parseInt(x) - 1;
    const numbberY = parseInt(y) - 1;
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
        </div>
      )}
    </div>
  );
};

export default CanvasControl;
