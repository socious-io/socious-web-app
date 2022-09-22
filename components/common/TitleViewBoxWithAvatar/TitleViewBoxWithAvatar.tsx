import Avatar from '../Avatar/Avatar';

function TitleViewBoxWithCard() {
  return (
    <div className="my-4 space-y-6  p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" />
          <div className="flex flex-col">
            <p className="text-black">Organization</p>
            <p className="text-graySubtitle">Location</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleViewBoxWithCard;
