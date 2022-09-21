interface Props {
  title: string;
  description: string;
}

function BodyBox({title, description}: Props) {
  return (
    <div className="flex w-full flex-col p-4">
      <label className="font-semibold text-black">{title}</label>
      <p className=" mt-3 font-normal text-black">{description}</p>
    </div>
  );
}

export default BodyBox;
