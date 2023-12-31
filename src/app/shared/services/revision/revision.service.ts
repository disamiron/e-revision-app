import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGlobalProduct,
  ILoginData,
  IProduct,
  IProductArray,
  IShop,
  IShopArray,
  IUser,
} from '../../interfaces';
import { BaseHttpService } from '../base-http/base-http.service';
import { StorageService } from '../storage/storage.service';
import { StorageType } from '../storage/storage.type';

@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  private readonly _authUrl = '/auth';

  private readonly _admin = '/admin';

  private readonly _loginUrl = `${this._authUrl}/login`;

  private readonly _logoutUrl = `${this._authUrl}/logout`;

  private readonly _shop = '/shop';

  private readonly _allShop = `${this._shop}/all`;

  private readonly _allShopProduct = `${this._allShop}/product`;

  private readonly _revisionUrl = `/revision`;

  private readonly _startRevisionUrl = `${this._revisionUrl}/start`;
  private readonly _endRevisionUrl = `${this._revisionUrl}/end`;
  private readonly _resultUrl = `${this._revisionUrl}/result`;
  private readonly _downloadUrl = `${this._revisionUrl}/result/download`;
  private readonly _searchUrl = `${this._revisionUrl}/search`;

  private readonly _upload = '/upload';

  private readonly _shippedUrl = `/shipped${this._upload}`;

  private readonly _productUrl = `/product`;
  private readonly _uploadUrl = `${this._productUrl}${this._upload}`;

  constructor(
    private _http: BaseHttpService,
    private _storage: StorageService
  ) {}

  public login(data: ILoginData): Observable<IUser> {
    return this._http.post<IUser>(this._loginUrl, { ...data });
  }

  public logout() {
    return this._http.post(this._logoutUrl);
  }

  public getAllShop(): Observable<IShopArray> {
    return this._http.get<IShopArray>(this._allShop);
  }

  public getShopById(id: string): Observable<IShop> {
    return this._http.get<IShop>(this._shop, { shopId: id });
  }

  public startRevisionByShopId(shopId: string) {
    return this._http.post(`${this._shop}/${shopId}${this._startRevisionUrl}`);
  }

  public stopRevisionByShopId(shopId: string) {
    return this._http.post(`${this._shop}/${shopId}${this._endRevisionUrl}`);
  }

  public uploadFileRevision(shopId: string, file: File, isShipping: boolean) {
    return this._http.postBlobWithProgress(
      `${this._shop}/${shopId}${
        isShipping ? this._shippedUrl : this._uploadUrl
      }`,
      file
    );
  }

  public getProductByBarcode(
    shopId: string,
    barcode: string
  ): Observable<IProduct> {
    return this._http.get<IProduct>(
      `${this._shop}/${shopId}${this._productUrl}`,
      {
        code: barcode,
      }
    );
  }

  public saveProduct(shopId: string, product: Partial<IProduct>) {
    return this._http.post(
      `${this._shop}/${shopId}${this._productUrl}`,
      product
    );
  }

  public editProduct(shopId: string, product: Partial<IProduct>) {
    return this._http.put(
      `${this._shop}/${shopId}${this._productUrl}`,
      product
    );
  }

  public sendResultToEmail(shopId: string) {
    const shippedSwitch: boolean = this._storage.getItem(
      StorageType.ShippedSwitch
    );
    return this._http.get(
      `${this._admin}${this._shop}/${shopId}${this._resultUrl}`,
      {
        shippedSwitch,
      }
    );
  }

  public downloadFileRevision(shopId: string) {
    return this._http.getBlob(
      `${this._admin}${this._shop}/${shopId}${this._downloadUrl}`
    );
  }

  public searchByLocalId(
    shopId: string,
    localCode: string
  ): Observable<IProductArray> {
    return this._http.get<IProductArray>(
      `${this._shop}/${shopId}${this._searchUrl}/${localCode}`
    );
  }

  public searchByLocalIdAllShops(barcode: string): Observable<IGlobalProduct> {
    return this._http.get<IGlobalProduct>(`${this._allShopProduct}/${barcode}`);
  }
}
