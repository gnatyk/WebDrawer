import { drawLine, drawRectangle, fillBusket } from './index';

const canvasLayoutStart = [
    [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
    [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
    [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
    [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
];

const defaultColor = '#b76060';
const fillBusketColor = '#333';

  test('Draw horizontal line with valid values', () => { 
    const canvasLayoutFinal = [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
  ];
    expect(drawLine({x:0,y: 0}, {x:2, y: 0}, canvasLayoutStart)).toEqual(canvasLayoutFinal);
  });

  test('Draw horizontal line with invalid values', () => { 
    const canvasLayoutFinal = [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
  ];
    expect(drawLine({x:0,y: 0}, {x:1, y: 0}, canvasLayoutStart)).not.toEqual(canvasLayoutFinal);
  });

  test('Draw vertical line with valid values', () => {
    const canvasLayoutFinal = [
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
  ];
    expect(drawLine({x:0,y: 0}, {x:0, y: 2}, canvasLayoutStart)).toEqual(canvasLayoutFinal);
  });

  test('Draw vertical line with invalid values', () => {
    const canvasLayoutFinal = [
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
  ];
    expect(drawLine({x:0,y: 0}, {x:0, y: 1}, canvasLayoutStart)).not.toEqual(canvasLayoutFinal);
  });

  test('Draw rectangle', () => {
    const canvasLayoutFinal = [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: true, background:defaultColor}, {isBorder: false, background:''}],
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: false, background:''}],
      [{isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: false, background:''}]
  ];
    expect(drawRectangle({x:0,y: 0}, {x:2, y: 2}, canvasLayoutStart)).toEqual(canvasLayoutFinal);
  });

  test('All canvas should be filled color', () => {
    const canvasLayoutFinal =  [
      [{isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background: fillBusketColor}],
      [{isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background: fillBusketColor}],
      [{isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background: fillBusketColor}],
      [{isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: false, background: fillBusketColor}]
  ];
    expect(fillBusket({x:0,y: 1}, canvasLayoutStart, fillBusketColor)).toEqual(canvasLayoutFinal);
  });

  
  test('Inside figure should be filled color', () => {
    const canvasLayoutFillBusketStart = [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}]
  ];
    
    const canvasLayoutFinal =   [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background: fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background: fillBusketColor}, {isBorder: false, background: fillBusketColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}]
  ];
    expect(fillBusket({x:1,y: 1}, canvasLayoutFillBusketStart, fillBusketColor)).toEqual(canvasLayoutFinal);
  });

  test('Inside figure should not be filled color', () => {
    const canvasLayoutFillBusketStart = [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background:''}, {isBorder: false, background:''}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}]
  ];
    
    const canvasLayoutFinal =   [
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background: fillBusketColor}, {isBorder: false, background:fillBusketColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: false, background: fillBusketColor}, {isBorder: false, background: fillBusketColor}, {isBorder: true, background:defaultColor}],
      [{isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}, {isBorder: true, background:defaultColor}]
  ];
    expect(fillBusket({x:0,y: 1}, canvasLayoutFillBusketStart, fillBusketColor)).not.toEqual(canvasLayoutFinal);
  });