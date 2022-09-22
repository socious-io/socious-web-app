import {get} from 'utils/request';
import {GOOGLE_API} from 'utils/api';

export const getCountryByKeyword = (searchKeyword: string | undefined) => {
  if (searchKeyword) return;
  const jp_lan = false;
  return new Promise((resolve: (response: any) => void, reject) => {
    searchKeyword &&
      get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          searchKeyword,
        )}&types=country&language=${jp_lan ? 'ja' : ''}&key=${GOOGLE_API}`,
      )
        .then((response: any) => {
          const listCountries = response.predictions.map((country: any) => ({
            id: country.place_id,
            name: country.description,
          }));
          console.log('LIST COUNTRIES :---: ', listCountries);
          resolve(listCountries);
        })
        .catch((error: any) => {
          reject(error);
        });
  });
};
export const getCityByKeyword = (
  selectedCountry: any,
  searchKeyword: string | undefined,
) => {
  const language = 'en_US';
  return new Promise((resolve: (response: any) => void, reject) => {
    searchKeyword &&
      selectedCountry &&
      get(
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
