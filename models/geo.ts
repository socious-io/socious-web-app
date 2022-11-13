export interface GeoIP {
  /**
   * location id for geoname API
   */
  id: number;
  /**
   * ISO country code
   */
  country: string;
  /**
   * ISO 3166-2 or FIPS PUB 10-4 first-level region code
   */
  region?: string;
  city?: string;
  /**
   * true if the location is in the European Union
   */
  eu: boolean;
  /**
   * IANA timezone
   */
  timezone?: string;
  /**
   * first-level division ISO code
   */
  admin1_code?: string;
  /**
   * first-level division ID for geoname
   */
  admin1_id?: number;
  /**
   * first-level division name
   */
  admin1_name?: string;
  /**
   * second-level division ISO code where applicable
   */
  admin2_code?: string;
  /**
   * second-level division ID for geoname where applicable
   */
  admin2_id?: number;
  /**
   * second-level division name where applicable
   */
  admin2_name?: string;
}

/**
 * Type of location record (city, town, capital, etc)
 * - PPL: a city, town, village, or other agglomeration of buildings where people live and work
 * - PPLA: seat of a first-order administrative division (PPLC takes precedence over PPLA)
 * - PPLA2: seat of a second-order administrative division
 * - PPLA3: seat of a third-order administrative division
 * - PPLA4: seat of a fourth-order administrative division
 * - PPLA5: seat of a fifth-order administrative division
 * - PPLC: capital of a political entity
 * - PPLCH: former (historical) capital of a political entity
 * - PPLF: farm village
 * - PPLG: seat of government of a political entity
 * - PPLL: an area similar to a locality but with a small group of dwellings or other buildings
 * - PPLR: a populated place whose population is largely engaged in religious occupations
 * - PPLS: cities, towns, villages, or other agglomerations of buildings where people live and work
 * - STLMT: Israeli settlement
 *
 */
export type LocationType =
  | 'PPL'
  | 'PPLA'
  | 'PPLA2'
  | 'PPLA3'
  | 'PPLA4'
  | 'PPLA5'
  | 'PPLC'
  | 'PPLCH'
  | 'PPLF'
  | 'PPLG'
  | 'PPLL'
  | 'PPLR'
  | 'PPLS'
  | 'STLMT';

export interface GeoName {
  id: number;
  name: string;
  type: LocationType;
  population: number;
  country_code: string;
  region_id: string;
  region_name?: string;
  region_iso?: string;
  subregion_id: string;
  subregion_name?: string;
  subregion_iso?: string;
  alternate_name?: string;
  alt_language?: string;
  is_historic?: boolean;
  is_colloquial?: boolean;
  is_short_name?: boolean;
}
