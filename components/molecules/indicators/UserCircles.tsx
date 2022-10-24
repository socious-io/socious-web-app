import {UserCircleIcon} from '@heroicons/react/24/outline';

interface UserCirclesProps {
  // Number of users to indicate
  number: number;
  // Maximum number of circles to show (default 7)
  limit?: number;
}

/** A row of user circles indicating number of users */
function UserCircles({number, limit = 7}: UserCirclesProps) {
  if (number === 0) return null;

  const circles = [<UserCircleIcon key={0} width={24} stroke="#BEC0C7" />];
  for (let i = 1; i < Math.min(number, limit); i++)
    circles.push(
      <div
        style={{
          width: 10,
        }}
      >
        <div
          style={{
            width: 24,
            backgroundColor: 'white',
            borderRadius: 12,
            backgroundClip: 'border-box',
            position: 'relative',
            left: -12,
          }}
        >
          <UserCircleIcon key={i} width={24} stroke="#BEC0C7" />
        </div>
      </div>,
    );
  if (number > limit)
    circles.push(
      <span
        style={{color: '#BEC0C7', width: 10, position: 'relative', left: -3}}
      >
        +
      </span>,
    );

  return <div className="mr-2 flex">{circles}</div>;
}

export default UserCircles;
