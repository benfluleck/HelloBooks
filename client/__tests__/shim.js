global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.URLSearchParams = jest.fn();
global.URL = jest.fn(() => ({
  searchParams: {
    get: jest.fn()
  }
}));
global.connect = jest.fn();
global.event = {
  preventDefault: jest.fn(),
  target: {
    getAttribute: jest.fn(),
    files: [{
      type: ''
    }],
    parentNode: {
      getAttribute: jest.fn()
    }
  }
};
global.FileReader = jest.fn();
document.getElementById = jest.fn(() => ({
  click: jest.fn()
}));

// window.localStorage = localStorage;

window.localStorage = jest.fn({
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
});

process.env.TIMEZONE = 'Africa/Lagos';
