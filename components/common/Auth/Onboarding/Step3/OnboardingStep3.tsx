import {SearchBar, Button, Chip} from '@components/common';
import {useMemo} from 'react';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/auth/useHandleSelected';

import Data, {getText} from '@socious/data';

const passionData = Object.keys(Data.SocialCauses);

const OnboardingStep3 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, watch} = formMethods;
  const passion = watch('passions');

  const maxCauses = 5;
  const [selecteds, onSelect] = useHandleSelected('passions', maxCauses);

  const passions = useMemo(
    () => {
      const sorted = passionData.map((id) => ({
        id,
        name: getText('en', `PASSION.${id}`),
      }));
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );

  const [filteredItems, filterWith] = useFilter(passions);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between px-10"
    >
      <div className="flex grow flex-col">
        {' '}
        <h1 className="font-helmet ">What are your social causes?</h1>
        <p className="text-base text-graySubtitle ">
          Select up to 5 social causes that you are passionate about
        </p>
        <div className="my-5 -mx-16  flex h-80 grow flex-col bg-offWhite px-5">
          <SearchBar
            type="text"
            placeholder="Search"
            onChange={(e) => filterWith(e?.currentTarget?.value || '')}
            className="my-6"
          />
          <div className="-mx-5 flex h-full grow flex-col overflow-hidden border-t-2 border-b-grayLineBased bg-offWhite px-5">
            <h3 className="py-3">Popular</h3>
            <div className="flex h-full flex-wrap space-x-2 overflow-y-auto">
              {filteredItems.map((passion) => (
                <Chip
                  onSelected={onSelect}
                  selected={selecteds?.includes(passion.id)}
                  value={passion.id}
                  key={passion.id}
                  content={passion.name}
                  contentClassName="text-secondary cursor-pointer"
                  containerClassName="bg-background my-2 h-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={passion.length === 0}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep3;
