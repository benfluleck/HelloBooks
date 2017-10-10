"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var paginationFunc = function paginationFunc(offset, limit, books) {
  var pagination = {
    page: Math.floor(offset / limit) + 1,
    pageCount: Math.ceil(books.count / limit),
    pageSize: books.rows.length,
    totalCount: books.count
  };
  return pagination;
};

exports.default = paginationFunc;