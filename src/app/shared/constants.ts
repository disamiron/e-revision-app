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

export const appName = 'E Revision';

export const appSections = [
  {
    url: '../' + urlValues.dashboard,
    name: 'Список магазинов',
    icon: 'view_list',
    isAdminRights: false,
  },
];

export const menuButtonsText = {
  volume: 'Звук',
  vibration: 'Вибрация',
  textToSpeech: 'Проговаривание',
  logout: 'Выйти',
};

export const dashboardTitle = {
  shopList: 'Список магазинов',
  shop: 'Магазин',
};
