jest.dontMock('../store');

import {SLIDE_CONTENT} from '../../constants';

const Store = require('../store');
let storeSize = Store.getSize();

describe('Store', () => {
  it('adds 10 items to the store with the correct key', () => {
    /*
      XXX: remember, the Store automatically populates the 1st entry
    */
    for(let i = storeSize; i <= storeSize + 10; i++) {
      let storeItem = Store.addSlide();
      expect(storeItem.key).toEqual(i + 1);
    }
  });

  it('adds 10 items to the store with the correct text', () => {
    storeSize = Store.getSize();
    for(let i = storeSize; i <= storeSize + 10; i++) {
      let storeItem = Store.addSlide();
      expect(storeItem.data).toEqual(Store.getDefaultSlideText(i + 1));
    }
  });
});
