import { CurrentPlatform } from '../../../shared/enums';

export const PLATFORM_DATA_KEY = 'platformData';

export interface IPlatformDataState {
  platform: CurrentPlatform | null;
  error: string | null;
}

export enum PlatformActions {
  SetCurrentPlatformData = 'SetCurrentPlatformData',
}
