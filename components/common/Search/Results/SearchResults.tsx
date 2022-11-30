import {useRouter} from 'next/router';
import {useSearch} from '@hooks';
import {Pagination} from '@components/common/Pagination/Pagination';
import {SearchResultItems} from './SearchResultItems';
import {FC} from 'react';

const PAGE_LIMIT = 50;

const transformFilterToAPIParam = (
  searchType: string,
  filter: Record<string, any>,
) => {
  const params: Record<string, any> = {};
  if (filter.posted_date) {
    params.posted_date = '';
  }
  if (filter.social_causes) {
    const key = ['projects', 'posts'].includes(searchType.toString())
      ? 'causes_tags'
      : 'social_causes';
    params[key] = filter.social_causes.toString().split(',');
  }
  if (filter.skills && ['projects', 'users'].includes(searchType.toString())) {
    params.skills = filter.skills.toString().split(',');
  }
  if (filter.country) {
    params.country = {eq: filter.country};
  }
  if (filter.payment_type) {
    params.payment_type = {eq: filter.payment_type};
  }
  if (filter.payment_scheme) {
    params.payment_scheme = {eq: filter.payment_scheme};
  }
  if (filter.status) {
    params.payment_scheme = {eq: filter.status};
  }
  if (searchType === 'organizations' && filter.organization_type) {
    params.type = {eq: filter.organization_type};
  }
  return params;
};

interface SearchResultsProps {
  onChangeSortType?: () => void;
  closeFilter?: () => void;
}

export const SearchResults: FC<SearchResultsProps> = ({
  onChangeSortType,
  closeFilter,
}) => {
  const route = useRouter();
  console.log('q: ', route.query);
  const {type = '', page = 1, keywords = '', ...filter} = route.query;

  const {data: searchResults} = useSearch({
    type: type.toString(),
    page: page.toString(),
    keywords: keywords.toString(),
    limit: PAGE_LIMIT,
    filter: transformFilterToAPIParam(type.toString(), filter),
  });

  const goToPage = (page: number) => {
    delete route.query.preview_id;
    route.query.page = page.toString();
    route.push(route);
  };

  if (!searchResults) return null;

  const totalPage = Math.round(
    searchResults?.total_count / searchResults?.limit,
  );

  return (
    <div className="px-5 md:px-0">
      <SearchResultItems
        type={type as string}
        items={searchResults.items}
        total={searchResults.total_count}
        onChangeSortType={onChangeSortType}
        closeFilter={closeFilter}
      />

      {totalPage > 1 ? (
        <Pagination
          totalPage={totalPage}
          currentPage={searchResults.page}
          onChangePage={goToPage}
        />
      ) : null}
    </div>
  );
};
