interface BedroomAmenity {
  id: string;
  name: string;
}

export interface Bedroom {
  id: string;
  name: string;
  notes: string;
  sub_type: string;
  amenities: [BedroomAmenity];
}
