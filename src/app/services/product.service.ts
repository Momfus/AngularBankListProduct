import { Injectable, signal } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Product, ProductPage } from "../models/product.model";
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from "rxjs";

interface StateFilter {
  itemsPerPage: number;
  page: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  BASE_URL = environment.baseUrl;

  productListAux = new BehaviorSubject<Product[]>([]);
  productListFiltered: Product[] = [];

  isLoading = signal(false);
  isCheckingId = signal(false);

  headers = { authorId: environment.authId };

  private state = new BehaviorSubject<StateFilter>({
    itemsPerPage: 5,
    page: 1,
  });

  constructor(private http: HttpClient) {}

  public getProducts(
    perPage: number = 5,
    page: number = 1
  ): Observable<ProductPage> {
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
  }

  public createProduct(product: Product): Observable<Product> {
    this.isLoading.set(true);

    return this.http
      .post<Product>(`${this.BASE_URL}`, product, { headers: this.headers })
      .pipe(
        catchError((error) => {
          this.isLoading.set(false);
          return this.handleError(error);
        }),
        tap((newProduct) => {
          this.isLoading.set(false);
          const currentProductList = this.productListAux.getValue();
          currentProductList.push(newProduct);
          this.productListAux.next(currentProductList);
          this.updateState(this.state.value);
          this.getProducts(
            this.state.value.itemsPerPage,
            this.state.value.page
          ).subscribe();
        })
      );
  }

  private _createProductPage(
    products: Product[],
    perPage: number,
    page: number
  ): ProductPage {
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
        totalPages,
      },
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

  public changePage(page: number): void {
    this.updateState({ page });
    this.getProducts(this.state.value.itemsPerPage, page).subscribe();
  }

  public updateState(newState: Partial<StateFilter>): void {
    const updatedState = { ...this.state.value, ...newState };
    const totalPages = Math.ceil(
      this.productListAux.getValue().length / updatedState.itemsPerPage
    );

    if (updatedState.page > totalPages) {
      updatedState.page = totalPages;
    }

    this.state.next(updatedState);
  }

  public getState(): Observable<StateFilter> {
    return this.state.asObservable();
  }

  public verifyProductId(id: string): Observable<boolean> {
    this.isCheckingId.set(true);
    return this.http
      .get<boolean>(`${this.BASE_URL}/verification?id=${id}`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        }),
        tap(() => this.isCheckingId.set(false))
      );
  }
}
