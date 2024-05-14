import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { mockProduct, mockProductList, mockProductPage } from '../models/product.mock';
import { Product } from '../models/product.model';


describe('ProductService - Individual check', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch products', () => {
    service.getProducts().subscribe(productPage => {
      expect(productPage.products.length).toBe(mockProductPage.products.length);
      expect(productPage.pagination.currentPage).toBe(mockProductPage.pagination.currentPage);
      expect(productPage.pagination.itemsPerPage).toBe(mockProductPage.pagination.itemsPerPage);
      expect(productPage.pagination.totalItems).toBe(mockProductPage.pagination.totalItems);
      expect(productPage.pagination.totalPages).toBe(mockProductPage.pagination.totalPages);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductPage.products);
  });

  it('should fetch a product by id', () => {
    const productId = 'trj-cred-1';

    service.getProducts().subscribe(() => {
      service.getProductById(productId).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });
    });

    const req = httpMock.expectOne(`${service.BASE_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductList);

  });

  it('should create a product', (done) => {
    const newProduct: Product = {
      id: 'new-prod-1',
      name: 'New Product',
      description: 'Tarjeta de consumo bajo la modalidad de crédito',
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
      date_release: new Date('2023-02-01'),
      date_revision: new Date('2024-02-01')
    };

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
      done();
    });

    const requests = httpMock.match(`${service.BASE_URL}`);
    requests.forEach(request => {
      if (request.request.method === 'POST') {
        request.flush(newProduct);
      } else if (request.request.method === 'GET') {
        request.flush(mockProductList);
      }
    });
  });

  it('should edit a product', (done) => {
    const updatedProduct: Product = {
      id: 'trj-cred-1',
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
      date_release: new Date('2023-02-01'),
      date_revision: new Date('2024-02-01')
    };

    service.editProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
      done();
    });

    const request = httpMock.expectOne(`${service.BASE_URL}`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedProduct);
  });

  it('should search products', () => {
    service.$productListAux.next(mockProductList);

    service.searchProducts('credito').subscribe((productPage) => {
      const expectedProducts = mockProductList.filter(product => product.name.toLowerCase().includes('credito'));
      expect(productPage.products).toEqual(expectedProducts);
    });
  });

  it('should delete a product', (done) => {
    const productId = 'trj-cred-1';

    service.deleteProduct(productId).subscribe(() => {
      done();
    });

    const deleteReq = httpMock.expectOne(`${service.BASE_URL}?id=${productId}`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    const getReq = httpMock.expectOne(`${service.BASE_URL}`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(mockProductList);
  });

  it('should change page ', () => {
    const mockProducts = mockProductList;
    service.changePage(2);
    const req = httpMock.expectOne(`${service.BASE_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

  });

  it('should verify product id', (done) => {
    const productId = 'trj-cred-1';
    const expectedResponse = true;

    service.verifyProductId(productId).subscribe(response => {
      expect(response).toBe(expectedResponse);
      done();
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should handle error in verifyProductId', (done) => {
    const productId = 'trj-cred-1';

    service.verifyProductId(productId).subscribe(response => {
      expect(response).toBe(false);
      done();
    }, error => {
      expect(error).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });

});



