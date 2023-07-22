import { IError, IProduct, IShop } from 'src/app/shared/interfaces';

export const REVISION_DATA_KEY = 'revisionData';

export interface IRevisionDataState {
  currentProduct: IProduct | null;
  error: IError | null;
  isLoading: boolean;
  progressBar: number | null;
}

export enum RevisionActions {
  StartRevision = 'StartRevision',
  StopRevision = 'StopRevision',
  GetProductByBarcode = 'GetProductByBarcode',
  UploadRevisionFile = 'UploadRevisionFile',
}
