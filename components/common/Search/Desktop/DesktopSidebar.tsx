import {useClientRect} from 'hooks/useClientRect';
import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';
import {SearchResultPreview} from '../Preview/Preview';
import {SidebarFilters} from '../SidebarFilters/SidebarFilters';

interface DesktopSidebarProps {
  showSidebarFilters: boolean;
  onResetFilters: () => void;
  onEditSocialCauses: () => void;
  onEditSkills: () => void;
  onEditLocation: () => void;
}

export const DesktopSidebar: FC<DesktopSidebarProps> = ({
  showSidebarFilters,
  onResetFilters,
  onEditSocialCauses,
  onEditSkills,
  onEditLocation,
}) => {
  const route = useRouter();
  const [rect, ref] = useClientRect();
  const [styles, setStyles] = useState({});
  const {type = '', preview_id} = route.query;

  useEffect(() => {
    setStyles({
      top: rect?.top,
      left: rect?.width < 154 ? '0' : rect?.left,
      width: rect?.width < 154 ? '100%' : rect?.width,
      height:
        rect?.width < 154 ? window.innerHeight - 180 : window.innerHeight - 120,
    });
  }, [rect]);

  return (
    <div className="relative flex-1" ref={ref}>
      <div className="fixed" style={styles}>
        <div className="relative h-full">
          {showSidebarFilters ? (
            <SidebarFilters
              onResetFilters={onResetFilters}
              onEditSocialCauses={onEditSocialCauses}
              onEditSkills={onEditSkills}
              onEditLocation={onEditLocation}
            />
          ) : preview_id ? (
            <SearchResultPreview
              type={type.toString()}
              id={preview_id.toString()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
