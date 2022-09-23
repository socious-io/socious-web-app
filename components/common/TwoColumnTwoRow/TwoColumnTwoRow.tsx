import Avatar from '../Avatar/Avatar';

function TwoCloumnTwoRowBox() {
  return (
    <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-4">
      <div className="flex flex-col">
        <p className="text-primary">Payment type</p>
        <p className="text-graySubtitle">paid</p>
      </div>
      <div className="flex flex-col">
        <p className="text-primary">Payment rate</p>
        <p className="text-graySubtitle">$35 / hour</p>
      </div>
    </div>
  );
}

export default TwoCloumnTwoRowBox;
