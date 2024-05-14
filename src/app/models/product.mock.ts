import { Product, ProductPage } from "./product.model";

export const mockProduct: Product = {
  id: 'trj-cred-1',
  name: 'credito 1',
  description: 'Tarjeta de consumo bajo la modalidad de crédito',
  logo: 'https://www.visa.com.ua/dam/VCOM/regional/cemea/genericcis/paywithvisa/promotions/fast_track_international/visa-signature-400x225.jpg',
  date_release: new Date('2023-02-01'),
  date_revision: new Date('2024-02-01')
};


export const mockProductList: Product[] = [
  {
    id: 'trj-cred-1',
    name: 'credito 1',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ua/dam/VCOM/regional/cemea/genericcis/paywithvisa/promotions/fast_track_international/visa-signature-400x225.jpg',
    date_release: new Date('2023-02-01'),
    date_revision: new Date('2024-02-01')
  },
  {
    id: 'trj-cred-2',
    name: 'credito 2',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ua/dam/VCOM/regional/cemea/genericcis/paywithvisa/promotions/fast_track_international/visa-signature-400x225.jpg',
    date_release: new Date('2023-02-01'),
    date_revision: new Date('2024-02-01')
  },
  {
    id: 'trj-cred-3',
    name: 'credito 3',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ua/dam/VCOM/regional/cemea/genericcis/paywithvisa/promotions/fast_track_international/visa-signature-400x225.jpg',
    date_release: new Date('2023-02-01'),
    date_revision: new Date('2024-02-01')
  },
  {
    id: 'trj-cred-4',
    name: 'credito 4',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ua/dam/VCOM/regional/cemea/genericcis/paywithvisa/promotions/fast_track_international/visa-signature-400x225.jpg',
    date_release: new Date('2023-02-01'),
    date_revision: new Date('2024-02-01')
  },
];

export const mockProductPage: ProductPage = new ProductPage(mockProductList, {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: mockProductList.length,
  totalPages: 1
});

