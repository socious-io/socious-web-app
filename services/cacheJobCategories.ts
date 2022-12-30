import {get} from 'utils/request';

const fetcher = async () => {
  const data: any = await get(`/projects/categories`);
  return data.categories;
};

export default async function getGlobalData() {
  const data = await fetcher();
  return data;
}

export {fetcher as jobCategoryFetcher};
