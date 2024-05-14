import { Injectable, signal } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Product, ProductPage } from "../models/product.model";
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  map,
  of,
  tap,
  throwError,
} from "rxjs";

interface StatePage {
  itemsPerPage: number;
  page: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  BASE_URL = environment.baseUrl;

  $productListAux = new BehaviorSubject<Product[]>([]);
  productListFiltered: Product[] = [];
  isSearchActive = false;

  isLoading = signal(false);
  isCheckingId = signal(false);

  headers = { authorId: environment.authId };

  private state = new BehaviorSubject<StatePage>({
    itemsPerPage: 5,
    page: 1,
  });

  constructor(private http: HttpClient) {}

  public getProducts(
    perPage: number = 5,
    page: number = 1,
  ): Observable<ProductPage> {
    if (this.$productListAux.getValue().length > 0 && !this.isSearchActive) {
      return of(
        this._createProductPage(this.$productListAux.getValue(), perPage, page)
      );
    }

    if (this.isSearchActive) {
      return of(
        this._createProductPage(this.productListFiltered, perPage, page)
      );
    }

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
          this.$productListAux.next(products);
        }),
        map((products) => this._createProductPage(products, perPage, page)),
        tap(() => this.isLoading.set(false))
      );
  }

  public createProduct(product: Product): Observable<Product> {
    if (this.$productListAux.getValue().length === 0) {
      this.getProducts().subscribe();
    }

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
          const currentProductList = this.$productListAux.getValue();
          currentProductList.push(newProduct);
          this.$productListAux.next(currentProductList);
          this.updateState(this.state.value);
          this.getProducts(
            this.state.value.itemsPerPage,
            this.state.value.page
          ).subscribe();
        })
      );
  }

  public editProduct(product: Product): Observable<Product> {
    this.isLoading.set(true);

    return this.http
      .put<Product>(`${this.BASE_URL}`, product, { headers: this.headers })
      .pipe(
        catchError((error) => {
          this.isLoading.set(false);
          return this.handleError(error);
        }),
        tap((updatedProduct) => {
          this.isLoading.set(false);
          const currentProductList = this.$productListAux.getValue();
          const index = currentProductList.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (index !== -1) {
            currentProductList[index] = updatedProduct;
            this.$productListAux.next(currentProductList);
            this.updateState(this.state.value);
            this.getProducts(
              this.state.value.itemsPerPage,
              this.state.value.page
            ).subscribe();
          }
        })
      );
  }

  public getProductById(id: string): Observable<Product> {
    const loadProducts$ =
      this.$productListAux.getValue().length === 0
        ? this.getProducts().pipe(map(() => null))
        : of(null);

    return loadProducts$.pipe(
      concatMap(() => {
        this.isLoading.set(true);
        const product = this.$productListAux
          .getValue()
          .find((p) => p.id === id);
        if (!product) {
          return throwError(() => new Error(`Product with id ${id} not found`));
        }
        return of(product).pipe(
          tap(() => {
            setTimeout(() => {
              this.isLoading.set(false);
            }, 1500); // Simulate the API call if it have a getProductById endpoint
          })
        );
      })
    );
  }

  public deleteProduct(productId: string): Observable<void> {
    this.isLoading.set(true);

    return this.http
      .delete(`${this.BASE_URL}?id=${productId}`, {
        headers: this.headers,
        responseType: "text",
      })
      .pipe(
        map(() => undefined),
        catchError((error) => {
          this.isLoading.set(false);
          return this.handleError(error);
        }),
        tap(() => {
          const currentProductList = this.$productListAux.getValue();
          const index = currentProductList.findIndex((p) => p.id === productId);
          if (index !== -1) {
            currentProductList.splice(index, 1);
            this.$productListAux.next(currentProductList);
          }
        }),
        tap(() => {
          this.getProducts(
            this.state.value.itemsPerPage,
            this.state.value.page
          ).subscribe();
        }),
        tap(() => {
          this.isSearchActive = false;
          this.productListFiltered = [];
          this.isLoading.set(false);
        })
      );
  }

  public searchProducts(searchString: string): Observable<ProductPage> {
    if (searchString === "") {
      this.productListFiltered = [];
      this.isSearchActive = false;
    } else {
      this.productListFiltered = this.$productListAux
        .getValue()
        .filter((product) =>
          product.name.toLowerCase().includes(searchString.toLowerCase())
        );
      this.isSearchActive = true;
    }

    return this.getProducts(this.state.value.itemsPerPage, 1);
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
        errorMessage = errorRes.error;
        break;
    }

    return throwError(() => errorMessage);
  }

  public changePage(page: number): void {
    this.updateState({ page });
    this.getProducts(this.state.value.itemsPerPage, page).subscribe();
  }

  public updateState(newState: Partial<StatePage>): void {
    const updatedState = { ...this.state.value, ...newState };
    const totalPages = Math.ceil(
      this.$productListAux.getValue().length / updatedState.itemsPerPage
    );

    if (updatedState.page > totalPages) {
      updatedState.page = totalPages;
    }

    this.state.next(updatedState);
  }

  public getState(): Observable<StatePage> {
    return this.state.asObservable();
  }

  public verifyProductId(id: string): Observable<boolean> {
    this.isCheckingId.set(true);
    return this.http
      .get<boolean>(`${this.BASE_URL}/verification?id=${id}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        }),
        tap(() => this.isCheckingId.set(false))
      );
  }
}
