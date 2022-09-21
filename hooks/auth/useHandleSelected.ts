//useHandleSelected
import {useState, useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

type OnSelectType = (itemSelected: string) => void;

const useHandleSelected = (
  field: string,
  maxNum: number,
): [string[], OnSelectType] => {
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const {setValue} = useFormContext();

  const onSetValueForm = useCallback(
    (value: string[]) => {
      setValue(field, value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue, field],
  );

  const onSelect = useCallback(
    (itemSelected: string) => {
      if (selecteds?.includes(itemSelected)) {
        setSelecteds(selecteds?.filter((i) => i !== itemSelected));
        onSetValueForm(selecteds?.filter((i) => i !== itemSelected));
      } else {
        if (selecteds?.length < maxNum) {
          setSelecteds([...selecteds, itemSelected]);
          onSetValueForm([...selecteds, itemSelected]);
        }
      }
    },
    [selecteds, onSetValueForm, maxNum],
  );

  return [selecteds, onSelect];
};

export default useHandleSelected;
