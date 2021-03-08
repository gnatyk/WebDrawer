import React from 'react';
import {shallow} from '../../enzyme';
import Select from 'react-select';
// @ts-ignore
import { Button, Input } from 'semantic-ui-react';
import { validateFigure, validateBusketFill } from '../../validations';
import ShapesControl from './index';


jest.mock('../../validations', () => (
    {
      ...(jest.requireActual('../../validations')),
      validateFigure: jest.fn(),
      validateBusketFill: jest.fn()
    }
  ))

describe('<ShapesControl />', () => {
     const lineHandler = jest.fn();
     const rectangleHandler = jest.fn();
     const bucketFillHandler = jest.fn();
     beforeEach(() => {
        (validateFigure as jest.Mock).mockReturnValue(true);
        (validateBusketFill as jest.Mock).mockReturnValue(true);
     })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should display line input if select line type', () => {
        const wrapper = shallow(<ShapesControl lineHandler={lineHandler} rectangleHandler={rectangleHandler} bucketFillHandler={bucketFillHandler} canvasLayout={[]} />)
        const select = wrapper.find(Select);
        select.simulate('change', { value: 'line', label: 'Line' });
        expect(wrapper.find(Input)).toHaveLength(4);
      
    });

    it('Should display Bucket Fill input if select Bucket Fill', () => {
        const wrapper = shallow(<ShapesControl lineHandler={lineHandler} rectangleHandler={rectangleHandler} bucketFillHandler={bucketFillHandler} canvasLayout={[]} />)
        const select = wrapper.find(Select);
        select.simulate('change', { value: 'busket_fill', label: 'Bucket Fill' });
        expect(wrapper.find(Input)).toHaveLength(2)
    });

    it('Should call lineHandler with Line input values', () => {
        const data = shallowShapesControl();
        const { wrapper, canvasLayout} = data;
        const point1 = { x: 0, y: 1};
        const point2 = { x: 0, y: 3};
        wrapper.find(Select).simulate('change', { value: 'line', label: 'Line' });
        submitShapeForm({ point1, point2 }, 'line', wrapper);
        expect(validateFigure).toHaveBeenCalledWith(point1, point2, 'line', canvasLayout)
        expect(validateFigure).toBeCalledTimes(1);
        expect(lineHandler).toHaveBeenCalledWith(point1, point2);
    });

    it('Should call rectangleHandler with rectangle input values', () => {
        const data = shallowShapesControl();
        const { wrapper, canvasLayout} = data;
        const point1 = { x: 0, y: 1};
        const point2 = { x: 0, y: 3};
        wrapper.find(Select).simulate('change', { value: 'rectangle', label: 'Rectangle' });
        submitShapeForm({ point1, point2 }, 'rectangle', wrapper);
        expect(validateFigure).toHaveBeenCalledWith(point1, point2, 'rectangle', canvasLayout)
        expect(validateFigure).toBeCalledTimes(1);
        expect(rectangleHandler).toHaveBeenCalledWith(point1, point2);
    });

    it('Should call bucketFillHandler with Bucket Fill input values', () => {
        const data = shallowShapesControl();
        const { wrapper, canvasLayout} = data;
        const point1 = { x: 0, y: 3};
        const color = '#333';
        wrapper.find(Select).simulate('change', { value: 'busket_fill', label: 'Bucket Fill' });
        submitShapeForm({point1}, 'busket_fill', wrapper);
        expect(validateBusketFill).toHaveBeenCalledWith(point1, color, canvasLayout)

        expect(validateBusketFill).toBeCalledTimes(1);
        expect(bucketFillHandler).toHaveBeenCalledWith(point1, color);
    });

    it('Should not call lineHandler with invalid input values', () => {
        (validateFigure as jest.Mock).mockReturnValue(false)
 
        const data = shallowShapesControl();
        const { wrapper, canvasLayout} = data;
        const point1 = { x: 0, y: 0};
        const point2 = { x: 2, y: 0};
      
        wrapper.find(Select).simulate('change', { value: 'line', label: 'Line' });
        submitShapeForm({point1, point2},'line', wrapper); //out of the field
        expect(validateFigure).toHaveBeenCalledWith(point1, point2, 'line', canvasLayout)
        expect(validateFigure).toBeCalledTimes(1);
        expect(lineHandler).toBeCalledTimes(0);

        submitShapeForm({ point1, point2 }, 'line', wrapper);// The line must have the same x or y
        expect(validateFigure).toHaveBeenCalledWith(point1, point2, 'line', canvasLayout)
        expect(lineHandler).toBeCalledTimes(0)
    });


    const shallowShapesControl = () => {
        const canvasLayout = [
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}], 
            [{isBorder: false, background:''}, {isBorder: false, background:''}]
        ];

        const wrapper = shallow(<ShapesControl 
            lineHandler={lineHandler} 
            rectangleHandler={rectangleHandler} 
            bucketFillHandler={bucketFillHandler} 
            canvasLayout={canvasLayout} 
            />)
        return {wrapper, canvasLayout};
    }

    const submitShapeForm = (points: any, type: string, wrapper: any) => {
        if(type === 'busket_fill') {
            expect(wrapper.find(Input)).toHaveLength(2);
            wrapper.find(Input).at(0).simulate('change', { target: { value: points.point1.x + 1 } }); //x1
            wrapper.find(Input).at(1).simulate('change', { target: { value: points.point1.y + 1 } }); //y1
            wrapper.find('input').simulate('change', { target: { value: '#333' } }); //color

        }
        else {
            expect(wrapper.find(Input)).toHaveLength(4);
            wrapper.find(Input).at(0).simulate('change', { target: { value: points.point1.x + 1 } }); //x1
            wrapper.find(Input).at(2).simulate('change', { target: { value: points.point1.y + 1} }); //y1
            wrapper.find(Input).at(1).simulate('change', { target: { value: points.point2.x + 1} }); //x2    
            wrapper.find(Input).at(3).simulate('change', { target: { value: points.point2.y + 1 } }); //y2
        }
        wrapper.find(Button).simulate('click');
    }
})