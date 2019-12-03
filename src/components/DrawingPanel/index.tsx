import React from 'react';
import './styles.scss';

interface DrawingPanelTypes {
  canvasLayout: string[][];
}

const DrawingPanel: React.FC<DrawingPanelTypes> = props => {
  const { canvasLayout } = props;
  return (
    <div className="canvas-container">
      <div className="layout-container">
        {canvasLayout.map((i: string[], index: number) => (
          <div className="canvas-row" key={index}>
            {i.map((j: string, indexJ: number) => (
              <div key={indexJ} className="canvas-item" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawingPanel;
