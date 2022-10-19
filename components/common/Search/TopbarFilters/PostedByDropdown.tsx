import {FC} from 'react';
import {Button, Dropdown, Checkbox} from '@components/common';
import {POSTED_BY_OPTIONS} from '../filterOptions';
import {FieldValues, useController, useForm} from 'react-hook-form';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {Menu} from '@headlessui/react';
import {useToggle} from '@hooks';

interface PostedByOptionsProps {
  onSubmit: (data: string[]) => void;
  renderButton?: () => JSX.Element;
}

export const PostedByOptions: FC<PostedByOptionsProps> = ({
  onSubmit,
  renderButton,
}) => {
  const {register, handleSubmit} = useForm();

  const onSubmitData = (data: FieldValues) => {
    onSubmit(data.posted_by);
  };

  const renderDefaultButton = () => {
    return (
      <div className="flex justify-center py-3">
        <Button type="submit">Confirm</Button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      {POSTED_BY_OPTIONS.map((option) => (
        <div
          className={`cursor-pointer whitespace-nowrap py-2 px-6 capitalize`}
          key={option.value}
        >
          <Checkbox
            value={option.value}
            register={register('posted_by')}
            withAlignStart
            label={option.label}
          />
        </div>
      ))}
      {renderButton ? renderButton() : renderDefaultButton()}
    </form>
  );
};

interface PostedByDropdownProps {
  onChange: (options: string[]) => void;
}

export const PostedByDropdown: FC<PostedByDropdownProps> = ({onChange}) => {
  const {state, handlers} = useToggle();

  return (
    <Dropdown
      display={
        <Button
          size="sm"
          variant="ghost"
          onClick={handlers.on}
          rightIcon={() => <ChevronDownIcon className="w-4" />}
        >
          Posted by
        </Button>
      }
    >
      <PostedByOptions
        onSubmit={(values: string[]) => {
          handlers.off();
          onChange(values);
        }}
        renderButton={() => (
          <Menu.Item>
            <div className="flex justify-center py-3">
              <Button type="submit">Confirm</Button>
            </div>
          </Menu.Item>
        )}
      />
    </Dropdown>
  );
};
