import type { Address } from "./Address.js";
import type { Amenity } from "./Amenity.js";
import type { Image } from "./Image.js";
import type { Bathroom } from "./Bathroom.js";
import type { Bedroom } from "./Bedroom.js";

export interface Listing {
  id: string;
  name: string;
  headline: string;
  accommodations_summary: string;
  description: string;

  bedroom_details: string;
  bathroom_details: string;

  property_url?: string;
  owner_rez_id?: string;
  owner_rez_url?: string;

  beds: number;
  baths: number;
  square_feet: number;

  max_guests: number;
  allows_children: boolean;
  allows_pets: boolean;

  address: Address;
  amenities: [Amenity];
  images: [Image];
  bedrooms: [Bedroom];
  bathrooms: [Bathroom];

  created: string;
}
