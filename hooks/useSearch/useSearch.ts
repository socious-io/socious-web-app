import useSWR from 'swr';
import {GlobalResponseType} from '@models/organization';
import {post} from 'utils/request';

type SearchParams = {
  page: string;
  type: string;
  keywords: string;
  limit: number;
  filter: Record<string, any>;
};

function searchFetcher<T>(url: string, params: SearchParams) {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  }).toString();
  const searchURL = `${url}?${searchParams}`;
  const data = {
    type: params.type,
    filter: params.filter,
  };

  if (params.keywords) {
    Object.assign(data, {q: params.keywords});
  }

  return post<T>(searchURL, {...data});
}

export const useSearch = (params: SearchParams) => {
  return useSWR<GlobalResponseType<any>>(['/search', params], searchFetcher);
  // return useSWR<GlobalResponseType<any>>(
  //   params.keywords ? ['/search', params] : null,
  //   searchFetcher,
  // );
};
