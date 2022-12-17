import {useEffect} from 'react';
import {getBadges} from './achievements.service';
import {AchievementsProps} from './achievements.types';

export const Achievements = (props: AchievementsProps): JSX.Element => {
  useEffect(() => {
    getBadges().then(console.log);
  });

  return <div>Achievements Page</div>;
};
