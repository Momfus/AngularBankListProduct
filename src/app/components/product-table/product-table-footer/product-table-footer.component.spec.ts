import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableFooterComponent } from './product-table-footer.component';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';

describe('ProductTableFooterComponent', () => {
  let component: ProductTableFooterComponent;
  let fixture: ComponentFixture<ProductTableFooterComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ProductTableFooterComponent ],
      providers: [
        { provide: ProductService, useValue: { updateState: jasmine.createSpy() } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableFooterComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changePage event when onPrevPage is called and currentPage > 1', () => {
    component.pagination = { currentPage: 2, itemsPerPage: 5, totalItems: 10, totalPages: 2 };
    fixture.detectChanges();

    spyOn(component.changePage, 'emit');
    component.onPrevPage();

    expect(component.changePage.emit).toHaveBeenCalledWith(1);
  });

  it('should emit changePage event when onNextPage is called and currentPage < totalPages', () => {
    component.pagination = { currentPage: 1, itemsPerPage: 5, totalItems: 10, totalPages: 2 };
    fixture.detectChanges();

    spyOn(component.changePage, 'emit');
    component.onNextPage();

    expect(component.changePage.emit).toHaveBeenCalledWith(2);
  });

  it('should call productService.updateState when onItemsPerPageChange is called', () => {
    const event = { target: { value: '10' } } as any;
    component.onItemsPerPageChange(event);

    expect(productService.updateState).toHaveBeenCalledWith({ itemsPerPage: 10 });
  });

  it('should emit changePage event when onPageNumberClick is called with a number', () => {
    spyOn(component.changePage, 'emit');
    component.onPageNumberClick(1);

    expect(component.changePage.emit).toHaveBeenCalledWith(1);
  });
});
