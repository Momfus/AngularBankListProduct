import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { ProductListComponent } from "./product-list.component";
import { ProductService } from "../../services/product.service";
import { ProductPage } from "../../models/product.model";

describe("ProductListComponent", () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let router: Router;

  beforeEach(async () => {
    const productServiceMock = {
      getState: jasmine
        .createSpy("getState")
        .and.returnValue(of({ itemsPerPage: 10, page: 1 })),
      getProducts: jasmine
        .createSpy("getProducts")
        .and.returnValue(of(new ProductPage())),
      deleteProduct: jasmine
        .createSpy("deleteProduct")
        .and.returnValue(of(null)),
      changePage: jasmine.createSpy("changePage"),
      searchProducts: jasmine
        .createSpy("searchProducts")
        .and.returnValue(of(new ProductPage())),
      isLoading: { asReadonly: jasmine.createSpy("asReadonly") },
    };

    const routerMock = {
      navigate: jasmine.createSpy("navigate"),
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    })
      .overrideTemplate( // @TODO: Remover esto a futuro hasta que comprenda mejor como funcionan los signals (al quitarlo fallan varios test)
        ProductListComponent,
              `
          <input #searchInput type="text">
        `
      )
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();  // Añade esta línea
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add a product", () => {
    component.onAddProduct();
    expect(router.navigate).toHaveBeenCalledWith(["/product"]);
  });

  it("should edit a product", () => {
    component.onEditProduct("1");
    expect(router.navigate).toHaveBeenCalledWith(["/product", "1"]);
  });

  it("should confirm delete a product", () => {
    component.onDeleteProduct("1");
    expect(productService.deleteProduct).toHaveBeenCalledWith("1");
  });

  it("should search for a product", () => {
    component.onSearch("test");
    expect(productService.searchProducts).toHaveBeenCalledWith("test");
  });

  it('should get products on init', (done) => {
    component.ngOnInit();


    setTimeout(() => {
      expect(productService.getState).toHaveBeenCalled();
      expect(productService.getProducts).toHaveBeenCalled();
      done();
    });
  });
});
