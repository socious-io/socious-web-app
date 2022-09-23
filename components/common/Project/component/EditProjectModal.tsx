import {Button, InputFiled, TextArea} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import {StepProps} from '@models/stepProps';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import useLocation from 'services/useLocation';
import useSWR from 'swr';

const EditProjectModal = ({onSubmit}: StepProps) => {
  const {getCountryByKeyword, getCityByKeyword} = useLocation();

  const [countryKey, setCountryKey] = useState('Japan');

  const {data: filterCountries} = useSWR(
    [`getCountryByKeyword`, countryKey],
    () => getCountryByKeyword(countryKey || 'Japan'),
  );

  const handleSetCountry = (data: any) => {};

  return (
    <div>
      <div className="flex  flex-col divide-y">
        <p className="pb-4 font-semibold">Edit Project</p>
        <div className="flex  flex-col ">
          <p className="pb-4 font-semibold">Tell us more about your project.</p>
          <p className="text-base text-graySubtitle">
            {' '}
            Describe your project in detail.{' '}
          </p>
        </div>
        <div className="hide-scrollbar grow overflow-y-auto sm:h-80 md:h-[720px]">
          <div className=" p-4 font-normal">
            <p className="mt-4 text-base text-graySubtitle">Project Info</p>
            <Combobox
              label="Country"
              selected={'country'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="country"
              items={
                filterCountries || [
                  {id: 1, name: 'Jepan'},
                  {id: 2, name: 'Iran'},
                ]
              }
              placeholder="Country"
              className="mt-6"
            />
            <div className="my-6  ">
              <InputFiled
                label="City"
                type="email"
                placeholder="City"
                required
                // className="rounded-md border border-grayLineBased"
              />
            </div>
            <Combobox
              label="Project type"
              selected={'A'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="Project type"
              items={
                filterCountries || [
                  {id: 1, name: 'A'},
                  {id: 2, name: 'B'},
                ]
              }
              placeholder="Project type"
              className="mt-8"
            />
            <Combobox
              label="Project Length"
              selected={'2'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="Project Length"
              items={
                filterCountries || [
                  {id: 1, name: '13'},
                  {id: 2, name: '10'},
                ]
              }
              placeholder="Project Length"
              className="mt-8"
            />
            <p className="mt-4 text-base text-graySubtitle">Payment </p>
            <Combobox
              label="Payment type"
              selected={'Payment type'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="Payment type"
              items={
                filterCountries || [
                  {id: 1, name: 'd'},
                  {id: 2, name: 'x'},
                ]
              }
              placeholder="Payment type"
              className="mt-6"
            />
            <Combobox
              label="Payment mode"
              selected={'Payment mode'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="Payment mode"
              items={
                filterCountries || [
                  {id: 1, name: 'ww'},
                  {id: 2, name: 'er'},
                ]
              }
              placeholder="Payment mode"
              className="mt-6"
            />
            <div className=" my-6 flex flex-row justify-between space-x-2 p-4">
              <InputFiled
                label="Maximum"
                type="text"
                placeholder=""
                required
                // className="rounded-md border border-grayLineBased"
              />
              <InputFiled
                label="Minimum"
                type="text"
                placeholder=""
                required
                // className="rounded-md border border-grayLineBased"
              />
            </div>
            <p className="text-base text-graySubtitle">
              Prices will be shown in USD ($)
            </p>
            <p className="mt-4 text-base text-graySubtitle">
              Experience & skills{' '}
            </p>
            <Combobox
              label="Experience level "
              selected={'Experience level *'}
              onSelected={handleSetCountry}
              onChangeInputSearch={setCountryKey}
              required
              name="Experience level *"
              items={
                filterCountries || [
                  {id: 1, name: '230'},
                  {id: 2, name: '4500'},
                ]
              }
              placeholder="Experience level *"
              className="mt-6"
            />
            <div className=" my-6 flex h-[144px] flex-col p-4">
              <TextArea
                placeholder="I feel like"
                rows={6}
                containerClassName=" -mr-5 -ml-5 rounded-md border border-b-grayLineBased"
                className="focus:border-none"
              />
            </div>
          </div>
        </div>
        <div className="-mx-16  h-48 divide-x border-t-2 border-b-grayLineBased ">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
          >
            Save chanes
          </Button>
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
