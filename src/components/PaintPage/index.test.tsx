import React, { useState as useStateMock } from 'react';
import { Button, Input } from 'semantic-ui-react';
import {shallow, mount} from '../../enzyme';
import PaintPage from './index';
import ShapesControl from '../PaintPage';

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
//   }));

describe('<PaintPage />', () => {
  //  const setCanvasLayout = jest.fn();

    beforeEach(() => {
   //   (useStateMock as jest.Mock).mockImplementation(canvasLayout => [canvasLayout, setCanvasLayout]);
    });

    it('Should render ShapesControl if canvas created', () => {
        const wrapper = shallow(<PaintPage />);

    });
})


