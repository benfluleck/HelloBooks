/**
 *
 * @param {number} offset - offset number
 *
 * @param {number} limit - limit number
 *
 * @param {object} books
 *
 * @returns {object} getPagination - with the limit and offset fields
 * to query database
 */
const pagination = (offset, limit, books) => {
  const getPagination = {
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(books.count / limit),
    pageSize: books.rows.length,
    totalCount: books.count
  };
  return getPagination;
};

export default pagination;
