import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { CanvasCoordinatesTypes } from '../../declarations';

interface CanvasInputsType {
    changeCanvasCoordinates: (coordinats: CanvasCoordinatesTypes) => void;
}

const CanvasInputs:React.FC<CanvasInputsType> = (props) => {
    const [isCreateCanvas, setCreateCanvas] = useState<boolean>(false);
    const [XCoordinate, setXCoordinate] = useState<string>('');
    const [YCoordinate, setYCoordinate] = useState<string>('');

    const createCanvas = () => {
        props.changeCanvasCoordinates({XCoordinate, YCoordinate})
    }
    return (
        <div>
        <Button onClick={() => setCreateCanvas(true)}>create canvas</Button>
        {isCreateCanvas && (
            <div className="canvas-input-container">
                <div className="input-container">
                <Input 
                    className="input-margin" 
                    placeholder='Enter X'
                    value={XCoordinate}
                    onChange={(e) => setXCoordinate(e.target.value)}
                />
                <Input 
                    placeholder='Enter Y' 
                    value={YCoordinate}
                    onChange={(e) => setYCoordinate(e.target.value)}
                />
                </div>
                 <Button disabled={!XCoordinate || !YCoordinate} onClick={createCanvas}>create</Button>
            </div>
        )}
    </div>
    )
}

export default CanvasInputs;