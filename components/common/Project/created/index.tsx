import Button from '@components/common/Button/Button';
import {useToggle, useUser} from '@hooks';
import HeaderBox from '../component/HeaderBox';
import {PlusIcon} from '@heroicons/react/24/solid';
import {FC} from 'react';
import {useProjectContext} from '../created/NewProject/context';
import {useMemo} from 'react';
import useSWRInfinite from 'swr/infinite';
import {get} from 'utils/request';
import ProjectItem from '@components/common/UserProfile/RightPane/ProjectItem';
import dayjs from 'dayjs';
import {Project} from '@models/project';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

const MyApplicationBoxes: FC = () => {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showDrafts, handlers: showDraftsHandler} = useToggle();
  const {currentIdentity} = useUser();
  const {ProjectContext, setProjectContext} = useProjectContext();
  const getKey = (initialSize: number, previousData: any) => {
    if (previousData && !previousData?.items?.length) return null;
    return `/projects?identity=${currentIdentity?.id}&page=${initialSize + 1}`;
  };
  const {
    data: infiniteProject,
    error: infiniteError,
    size,
    setSize,
  } = useSWRInfinite<any>(getKey, get, {
    shouldRetryOnError: false,
    revalidateFirstPage: false,
  });

  const projectObject: {ACTIVE: any[]; DRAFT: any[]; EXPIRE: any[]} =
    useMemo(() => {
      if (!isNaN(infiniteProject as any)) return [];
      const flatProjects = infiniteProject?.map((page) => page?.items)?.flat(1);

      return flatProjects?.reduce(
        (obj, currentValue) => {
          if (!obj[currentValue['status'] ?? 'ERROR']) {
            obj[currentValue['status'] ?? 'ERROR'] = [];
          }
          obj[currentValue['status'] ?? 'ERROR'].push(currentValue);
          return obj;
        },
        {EXPIRE: [], DRAFT: [], ACTIVE: []},
      );
    }, [infiniteProject]);

  const noMoreMessage = useMemo(
    () => size * 10 >= infiniteProject?.[0]?.['total_count'],
    [size, infiniteProject],
  );

  if (!infiniteProject && !infiniteError) <div>Loading....</div>;

  return (
    <div className="w-full pb-4 sm:w-2/3">
      <div className="flex items-center rounded-2xl border border-grayLineBased bg-white p-6">
        <p className="text-xl font-semibold">Created Project</p>
      </div>
      <Button
        disabled={currentIdentity?.type === 'users'}
        className="my-6 flex w-52 items-center justify-center align-middle "
        type="submit"
        size="md"
        variant="fill"
        value="Submit"
        leftIcon={() => <PlusIcon width={20} height={20} />}
        onClick={() =>
          setProjectContext({
            ...ProjectContext,
            isModalOpen: !ProjectContext.isModalOpen,
          })
        }
      >
        Create Project
      </Button>
      <div className="w-full space-y-4 rounded-t-2xl border border-grayLineBased ">
        <HeaderBox
          isRound={true}
          title={`On-going (${projectObject?.['ACTIVE'].length})`}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={!!projectObject?.['ACTIVE']?.length}
        />
        <div
          className={twMerge(
            'hidden h-0 ease-in-out',
            showOnGoing && 'block h-auto',
          )}
        >
          {projectObject?.['ACTIVE']?.map((item) => (
            <Link key={item.id} href={`/app/projects/${item.id}`} passHref>
              <a>
                <ProjectItem
                  title={item.title}
                  border
                  applicants={item.applicants}
                  hired={2}
                  date={dayjs(item?.updated_at)?.format('MMM D')}
                />
              </a>
            </Link>
          ))}
        </div>
        <HeaderBox
          isRound={false}
          title={`Draft (${projectObject?.['DRAFT'].length})`}
          isExpand={showDrafts}
          expandToggle={showDraftsHandler.toggle}
          // isExpandable={false}
          isExpandable={!!projectObject?.['DRAFT']?.length}
        />
        <div
          className={twMerge(
            'hidden h-0 ease-in-out',
            showDrafts && 'block h-auto',
          )}
        >
          {projectObject?.['DRAFT']?.map((item: Project) => (
            <Link key={item.id} href={`/app/projects/${item.id}`} passHref>
              <a>
                <ProjectItem
                  key={item.id}
                  title={item.title}
                  border
                  applicants={item.applicants}
                  hired={2}
                  date={dayjs(item?.updated_at)?.format('MMM D')}
                />
              </a>
            </Link>
          ))}
        </div>
        {!noMoreMessage && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="font-semibold text-primary"
              onClick={() => setSize(size + 1)}
            >
              See more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationBoxes;
