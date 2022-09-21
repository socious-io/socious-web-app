import fs from 'fs';
import path from 'path';
import {get, post} from 'utils/request';

// Cache files are stored inside ./next folder
const CACHE_PATH = path.join(__dirname, 'skills.json');

const fetchSkills = (page: number) => {
  return get(`/skills?limit=100&page=${page}`);
};

const fetcher = async () => {
  let skills: any[] = [];
  let i: number = 1;
  let toFetch = true;
  while (toFetch) {
    try {
      console.log('FeTCHING page: ', i);
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
  let cachedData;

  console.log('I am here');
  // #1 - Look for cached data first
  try {
    cachedData = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('❌ CACHE NOT INITIALIZED');
  }
  // #2 - Create Cache file if it doesn't exist
  if (!cachedData) {
    // Store data in cache files
    const data = await fetcher();
    // this always rewrites/overwrites the previous file
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(data));
      console.log('💾 CACHE FILE WRITTEN SUCCESSFULLY');
    } catch (error) {
      console.log('❌ ERROR WRITING MEMBERS CACHE TO FILE\n', error);
    }
    cachedData = data;
  }

  return cachedData;
}
