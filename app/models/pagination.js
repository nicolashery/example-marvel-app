var t = require('tcomb');

var Pagination = t.struct({
  offset: t.Number,
  limit: t.Number,
  total: t.Number,
  count: t.Number
}, 'Pagination');

Pagination.getStart = function(pagination) {
  return pagination.offset + 1;
};

Pagination.getEnd = function(pagination) {
  return pagination.offset + pagination.count;
};

Pagination.isFirstPage = function(pagination) {
  return (pagination.offset === 0);
};

Pagination.isLastPage = function(pagination) {
  return (Pagination.getEnd(pagination) === pagination.total);
};

Pagination.previousPageOffset = function(pagination) {
  return pagination.offset - pagination.limit;
};

Pagination.nextPageOffset = function(pagination) {
  return pagination.offset + pagination.limit;
};

module.exports = Pagination;
