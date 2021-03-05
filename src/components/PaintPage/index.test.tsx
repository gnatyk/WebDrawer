import React from 'react';
import ReactDOM from 'react-dom';
import PaintPage from './index';

describe('PaintPage component', () => {

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaintPage />, div);
    ReactDOM.unmountComponentAtNode(div);
    });
});
