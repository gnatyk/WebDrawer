import React from 'react';
import {shallow} from '../../enzyme';
import Select from 'react-select';
// @ts-ignore
import { Button, Input } from 'semantic-ui-react';
import { validateFigure } from '../../validations';
import ShapesControl from './index';



describe('<ShapesControl />', () => {
     const lineHandler = jest.fn();
     const rectangleHandler = jest.fn();
     const bucketFillHandler = jest.fn();

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
        const canvasLayout = [
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}], 
            [{isBorder: false, background:''}, {isBorder: false, background:''}]];

        const wrapper = shallow(<ShapesControl 
            lineHandler={lineHandler} 
            rectangleHandler={rectangleHandler} 
            bucketFillHandler={bucketFillHandler} 
            canvasLayout={canvasLayout} 
            />)
        wrapper.find(Select).simulate('change', { value: 'line', label: 'Line' });
        submitShapeForm('line', wrapper);
        expect(lineHandler).toHaveBeenCalledWith({x: 0, y: 1}, {x: 0, y: 3});
    });

    it('Should call rectangleHandler with rectangle input values', () => {
        const canvasLayout = [
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}], 
            [{isBorder: false, background:''}, {isBorder: false, background:''}]];

        const wrapper = shallow(<ShapesControl 
            lineHandler={lineHandler} 
            rectangleHandler={rectangleHandler} 
            bucketFillHandler={bucketFillHandler} 
            canvasLayout={canvasLayout} 
            />)
        wrapper.find(Select).simulate('change', { value: 'rectangle', label: 'Rectangle' });
        submitShapeForm('rectangle', wrapper);
        expect(rectangleHandler).toHaveBeenCalledWith({x: 0, y: 1}, {x: 0, y: 3});
    });

    it('Should call bucketFillHandler with Bucket Fill input values', () => {
        const canvasLayout = [
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}],
            [{isBorder: false, background:''}, {isBorder: false, background:''}], 
            [{isBorder: false, background:''}, {isBorder: false, background:''}]];

        const wrapper = shallow(<ShapesControl 
            lineHandler={lineHandler} 
            rectangleHandler={rectangleHandler} 
            bucketFillHandler={bucketFillHandler} 
            canvasLayout={canvasLayout} 
            />)
        wrapper.find(Select).simulate('change', { value: 'busket_fill', label: 'Bucket Fill' });

        submitShapeForm('busket_fill', wrapper);
        expect(bucketFillHandler).toHaveBeenCalledWith({x: 0, y: 3}, '#333');
    });

    const submitShapeForm = (type: string, wrapper: any) => {
        if(type === 'busket_fill') {
            expect(wrapper.find(Input)).toHaveLength(2);
            wrapper.find(Input).at(0).simulate('change', { target: { value: 1 } }); //x1
            wrapper.find(Input).at(1).simulate('change', { target: { value: 4 } }); //y1
            wrapper.find('input').simulate('change', { target: { value: '#333' } }); //color

        }
        else {
            expect(wrapper.find(Input)).toHaveLength(4);
            wrapper.find(Input).at(0).simulate('change', { target: { value: 1 } }); //x1
            wrapper.find(Input).at(2).simulate('change', { target: { value: 2} }); //y1
            wrapper.find(Input).at(1).simulate('change', { target: { value: 1} }); //x2    
            wrapper.find(Input).at(3).simulate('change', { target: { value: 4 } }); //y2
        }
        wrapper.find(Button).simulate('click');
    }
})