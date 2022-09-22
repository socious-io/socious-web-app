import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
const NEXT_PUBLIC_GOOGLE_PLACES_API =
  process.env['NEXT_PUBLIC_GOOGLE_PLACES_API'];

interface AutoCompleteInputProps {
  onSelected: (data: any) => void;
  selected: any;
  label: string;
  errorMessage?: any;
  autocompletionRequest: any;
}

const AutoCompleteInput = ({
  onSelected,
  selected,
  label,
  errorMessage,
  autocompletionRequest,
}: AutoCompleteInputProps) => {
  return (
    <div className="relative my-6">
      {label && (
        <label
          className={twMerge(
            'font-base my-1 block font-semibold',
            errorMessage ? 'text-error' : 'text-black',
          )}
        >
          {label}
        </label>
      )}
      <GooglePlacesAutocomplete
        apiKey={NEXT_PUBLIC_GOOGLE_PLACES_API}
        apiOptions={{language: 'en', region: 'us'}}
        autocompletionRequest={autocompletionRequest}
        selectProps={{
          selected,
          onChange: onSelected,
          inputClassName:
            'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0',
          suggestionsClassNames: ' cursor-pointer select-none py-2 pl-10 pr-4',
        }}
      />
      {errorMessage && (
        <div className="flex items-center text-error">
          <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
