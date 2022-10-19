import {getText} from '@socious/data';
import {ObjectType} from 'hooks/auth/useFilter';
import {createContext, ReactNode, useContext, useMemo} from 'react';

const SkillsContext = createContext<{skills: Skill[]}>(null!);

export type Skill = {
  id: string;
  name: string;
};

type Props = {
  skills: Skill[];
  children: ReactNode;
};

function SkillsProvider({children, skills}: Props) {
  const sortedSkills = useMemo(() => {
    const sorted: ObjectType[] = [];
    skills?.forEach((skill) => {
      const name = getText('en', `SKILL.${skill?.name}`);
      if (name) sorted.push({id: skill.name as string, name});
    });
    sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  }, [skills]);

  return (
    <SkillsContext.Provider value={{skills: sortedSkills}}>
      {children}
    </SkillsContext.Provider>
  );
}
function useSkills() {
  return useContext(SkillsContext);
}

export {SkillsProvider, useSkills};
