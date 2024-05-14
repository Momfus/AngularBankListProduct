import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductTableSkeletonLoaderComponent } from './product-table-skeleton-loader.component';

describe('ProductTableSkeletonLoaderComponent', () => {
  let component: ProductTableSkeletonLoaderComponent;
  let fixture: ComponentFixture<ProductTableSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductTableSkeletonLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logo and description columns when isScreenLarge is true', () => {
    component.isScreenLarge = true;
    fixture.detectChanges();

    const logoColumns = fixture.debugElement.queryAll(By.css('.column-logo'));
    const descriptionColumns = fixture.debugElement.queryAll(By.css('.column-description'));

    expect(logoColumns.length).toBeGreaterThan(0);
    expect(descriptionColumns.length).toBeGreaterThan(0);
  });

  it('should not show logo and description columns when isScreenLarge is false', () => {
    component.isScreenLarge = false;
    fixture.detectChanges();

    const logoColumns = fixture.debugElement.queryAll(By.css('.column-logo'));
    const descriptionColumns = fixture.debugElement.queryAll(By.css('.column-description'));

    expect(logoColumns.length).toBe(0);
    expect(descriptionColumns.length).toBe(0);
  });
});
