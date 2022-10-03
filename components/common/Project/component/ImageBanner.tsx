import ImgUrl from '../../../../asset/images/project.png';

const ImageBanner = () => {
  return (
    <>
      <div
        className="hidden h-36 space-y-2 rounded-2xl bg-clearWhite bg-cover bg-center px-4 pt-11 pb-7 bg-blend-overlay md:flex"
        style={{backgroundImage: `url(${ImgUrl})`}}
      >
        {/* <h1 className="text-4xl text-white">Projects</h1>
        <p className="text-base font-normal text-neutralGray">
          Find projects that make a social impact
        </p> */}
      </div>
    </>
  );
};

export default ImageBanner;
