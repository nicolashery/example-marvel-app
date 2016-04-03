var Pagination = require('../../../models/pagination');

var template = require('marko')
  .load(require.resolve('./template.marko'));

module.exports = function render(input, out) {
  template.render(Object.assign({}, input, {
    getStart: Pagination.getStart,
    getEnd: Pagination.getEnd,
    isFirstPage: Pagination.isFirstPage,
    isLastPage: Pagination.isLastPage,
    previousPageOffset: Pagination.previousPageOffset,
    nextPageOffset: Pagination.nextPageOffset
  }), out);
};
