jest.dontMock('../notfound');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import {TEXT_404} from '../../../constants';
const NotFound = require('../notfound');

describe('NotFound', () => {
  it('renders the correct text', () => {
    const notFound = TestUtils.renderIntoDocument(<NotFound />);
    const notFoundNode = ReactDOM.findDOMNode(notFound);
    expect(notFoundNode.textContent).toEqual(TEXT_404);
  });
});
