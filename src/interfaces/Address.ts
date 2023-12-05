export interface Address {
  id: string;
  street_address: string;
  apt_number?: string;
  city: string;
  state: string;
  zip_code: number;
  latitude: number;
  longitude: number;
}
