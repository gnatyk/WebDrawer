import React, { useState, useEffect, useCallback } from 'react';
import { CanvasCoordinatesTypes } from '../../declarations';
import './styles.scss';
import CanvasInputs from '../CanvasInputs';


const PaintPage:React.FC = () => {
   const [canvasCoordinates, setCanvasCoordinates] = useState<Partial<CanvasCoordinatesTypes>>({});
   const [canvasLayout, setCanvasLayout] = useState<string[][]>([]);

   useEffect(() => {
       if(canvasCoordinates.XCoordinate && canvasCoordinates.YCoordinate) {
           createCanvasLayout(canvasCoordinates.XCoordinate, canvasCoordinates.YCoordinate)
       }
   },[canvasCoordinates])

   const createCanvasLayout = useCallback((x: string, y: string) => {
    var matrix = [];
    for(let i: number=0; i<parseInt(y); i++) {
        const array = new Array(parseInt(x));
        matrix[i] = array.fill('', 0, array.length);
    }
    setCanvasLayout(matrix);
   }, []);

    const changeCanvasCoordinates = (coordinates: CanvasCoordinatesTypes) => {
        setCanvasCoordinates(coordinates);
    }
    return (
        <div className="paint-container">
            <div>
            <CanvasInputs changeCanvasCoordinates={changeCanvasCoordinates}/>
                <div></div>
                <div></div>
            </div>
            <div className="canvas-container">
                <div className="layout-container">{canvasLayout.map((i: string[], index: number) => 
                    <div className='canvas-row' key={index}>
                        {i.map((j: string, index: number) => <div key={index} className='canvas-item'/>)}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default PaintPage;
