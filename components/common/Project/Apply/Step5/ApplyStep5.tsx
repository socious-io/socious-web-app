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
      <FromLayout type="FULL">
        <div className="border-offSetColor border-b py-2 px-4">
          <SearchBar />
        </div>
        <div className="flex grow flex-wrap gap-4 overflow-y-auto py-2 px-4 sm:grow-0">
          {file?.type && (
            <div className="h-auto w-48">
              <DocumentIcon className="w-12" />
              <p>{file.name}</p>
              {error && <p>File limit exceeded.</p>}
            </div>
          )}
        </div>
      </FromLayout>
      <div className="flex items-end justify-around border-t bg-offWhite  p-4 pb-10">
        <Button
          type="button"
          variant="link"
          className="flex flex-col justify-center"
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
                className="flex flex-col justify-center text-primaryLight"
                onClick={setOpen}
              >
                <DocumentIcon className="w-7" />
                Browse
              </Button>
            );
          }}
        </ImageUploader>
      </div>
    </div>
  );
};

export default RecentGallery;
