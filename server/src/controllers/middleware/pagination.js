const paginationFunc = (offset, limit, books) => {
  const pagination = {
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(books.count / limit),
    pageSize: books.rows.length,
    totalCount: books.count
  };
  return pagination;
};

export default paginationFunc;
