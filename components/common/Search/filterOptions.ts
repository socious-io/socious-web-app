export type FilterOption = {
  value: string;
  label: string;
};

export const PROJECT_TYPE_OPTIONS: FilterOption[] = [
  {value: 'one_off', label: 'One off'},
  {value: 'part_time', label: 'Part-time'},
  {value: 'full_time', label: 'Full-time'},
];

export const ORGANIZATION_TYPE_OPTIONS: FilterOption[] = [
  {value: 'verified', label: 'Verified'},
  {value: 'non_verified', label: 'Non-verified'},
];

export const DATE_POSTED_OPTIONS: FilterOption[] = [
  {value: 'past_day', label: 'Past 24 hours'},
  {value: 'past_week', label: 'Past week'},
  {value: 'past_month', label: 'Past month'},
  {value: 'past_year', label: 'Past year'},
];

export const POSTED_BY_OPTIONS: FilterOption[] = [
  {value: 'connections', label: 'Connections'},
  {value: 'people_follow', label: 'People I follow'},
  {value: 'org_follow', label: 'Organizations I follow'},
  {value: 'outside_network', label: 'Outside my network'},
  {value: 'me', label: 'Me'},
];

export const NETWORK_OPTIONS: FilterOption[] = [
  {value: 'org_follow', label: 'Organizations I follow'},
  {value: 'outside', label: 'Outside my network'},
];

export const PROJECT_LENGTH_OPTIONS: FilterOption[] = [
  {value: 'less_than_day', label: 'Less than a day'},
  {value: 'less_than_month', label: 'Less than a month'},
  {value: '1_to_3', label: '1 - 3 months'},
  {value: '3_to_6', label: '3 - 6 months'},
  {value: 'over_6', label: 'Over 6 months'},
];

export const PROJECT_STATUS_OPTIONS: FilterOption[] = [
  {value: 'active', label: 'Active'},
  {value: 'inactive', label: 'Inactive'},
];

export const EXPERIENCE_LEVEL_OPTIONS: FilterOption[] = [
  {value: 'no_exp', label: 'No experience'},
  {value: 'entry', label: 'Entry'},
  {value: 'intermediate', label: 'Intermediate'},
  {value: 'expert', label: 'Expert'},
];

export const SEARCH_TYPE_OPTIONS: FilterOption[] = [
  {value: 'projects', label: 'Projects'},
  {value: 'organizations', label: 'Organizations'},
  {value: 'users', label: 'People'},
  {value: 'posts', label: 'Posts'},
];

export const SORT_OPTIONS: FilterOption[] = [
  {value: 'recently_added', label: 'Recently added'},
  {value: 'from_network', label: 'From my network'},
];
