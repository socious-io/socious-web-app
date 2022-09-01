import {SearchBar, Button, Chip} from '@components/common';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {StepProps} from '@models/stepProps';
import { useFormContext } from 'react-hook-form';

const OnboardingStep3 = ({onSubmit}: StepProps) => {
  const formMethods =useFormContext();
  const [ selecteds, setSelecteds] = useState<any[]>([]);
  const {handleSubmit, setValue, watch} = formMethods;
  const maxCauses = 5;

  const passions = useMemo(() => ["inequilty", "Mental Health", "Neurodiversity", "Civic Engagement", "Climate Change", "Substance Abuse", "Veganism"], []);
  const [filterPassions, setFilterPassions] = useState<string[]>(passions);

  const passion = watch('passions');

  const onSearchPassion = useCallback(
    (text: string) => {
      const reg = new RegExp( `${text}`, 'gi');
      setFilterPassions(passions.filter(x => reg.test(x)))
    },
    [passions],
  );

  const onSetValueForm = useCallback((value) => {
    setValue("passions", value, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }, [setValue])

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };
  
  const handleSelecteds = useCallback((itemSelected: string) => {
    if (selecteds?.includes(itemSelected)) {
      setSelecteds(selecteds?.filter((i) => i !== itemSelected))
      onSetValueForm(selecteds?.filter((i) => i !== itemSelected));
    } else {
      if (selecteds?.length  < maxCauses)  {
        setSelecteds([...selecteds, itemSelected]);
        onSetValueForm([...selecteds, itemSelected]);
      }
    }
  }, [selecteds, onSetValueForm]);
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <h1 className="font-helmet ">What are your social causes?</h1>
        <p className="text-base text-graySubtitle ">
          Select up to 5 social causes that you are passionate about
        </p>
        <div className="flex flex-col bg-offWhite h-72  px-5 my-5 -mx-16">
          <SearchBar
            type="text"
            placeholder="Search"
            onChangeText={onSearchPassion}
            // register={register[step]("search")}
            className="my-6"
          />
          <div className="flex flex-col  border-t-2 border-b-grayLineBased -mx-5 px-5  ">
            <h3 className="py-3">Popular</h3>
            <div className="flex flex-wrap space-x-2 h-32 overflow-y-auto   ">
              {filterPassions.map((skill, index) => (
                <Chip
                  onSelected={handleSelecteds}
                  selected={selecteds?.includes(skill)}
                  value={skill}
                  key={`skill-${index}`}
                  content={skill}
                  contentClassName="text-secondary cursor-pointer"
                  containerClassName="bg-background my-2  h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={!(passion?.length === 5)}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep3;
