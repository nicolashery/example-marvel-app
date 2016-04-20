var t = require('tcomb');

var Pagination = require('app/models/pagination');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  path: t.String,
  pagination: Pagination
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(Object.assign({}, input, {
    getStart: Pagination.getStart,
    getEnd: Pagination.getEnd,
    isFirstPage: Pagination.isFirstPage,
    isLastPage: Pagination.isLastPage,
    previousPageOffset: Pagination.previousPageOffset,
    nextPageOffset: Pagination.nextPageOffset
  }), out);
};
