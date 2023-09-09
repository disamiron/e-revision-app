import { ColorMap } from './enums';

export const urlValues = {
  auth: 'auth',
  dashboard: 'dashboard',
  revision: 'revision',
  scan: 'scan',
  product: 'product',
  search: 'search',
  storeSearch: 'store-search',
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
  revision: 'Ревизия',
  scan: 'Сканирование кода',
  product: 'Продукт',
  editProduct: 'Продукт (редактирование)',
  viewProduct: 'Продукт (просмотр)',
  search: 'Поиск по ревизии',
  storeSearch: 'Поиск по магазину',
};

export const shopInfoButtonsText = {
  search: 'Поиск по магазину',
  revision: 'Ревизия',
  downloadFile: 'Загрузить файл товаров',
  productsOnTheWay: 'Загрузить файл товаров в пути',
};

export const shopRevisonButtonsText = {
  scanning: 'Сканирование',
  search: 'Поиск по ревизии',
  sendToMail: 'Отправить результат',
  saveFile: 'Скачать результат',
  uploadFile: 'Загрузить файл ревизии',
  start: 'Начать ревизию',
  complete: 'Закончить ревизию',
};

export const dateFormat: string = 'dd.MM.YYYY HH:mm';
