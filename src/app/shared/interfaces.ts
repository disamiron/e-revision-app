import { RevisionStatus, Roles } from './enums';

export interface IUser {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: string;
  username: string;
  userPhone: string;
  roles: Roles[];
}

export interface ILoginData {
  phoneNumber: string;
  password: string;
  phoneId: IPhoneId;
}

export interface IPhoneId {
  type: string;
  id: string | null;
}

export interface IError {
  applicationErrorCode: string;
  message: string;
}

export interface IShop {
  address: string;
  currentRevisionId: string;
  shopId: string;
  shopName: string;
  status: RevisionStatus;
  isProductsLoaded: boolean;
  revision: IShopRevisionInfo | null;
  fileUploadDate?: string;
}

export interface IShopRevisionInfo {
  participants: number;
  localCodes?: number;
  scannedLocalCodes?: number;
  startTime: string;
  endTime: string;
  startedBy: IStartedBy | null;
}

export interface IStartedBy {
  phone: string;
  username: string;
}

export interface IShopArray {
  content: IShop[];
}

export interface IRevision {
  revisionId: string;
  status: RevisionStatus;
  userId: string;
}

export interface IProduct {
  scannedProductId: string;
  userId: string;
  barcode: string;
  localCode: string;
  price: number;
  quantity: number;
  scannedQuantity: number;
  description: string;
  timeScanned: string;
  unitsPerPack: number;
  revisionId: string;
  user: IUser;
  shippedQuantity?: number;
}

export interface IProductArray {
  content: IProduct[];
}

export interface IGlobalProduct {
  description: string;
  localCode: string;
  price: number;
  unitsPerPack: number;
  shops: {
    lastShopUpdate: string;
    quantity: number;
    shopName: string;
  }[];
}
