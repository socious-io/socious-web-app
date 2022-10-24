import {TApplicant} from '@models/applicant';
import useSWR, {KeyedMutator, SWRConfiguration} from 'swr';
import {get} from 'utils/request';

export type TUseApplicationReturn = {
  data: TApplicant | undefined;
  error: any;
  mutate: KeyedMutator<TApplicant>;
  isLoading: boolean;
};

const useApplication = (
  aid: string | null,
  configs: SWRConfiguration = {},
): TUseApplicationReturn => {
  const {data, error, mutate} = useSWR<TApplicant>(
    aid ? `/applicants/${aid}` : null,
    get,
    configs,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

export default useApplication;
