
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';


export const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

export const mock = new MockAdapter(axios);

