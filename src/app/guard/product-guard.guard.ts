import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class ProductPermissionService {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const id = route.paramMap.get('id');
    if (id === null) {
      this.router.navigate(['/home']);
      return of(false);
    }
    return this.productService.verifyProductId(id).pipe(
      take(1),
      map((exists: boolean) => {
        if (!exists) {
          console.error(`Product ID ${id} doesn't exist`);

          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}

export const ProductGuard: CanActivateFn = (next: ActivatedRouteSnapshot): Observable<boolean> => {
  return inject(ProductPermissionService).canActivate(next);
}
