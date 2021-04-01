'use strict';

var get_partial_page = require('./get_partial_page');

module.exports = function (name, locals, options) {
  var page = get_partial_page(this, name),
      pagesStack = this.pagesStack || [];

  if (!page.layout || 'none' === page.layout || 'false' === page.layout) {
    return page.content;
  }

  // Avoid recursive call
  if (pagesStack.includes(page.source)) {
    return page.content;
  }

  pagesStack.unshift(page.source);

  page = {...page, ...locals};
  const data = { page, pagesStack };

  // Render page content with theme's layout
  return this.partial(page.layout, data, options);
};
