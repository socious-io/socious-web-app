// useFilter
import {useState, useCallback} from 'react';

type ObjectType = {id: string; name: string};

const useFilter = (
  defaultValue: ObjectType[],
): [ObjectType[], (text: string) => void] => {
  const [filteredItems, setFilteredItems] = useState<ObjectType[]>(
    defaultValue ?? [],
  );

  const filterWith = useCallback(
    (text: string) => {
      const escapedString = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const reg = new RegExp(`${escapedString}`, 'gi');
      setFilteredItems(
        defaultValue.filter((x: ObjectType) => reg.test(x.name)),
      );
    },
    [defaultValue],
  );

  return [filteredItems, filterWith];
};

export default useFilter;
