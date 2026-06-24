export const buildPagination = ({ page = 1, limit = 20 }) => {
  const currentPage = Math.max(1, Number(page));
  const pageSize = Math.max(1, Math.min(100, Number(limit)));
  const skip = (currentPage - 1) * pageSize;
  return { page: currentPage, limit: pageSize, skip };
};
