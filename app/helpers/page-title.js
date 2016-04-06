exports.makeTitle = function(pageName) {
  var siteName = 'Marvel App';
  if (!pageName) {
    return siteName;
  }
  return pageName + ' | ' + siteName;
};
