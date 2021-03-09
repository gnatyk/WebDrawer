import React from 'react';
import { shallow } from '../../enzyme';
import { Button, Input } from 'semantic-ui-react';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import CanvasControl from './index';
import { error } from '../../utils/constants';

describe('<CanvasControl />', () => {
  const createCanvas = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should change isCreateCanvas on button click', () => {
    const wrapper = shallow(<CanvasControl createCanvas={createCanvas} />);
    expect(wrapper.find('.canvas-input-container')).toHaveLength(0);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find('.canvas-input-container')).toHaveLength(1);
  });

  it('Should call createCanvas with input values', () => {
    const newValue = 16;
    submitCanvasForm(newValue);
    expect(createCanvas).toHaveBeenCalledWith(newValue, newValue);
  });

  it('Should not call createCanvas with invalid values', () => {
    NotificationManager.error = jest.fn();
    submitCanvasForm(-16);
    expect(createCanvas).toBeCalledTimes(0);
    expect(NotificationManager.error).toBeCalledWith(error.outOfField, 'Error');
  });

  const submitCanvasForm = (value: number) => {
    const wrapper = shallow(<CanvasControl createCanvas={createCanvas} />);
    wrapper.find(Button).at(0).simulate('click');
    const inputX = wrapper.find(Input).first();
    const inputY = wrapper.find(Input).last();
    inputX.simulate('change', { target: { value: value } });
    inputY.simulate('change', { target: { value: value } });
    wrapper.find(Button).at(1).simulate('click');
  };
});
