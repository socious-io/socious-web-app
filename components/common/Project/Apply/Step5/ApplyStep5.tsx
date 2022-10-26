import {Button, SearchBar, ImageUploader} from '@components/common';
import {DocumentIcon} from '@heroicons/react/24/outline';
import {ClockIcon} from '@heroicons/react/24/outline';
import {useEffect, useState} from 'react';
import {useProjectContext} from '../../created/NewProject/context';
import {FromLayout} from '../../created/NewProject/Layout';

const MAXFILELIMIT: number = 10485760;

const RecentGallery = () => {
  const [file, setFile] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const {ProjectContext, setProjectContext} = useProjectContext();

  useEffect(() => {
    if (file?.size <= MAXFILELIMIT) {
      setError(false);
      setProjectContext({...ProjectContext, attachment: file});
    } else if (file?.size > MAXFILELIMIT) {
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div className="flex h-full w-full flex-col">
      <FromLayout type="FULL" className="!grow">
        <div className="border-offSetColor border-b py-2 px-4">
          <SearchBar bgColor="offWhite" placeholder="Search" />
        </div>
        <div className="grid grow grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden py-2 px-4 md:grid-cols-2">
          {file?.type && (
            <div className="h-auto w-48">
              <DocumentIcon className="w-12" />
              <p>{file.name}</p>
              {error && <p className="text-error">File limit exceeded.</p>}
            </div>
          )}
        </div>
        <div className="flex items-end justify-around border-t bg-offWhite p-3 pb-8 sm:pb-4">
          <Button
            type="button"
            variant="link"
            className="m-0 flex flex-col justify-center p-0"
          >
            <ClockIcon className="w-7" />
            Recents
          </Button>
          <ImageUploader
            withPreview={false}
            onChange={(file: any) => setFile(file)}
            acceptType=".pdf, .docx, .doc"
          >
            {(setOpen: any, imagePreviewUrl: any) => {
              return (
                <Button
                  type="button"
                  variant="link"
                  className="m-0 flex flex-col justify-center p-0 text-primaryLight"
                  onClick={setOpen}
                >
                  <DocumentIcon className="w-7" />
                  Browse
                </Button>
              );
            }}
          </ImageUploader>
        </div>
      </FromLayout>
    </div>
  );
};

export default RecentGallery;
