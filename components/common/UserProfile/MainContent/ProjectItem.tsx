import React from 'react';
import {getText} from '@socious/data';
import Chip from './Chip';
import Title from './Title';
import Image from 'next/image';

const editSrc = require('../../../../asset/icons/edit.svg');

interface Props {
  items: string[] | undefined;
  title: string;
  isRow?: boolean;
  isEdit?: boolean;
  onclick?: () => void;
}

const ProjectItem: React.FC<Props> = ({
  title,
  items = [],
  isRow = false,
  isEdit = false,
  onclick,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between ">
        <Title>{title}</Title>
        {isEdit && (
          <div className="relative h-5 w-5 cursor-pointer " onClick={onclick}>
            <Image
              src={editSrc}
              className="cursor-pointer fill-warning "
              alt="dislike"
              layout="fill"
            />
          </div>
        )}
      </div>
      {isRow ? (
        <div className="flex w-4/6 flex-col gap-2 ">
          {items &&
            items?.map((item: string) => {
              return <div key={item}>{item}</div>;
            })}
        </div>
      ) : (
        <div className="flex w-4/6 flex-wrap gap-2 ">
          {items &&
            items?.map((item: string) => {
              return (
                <Chip
                  key={item}
                  name={
                    title === 'Skills'
                      ? getText('en', `SKILL.${item}`)
                      : getText('en', `PASSION.${item}`) || item
                  }
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
