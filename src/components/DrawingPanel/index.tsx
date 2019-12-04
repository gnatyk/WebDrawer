import React from 'react';
import './styles.scss';
import { ElementCanvas } from '../../declarations';

interface DrawingPanelTypes {
  canvasLayout: ElementCanvas[][];
}

const DrawingPanel: React.FC<DrawingPanelTypes> = props => {
  const { canvasLayout } = props;
  return (
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
  );
};

export default DrawingPanel;
