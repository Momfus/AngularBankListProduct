import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EditProductFormComponent } from './edit-product-form.component';
import { ProductService } from '../../../services/product.service';
import { mockProduct } from '../../../models/product.mock';
import { formatDate } from '@angular/common';


describe('EditProductFormComponent', () => {
  let component: EditProductFormComponent;
  let fixture: ComponentFixture<EditProductFormComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    const productServiceMock = {
      verifyProductId: jasmine.createSpy('verifyProductId').and.returnValue(of(null)),
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of(mockProduct))
    };

    await TestBed.configureTestingModule({
      declarations: [ EditProductFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    })
    .compileComponents();

    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductFormComponent);
    component = fixture.componentInstance;
    component.productId = mockProduct.id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm event on valid form submission', () => {
    spyOn(component.submitForm, 'emit');
    const releaseDate = new Date(mockProduct.date_release);
    const revisionDate = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate());
    component.form.setValue({
      id: mockProduct.id,
      name: mockProduct.name,
      description: mockProduct.description,
      logo: mockProduct.logo,
      date_release: formatDate(releaseDate, "yyyy-MM-dd", "en-US"),
      date_revision: formatDate(revisionDate, "yyyy-MM-dd", "en-US")
    });
    component.form.markAsDirty();
    fixture.detectChanges();
    component.onSubmit();
    const emittedReleaseDate = component.form.value.date_release ? new Date(component.form.value.date_release) : new Date();
    const emittedRevisionDate = component.form.value.date_revision ? new Date(component.form.value.date_revision) : new Date();
    expect(component.submitForm.emit).toHaveBeenCalledWith({
      ...mockProduct,
      date_release: emittedReleaseDate,
      date_revision: emittedRevisionDate
    });
  });

});
