import ImgUrl from '../../../asset/images/project.png';

const ImageBanner = () => {
  return (
    <>
      <div
        className="hidden md:flex bg-clearWhite bg-cover pt-11 pb-7 px-4 space-y-2 rounded-2xl bg-blend-overlay"
        style={{backgroundImage: `url(${ImgUrl})`}}
      >
        <h1 className="text-4xl text-white">Projects</h1>
        <p className="text-base text-neutralGray font-normal">
          Find projects that make a social impact
        </p>
      </div>
    </>
  );
};

export default ImageBanner;
