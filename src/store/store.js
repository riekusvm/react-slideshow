const LS_KEY = '__SLIDESHOW__DATA__';

export default class Store {

  static storeInitialized = false;

  // TODO: read initial first slide from slide.md
  static data = {
    slides: [
      {key: '1', data: 'this is slide #1'}
    ]
  };

/**
 * intialize the data store
 * @return {void}
 */
  static initializeStore() {
    if (typeof (Storage) !== 'undefined') {
      if (localStorage.getItem(LS_KEY) && this.dataLoaded !== true) {
        const stringData = localStorage.getItem(LS_KEY);
        this.data = JSON.parse(stringData);
      } else {
        this.saveLocalStorage(true);
      }
      setInterval(this.saveLocalStorage.bind(this), 2000);
    } else {
      // no localStorage..
    }
  }

  static saveLocalStorage(force) {
    if (JSON.stringify(this.data) === localStorage.getItem(LS_KEY) && force !== true) {
      return;
    }
    if (localStorage.getItem(LS_KEY) || force) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.data));
    }
  }

  static getData() {
    if (this.storeInitialized !== true) {
      this.initializeStore();
      this.storeInitialized = true;
    }
    return this.data;
  }

  static get(id) {
    return this.getData().slides[id - 1];
  }

  static addSlide() {
    this.getData().slides.push({key: this.getData().slides.length + 1,
      data: '[ new slide #' + (this.getSize() + 1) + ' ]'});
    return this.getData().slides[this.getData().slides.length - 1];
  }

  static saveSlide(key, value) {
    this.getData().slides[key - 1] = {key: key, data: value};
  }

  static deleteSlide(key) {
    this.getData().slides.splice(key - 1, 1);
  }

  static getSize() {
    return this.getData().slides.length;
  }
}