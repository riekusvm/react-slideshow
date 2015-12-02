// jest.dontMock('../slide');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Slide from '../slide';

// const Slide = require('../slide');
const SLIDE_DATA = `Now that we know who you are, I know who I am. I'm not a mistake!
It all makes sense! In a comic, you know how you can tell who the arch-villain's
going to be? He's the exact opposite of the hero. And most times they're friends,
like you and me! I should've known way back when... You know why, David?
Because of the kids. They called me Mr Glass.`;

describe('Slide', () => {
  it('renders the correct text', () => {
    //TODO: dangerouslySetInnerHTML doesn't seem to affect textContent
  });
});
