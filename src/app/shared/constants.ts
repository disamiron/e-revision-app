export const urlValues = {
  auth: 'auth',
  dashboard: 'dashboard',
  revision: 'revision',
  product: 'product',
  search: 'search',
  searchShop: 'search-shop',
  shop: 'shop',

  edit: 'edit',
  view: 'view',
};

export const appName = 'E-Revision';

export const appSections = [
  {
    url: '../' + urlValues.dashboard,
    name: 'Список магазинов',
    isAdminRights: false,
  },
];
