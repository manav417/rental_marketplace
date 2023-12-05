interface BathroomAmenity {
  id: string;
  name: string;
}

export interface Bathroom {
  id: string;
  name: string;
  notes: string;
  sub_type: string;
  amenities: [BathroomAmenity];
}
