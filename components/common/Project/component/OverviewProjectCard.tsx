import {Avatar, Chip} from '@components/common';

import {Project} from 'models/project';
import Link from 'next/link';
import Image from 'next/image';
import Title from '@components/common/UserProfile/MainContent/Title';

var data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

const editSrc = require('../../../../asset/icons/edit.svg');

function OverviewProjectCard() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-row items-center justify-between ">
        <Title>Project A</Title>
        <div className="relative  h-5 w-5 ">
          <Link href="/">
            <a>
              <Image
                src={editSrc}
                className="fill-warning"
                alt="dislike"
                layout="fill" // required
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="">
        <p className="font-semibold text-primary">Project Title</p>
      </div>
      <div>
        <p className="my-4 text-sm">Project Title</p>
      </div>
      <div className="">
        <p className="font-semibold text-primary">Project Descroption</p>
      </div>
      <div>
        <p className="my-4 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet
          nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim
          nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper
          dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum.
          Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing
          fusce et fames aliquam condimentum.
        </p>
      </div>
      <div className="flex w-full flex-col">
        <p className=" text-bold text-primary">Location</p>
        <p className="text-normal">Amsterdam</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.map((e) => (
          <div className="flex flex-col">
            <p className=" text-bold text-primary">Location</p>
            <p className="text-normal">Amsterdam</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverviewProjectCard;
