import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductTableActionMenuComponent } from './product-table-action-menu.component';

describe('ProductTableActionMenuComponent', () => {
  let component: ProductTableActionMenuComponent;
  let fixture: ComponentFixture<ProductTableActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTableActionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editProduct event when onEditProduct is called', () => {
    spyOn(component.editProduct, 'emit');

    component.onEditProduct();
    expect(component.editProduct.emit).toHaveBeenCalled();
  });

  it('should emit deleteProduct event when onDeleteProduct is called', () => {
    spyOn(component.deleteProduct, 'emit');

    component.onDeleteProduct();
    expect(component.deleteProduct.emit).toHaveBeenCalled();
  });

  it('should set menu position correctly', () => {
    component.menuPosition = { top: 10, left: 20, right: 0, bottom: 0 };
    fixture.detectChanges();

    const menuOptions = fixture.debugElement.query(By.css('.menu-options')).nativeElement;
    expect(menuOptions.style.top).toBe('10px');
    expect(menuOptions.style.left).toBe('20px');
  });
});
