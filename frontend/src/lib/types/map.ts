
export interface MapProps {
    card: MapCard;
  }

export interface MapCard {
    coord: {
        lat: number;
        lng: number;
        int: number;
    }
}

export interface MapComponentProps {
    data: MapCard[];
}