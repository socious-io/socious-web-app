import useRequest from 'hooks/useRequest';
import {GOOGLE_API} from 'utils/api';

const useLocation = () => {
  const request = useRequest();

  const getCountryByKeyword = (searchKeyword: string | undefined) => {
    const language = 'en_US';
    return new Promise((resolve: (response: any) => void, reject) => {
      searchKeyword &&
        request
          .get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
              searchKeyword,
            )}&types=%28countries%29&language=${
              language ?? 'en_US'
            }&key=${GOOGLE_API}`,
          )
          .then((response: any) => {
            const listCountries = response.predictions.filter((city: any) =>
              city.types?.includes('locality'),
            );
            const data: any = listCountries.map((city: any) => {
              return {
                id: city.place_id,
                name: city.structured_formatting.main_text,
                country: city.terms[city.terms.length - 1].value,
                description: city.description,
                secondary_text: city.structured_formatting.secondary_text,
              };
            });

            resolve(data);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  };
  const getCityByKeyword = (
    selectedCountry: any,
    searchKeyword: string | undefined,
  ) => {
    const language = 'en_US';
    return new Promise((resolve: (response: any) => void, reject) => {
      searchKeyword &&
        selectedCountry &&
        request
          .get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
              searchKeyword,
            )}&types=%28cities%29&components=country:${
              selectedCountry?.country_code
            }&language=${language ?? 'en_US'}&key=${GOOGLE_API}`,
          )
          .then((response: any) => {
            const listCities = response.predictions.filter((city: any) =>
              city.types?.includes('locality'),
            );

            const data: any = listCities.map((city: any) => {
              return {
                id: city.place_id,
                name: city.structured_formatting.main_text,
                country: city.terms[city.terms.length - 1].value,
                description: city.description,
                secondary_text: city.structured_formatting.secondary_text,
              };
            });
            resolve(data);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  };

  return {getCountryByKeyword, getCityByKeyword};
};

export default useLocation;
