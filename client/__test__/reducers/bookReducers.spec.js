import bookreducer from '../../src/app/reducers/bookReducers';


describe('Book Reducer', () => {
  it(' has a default state', () => {
    expect(bookreducer(undefined, { type: 'undefinedAction' })).toEqual({
      books: [], error: null, fetched: false, fetching: false
    });
  });
});
