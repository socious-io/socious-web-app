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
