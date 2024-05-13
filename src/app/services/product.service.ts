import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product, ProductPage } from '../models/product.model';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  BASE_URL = environment.baseUrl;

  productListAux = new BehaviorSubject<Product[]>([]);
  productListFiltered: Product[] = [];

  isLoading = signal(false)

  headers = { 'authorId': environment.authId };

  constructor(
    private http: HttpClient,
  ) { }

  public getProducts(perPage: number = 5, page: number = 1): Observable<ProductPage> {
    if (this.productListAux.getValue().length === 0) {
      this.isLoading.set(true);

      return this.http
        .get<Product[]>(`${this.BASE_URL}`, { headers: this.headers })
        .pipe(
          catchError((error) => {
            this.isLoading.set(false);
            return this.handleError(error);
          }),
          tap((products) => {
            this.isLoading.set(false);
            this.productListAux.next(products);
          }),
          map((products) => this._createProductPage(products, perPage, page))
        );
    } else {
      const products = this.productListAux.getValue();
      return of(this._createProductPage(products, perPage, page));
    }
  }

  private _createProductPage(products: Product[], perPage: number, page: number): ProductPage {
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const currentPage = page;
    const offset = (page - 1) * perPage;
    const items = products.slice(offset, offset + perPage);

    return {
      products: items,
      pagination: {
        currentPage,
        itemsPerPage: perPage,
        totalItems,
        totalPages
      }
    };
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error ocurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    // @TODO: Implementar manejo de errores
    switch (errorRes.error.error.message) {
      default:
        errorMessage = "This email does not exist";
        break;
    }

    return throwError(() => errorMessage);

  }

}
function Of(arg0: ProductPage): Observable<ProductPage> {
  throw new Error('Function not implemented.');
}

