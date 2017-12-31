import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.$ = $;
$.prototype.ready = (fn) => {
  fn();
};
$.prototype.sideNav = () => {};
$.prototype.width = () => 250;
$.prototype.show = () => {};
$.prototype.hide = () => {};
$.prototype.modal = () => { };

global.CLOUDINARY_UPLOAD_URL = 'imageUrl';
global.CLOUDINARY_UPLOAD_PRESET = 'imagePreset';
global.CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';
global.CLIENT_ID = '11223344556677';
global.Materialize = {};
global.Materialize.toast = (param, param2, param3, fn) => {
  if (fn) {
    fn();
  }
};


global.Materialize = {
  toast: () => {}
};

global.GOOGLE_CLIENT_ID = '999394939493493943949944344334';

global.swal = jest.fn(() => Promise.resolve({ result: '' }));

