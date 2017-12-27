import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.$ = $;
$.prototype.ready = (fn) => {
  fn();
};
$.prototype.sideNav = () => { };
$.prototype.width = () => 250;
$.prototype.show = () => { };
$.prototype.hide = () => { };

global.CLOUDINARY_UPLOAD_URL = 'imageUrl';
global.CLOUDINARY_UPLOAD_PRESET = 'imagePreset';
global.CLIENT_ID = '11223344556677';
global.Materialize = {};
global.Materialize.toast = (param, param2, param3, fn) => {
  if (fn) {
    fn();
  }
};
