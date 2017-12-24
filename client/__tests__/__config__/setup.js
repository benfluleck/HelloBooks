

import $ from 'jquery';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';


configure({ adapter: new Adapter() });

window.$ = $;
global.jQuery = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.tooltip = () => { };
$.prototype.collapsible = () => { };
$.prototype.materialbox = () => { };
$.prototype.carousel = () => { };
$.prototype.click = callback => callback();
$.prototype.width = () => 500;

$.prototype.prop = (string) => {
  switch (string) {
    case 'clientHeight':
      return 400;
    case 'scrollTop':
      return 200;
    case 'scrollHeight':
      return 400;
    default:
      return null;
  }
};

$.deparam = () => ({
  u: 'er',
  p: 1,
  t: ''
});

window.resizeTo = (width) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.dispatchEvent(new Event('resize'));
};


global.CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';

window.setInterval = fn => fn();
window.setTimeout = fn => fn();
