import en from './en_US/translations.json';
import vi from './vi_VN/translations.json';

export default { en, vi };
const currencies = {
  en: '$',
  th: '฿',
  vi: '₫'
};

export const getCurrencyByLocale = locale => currencies[locale];
