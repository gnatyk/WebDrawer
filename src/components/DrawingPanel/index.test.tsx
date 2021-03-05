import React from 'react';
import {shallow} from '../../enzyme';
import DrawingPanel from './index';

describe('<DrawingPanel />', () => {
    it('Should not render canvas row', () => {
        const wrapper = shallow(<DrawingPanel canvasLayout={[]}/>);
        expect(wrapper.find('.canvas-row')).toHaveLength(0);
     
    });
    it('renders two canvas rows with one element each', () => {
        const wrapper = shallow(<DrawingPanel canvasLayout={[[{isBorder: false, background:''}],[{isBorder: false, background:''}]]}/>);
        expect(wrapper.find('.canvas-row')).toHaveLength(2);
        wrapper.find('.canvas-row').forEach((item) => expect(item.find('.canvas-item')).toHaveLength(1));
    });
})