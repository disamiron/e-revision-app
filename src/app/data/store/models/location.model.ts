export const LOCATION_DATA_KEY = 'locationData';

export interface ILocationDataState {
  prevLocaction: string | null;
  error: string | null;
}

export enum LocationActions {
  SetPrevLocationData = 'SetPrevLocationData',
  NavigateToPrevLocation = 'NavigateToPrevLocation',
}
