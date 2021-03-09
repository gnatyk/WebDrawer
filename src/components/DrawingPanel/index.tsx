import React from 'react';
import { ElementCanvas } from '../../declarations';
import './styles.scss';

interface DrawingPanelTypes {
  canvasLayout: ElementCanvas[][];
}

const DrawingPanel: React.FC<DrawingPanelTypes> = props => {
  const { canvasLayout } = props;
  return (
    <div>
      <div>Max: x = 100 y = 100</div>
      <div className="canvas-container">
        <div className="layout-container">
          {canvasLayout.map((i: ElementCanvas[], index: number) => (
            <div className="canvas-row" key={index}>
              {i.map((j: ElementCanvas, indexJ: number) => (
                <div key={indexJ} className="canvas-item" style={{ background: j.background }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawingPanel;
