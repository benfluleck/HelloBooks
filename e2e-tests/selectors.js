module.exports = {
  addBook: {
    title: '#add-admin-book-modal div > input[name="title"]',
    author: '#add-admin-book-modal div > input[name="author"]',
    quantity: '#add-admin-book-modal div > input[name="quantity"]',
    description: '#add-admin-book-modal div > textarea[name="description"]',
    drama: '#add-admin-book-modal div >.dropdown-content li:nth-child(4)',
    loadDramaInput: '#add-admin-book-modal div >' +
    '.dropdown-content li:nth-child(4)',
    dropDownButton: '#add-admin-book-modal div > .select-dropdown'
  },
  editBook: {
    title: '#edit-admin-book-modal div > input[name="title"]',
    author: '#edit-admin-book-modal div > input[name="author"]',
    quantity: '#edit-admin-book-modal div > input[name="quantity"]',
    description: '#edit-admin-book-modal div > textarea[name="description"]',
    comedy: '#edit-admin-book-modal div >.dropdown-content li:nth-child(3)',
    loadComedyInput: '#edit-admin-book-modal div >' +
    '.dropdown-content li:nth-child(3)',
    dropDownButton: '#edit-admin-book-modal div > .select-dropdown'
  }
};

