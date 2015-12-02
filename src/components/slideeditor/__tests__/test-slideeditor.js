import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('../slideeditor');
const SlideEditor = require('../slideeditor');
const SLIDE_VALUE = 'testing 1, 2, 3';
const ADD_VALUE = ', 4 ,5 ,6';
let component;
let changedValue;

describe('SlideEditor', () => {
  beforeEach(() => {
    // we don't need warnings for <Link> items without history context
    spyOn(console, 'error');
  });

  it('renders the correct value', () => {
    component = TestUtils.renderIntoDocument(<SlideEditor value={SLIDE_VALUE} index={1} onChange={onChange} />);
    const node = ReactDOM.findDOMNode(component);
    expect(node.textContent).toEqual(SLIDE_VALUE);
  });

  it('changes the value of the slide', () => {
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
    input.value = (SLIDE_VALUE + ', 4, 5 , 6');
    TestUtils.Simulate.change(input);
    expect(input.value).toEqual(SLIDE_VALUE + ', 4, 5 , 6');
  });

  it('changes the value of the slide', () => {
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
    input.value = (SLIDE_VALUE + ADD_VALUE);
    TestUtils.Simulate.change(input);
    expect(input.value).toEqual(SLIDE_VALUE + ADD_VALUE);
  });

  it('dispatches the changed value when done', () => {
    const doneBtn = TestUtils.findRenderedDOMComponentWithTag(component, 'a');
    TestUtils.Simulate.click(doneBtn);
    expect(changedValue).toEqual(SLIDE_VALUE + ADD_VALUE);
  });
})

function onChange (value) {
  changedValue = value;
}
