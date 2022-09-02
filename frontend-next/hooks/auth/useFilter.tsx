import { useState, useCallback } from 'react';

const useFilter = (defaultValue: string[]): [string[], (text: string) => void] => {
  const [filteredItems, setFilteredItems] = useState<string[]>(defaultValue);

  // const defaultValue1 = useMemo(() => defaultValue, [defaultValue])
  const filterWith = useCallback((text: string) => {
    const reg = new RegExp(`${text}`, 'gi');
    setFilteredItems(defaultValue.filter((x: string) => reg.test(x)))
  }, [defaultValue])
  
  return [filteredItems, filterWith];
}

export default useFilter;