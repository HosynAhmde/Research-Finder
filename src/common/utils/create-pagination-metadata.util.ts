import type { Metadata } from '@Common/interfaces';

export const createPaginationMetadata = (
  count: number,
  limit: number,
  page: number,
): Metadata => {
  const lastPage = Math.ceil(count / limit);
  const hasNextPage = page < lastPage;
  const hasPrevPage = page > 1;
  const pages = limit > 0 ? Math.ceil(count / limit) || 1 : null;

  return {
    page, // current page
    pages, // total pages
    prevPage: hasPrevPage ? page - 1 : null,
    nextPage: hasNextPage ? page + 1 : null,
    hasNextPage,
    hasPrevPage,
  };
};
