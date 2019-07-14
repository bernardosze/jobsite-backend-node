/**
 * Query Utils File.
 * It has utility methods to handle or check Request.query
 * @author Leonardo Otoni
 */
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

// Certify that a given request has the pagination set accordingly
module.exports.getDefaultPaginationSetup = (req) => {
  let { page, pageSize } = req.query;
  page = !page || Number.isNaN(page) ? 1 : page;

  if (!pageSize || Number.isNaN(pageSize)) {
    pageSize = DEFAULT_PAGE_SIZE;
  } else if (pageSize > MAX_PAGE_SIZE) {
    pageSize = MAX_PAGE_SIZE;
  }

  const offset = page > 1 ? (page - 1) * pageSize : 0;
  const limit = pageSize;

  return { offset, limit };
};
