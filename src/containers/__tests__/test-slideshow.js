import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import * as Constants from '../../constants';

jest.dontMock('../slideshow');
/*
  XXX: weird: all sub-components of Slideshow should not be mocked either
 */
jest.dontMock('../../store/store');
jest.dontMock('../../components/slides/slides');
jest.dontMock('../../components/slide/slide');

const Slideshow = require('../slideshow');
const Store = require('../../store/store');
let element;

const KEYPRESS_EDIT = {key: 'e', keyCode: Constants.KEY_E, which: Constants.KEY_E};
const KEYPRESS_LEFT = {key: '<', keyCode: Constants.KEY_LEFT, which: Constants.KEY_LEFT};
const KEYPRESS_RIGHT = {key: '>', keyCode: Constants.KEY_RIGHT, which: Constants.KEY_RIGHT};
const KEYPRESS_FULLSCREEN = {key: 'f', keyCode: Constants.KEY_F, which: Constants.KEY_F};
const KEYPRESS_PLUS = {key: '+', keyCode: Constants.KEY_PLUS_1, which: Constants.KEY_PLUS_1};

/**
 * mock the history object of Router
 */
class History {
  static mode = '';
  static state = '';
  static index = 1;

  static pushState = (idk, state) => {
    History.state = state;
    const states = state.split('/');
    const mode = states[1];
    History.mode = mode;
    History.index = parseInt(states[3], 10);
  }

  static getMode = () => {
    return History.mode;
  }

  static getIndex = () => {
    return History.index;
  }
}



History.pushState(null, '/slideshow/slide/1');

// populate store
for(let i = 0; i <= 10; i++) {
  Store.addSlide();
}

describe('Slide', () => {
  beforeEach(() => {
    // we don't need warnings for <Link> items without history context
    spyOn(console, 'error');
    let state;
    if (element) {
      state = element.state;
    }
    render();
    if(state){
      element.setState(state);
    }
  });

  it('advances one slide', () => {
    window.onkeydown(KEYPRESS_RIGHT);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.getIndex()).toBe(2);
  });

  it('advances another slide', () => {
    window.onkeydown(KEYPRESS_RIGHT);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.index).toBe(3);
  });

  it('advances another slide', () => {
    window.onkeydown(KEYPRESS_RIGHT);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.index).toBe(4);
  });

  it('goes back one slide', () => {
    window.onkeydown(KEYPRESS_LEFT);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.index).toBe(3);
  });

  it('goes back another slide', () => {
    window.onkeydown(KEYPRESS_LEFT);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.index).toBe(2);
  });

  it('enters fullscreen mode', () => {
    window.onkeydown(KEYPRESS_FULLSCREEN);
    expect(History.getMode()).toEqual('fullscreen');
  });

  it('exits fullscreen mode', () => {
    window.onkeydown(KEYPRESS_FULLSCREEN);
    expect(History.getMode()).toEqual('slideshow');
  });

  it('adds a slide and navigates to the last slide', () => {
    window.onkeydown(KEYPRESS_PLUS);
    expect(History.getMode()).toEqual('slideshow');
    expect(History.index).toBe(Store.getSize());
  });

  it('enters edit mode for current slide', () => {
    window.onkeydown(KEYPRESS_EDIT);
    expect(History.getMode()).toEqual('edit');
    expect(History.index).toBe(Store.getSize());
  });
});

function render() {
  element = TestUtils.renderIntoDocument(<Slideshow slideId={History.getIndex()} params={{mode: History.getMode()}} history={History} />);
}
