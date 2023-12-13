export interface Storage {
  type: StorageType;
  value?: any;
}

export enum StorageType {
  User = 'REVISION_APP_USER',
  ScanOptions = 'REVISION_APP_SCAN_OPTIONS',
  Volume = 'REVISION_VOLUME',
  Notification = 'REVISION_NOTIFICATION',
  FavoriteShopId = 'REVISION_FAVORITE_SHOP_ID',
  ShippedSwitch = 'REVISION_SHIPPED_SWITCH',
}
