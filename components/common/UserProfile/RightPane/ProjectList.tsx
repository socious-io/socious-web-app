import React from 'react';

import ProjectItem from './ProjectItem';

interface Props {
  list: any;
}

const ProjectList: React.FC<Props> = ({list}) => {
  return list.map((item: any) => (
    <>
      <ProjectItem
        key={item.id}
        title={item.title}
        applicants={item.applicants}
        hired={2}
        dateRange="Mar 1 - Mar 10"
      />
      <hr className="border-grayLineBased" />
    </>
  ));
};

export default ProjectList;
