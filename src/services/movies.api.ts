import api from "../utils/api";

export const getMoviesApi = async ({ page }: { page: number }) => {
  return api.get(`data/page${page}.json`);
};
