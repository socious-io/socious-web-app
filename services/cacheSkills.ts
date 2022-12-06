import {get, post} from 'utils/request';

const fetchSkills = (page: number) => {
  return get(`/skills?limit=100&page=${page}`);
};

const fetcher = async () => {
  let skills: any[] = [];
  let i: number = 1;
  let toFetch = true;
  while (toFetch) {
    try {
      const data: any = await fetchSkills(i);
      skills = [...skills, ...data.items];
      if (data.total_count <= data.limit * data.page) {
        toFetch = false;
      } else {
        i++;
      }
    } catch (error) {
      console.log('ERROR IN FETCH');
    }
  }
  return skills;
};

export default async function getGlobalData() {
  const data = await fetcher();
  return data;
}

export {fetcher as skillsFetcher};
