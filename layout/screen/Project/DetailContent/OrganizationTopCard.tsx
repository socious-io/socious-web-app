import {Avatar, Chip} from '@components/common';

import {Project} from 'models/project';
import Link from 'next/link';
import Image from 'next/image';
import PostData from '@components/common/Project/PostData/PostData';
import {Modal, Button} from '@components/common';
import {useToggle} from '@hooks';
import {FormProvider, useForm} from 'react-hook-form';
import ApplyStep1 from '@components/common/Project/Apply/Step1/ApplyStep1';
import {useState} from 'react';
import ApplyStep2 from '@components/common/Project/Apply/Step2/ApplyStep2';
import ApplyStep4 from '@components/common/Project/Apply/step4/ApplyStep4';

const dislikeSrc = require('../../../../asset/icons/thumbs-dislike.svg');
const bookmarkSrc = require('../../../../asset/icons/bookmark.svg');

function OrganizationTopCard({title}: Project) {
  const {state: showApply, handlers: setShowApply} = useToggle();

  const [step, setStep] = useState<number>(1);
  const formMethodsStep1 = useForm({});
  const {getValues, setValue} = formMethodsStep1;

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" />
          <div className="flex flex-col">
            <p className="text-black">Organization</p>
            <p className="text-graySubtitle">Location</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center ">
            <div className="relative  h-5 w-5 ">
              <Link href="/">
                <a>
                  <Image
                    src={dislikeSrc}
                    className="fill-warning"
                    alt="dislike"
                    layout="fill" // required
                  />
                </a>
              </Link>
            </div>
            <div className="relative ml-8 h-6 w-6 ">
              <Link href="/">
                <a>
                  <Image
                    src={bookmarkSrc}
                    className="fill-warning"
                    alt="bookmark"
                    layout="fill" // required
                    width={24}
                    height={24}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="font-semibold">Project Title</p>
      </div>
      <div className="mt-4 flex flex-row space-x-2 divide-x divide-solid divide-graySubtitle">
        <p className="text-sm text-graySubtitle ">World wide</p>
        <p className="pl-2 text-sm text-graySubtitle ">$30-$50 /hr</p>
        <p className="pl-2 text-sm text-graySubtitle ">
          Intermediate experience
        </p>
        <p className="pl-2 text-sm text-graySubtitle ">Part-time</p>
      </div>
      <div>
        <p className="my-4 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
          faucibus sed facilisi sit id blandiacilisi sit id blandit
        </p>
      </div>

      <PostData />
      <div className="mt-4 flex justify-between">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          onClick={() => setShowApply.on()}
        >
          Apply now
        </Button>
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={() => setShowApply.off()}
        >
          Save project
        </Button>
      </div>
      {/* Add Post Modal */}
      <Modal isOpen={showApply} onClose={() => setShowApply.off()}>
        <FormProvider {...formMethodsStep1}>
          {step == 1 ? (
            <ApplyStep1
              onSubmit={() => {
                setStep(4);
              }}
              onAttach={() => {
                setStep(2);
              }}
            />
          ) : step == 2 ? (
            <ApplyStep2
              onSubmit={() => {}}
              onAttach={() => {
                setShowApply.off();
                setStep(1);
              }}
            />
          ) : (
            <ApplyStep4
              onSubmit={() => {}}
              onAttach={() => {
                setShowApply.off();
                setStep(1);
              }}
            />
          )}
        </FormProvider>
      </Modal>
    </div>
  );
}

export default OrganizationTopCard;
