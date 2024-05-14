import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalConfirmationComponent } from './modal-confirmation.component';
import { mockProduct } from '../../models/product.mock';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event with product id on confirm', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const confirmSpy = spyOn(component.confirm, 'emit');
    const confirmButton = fixture.debugElement.query(By.css('.btn-primary'));
    confirmButton.triggerEventHandler('click', null);

    expect(confirmSpy).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should emit cancel event on cancel', () => {
    const cancelSpy = spyOn(component.cancel, 'emit');
    const cancelButton = fixture.debugElement.query(By.css('.btn-secondary'));
    cancelButton.triggerEventHandler('click', null);

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should stop event propagation on cancel', () => {
    const event = new MouseEvent('click');
    const stopPropagationSpy = spyOn(event, 'stopPropagation');
    component.onCancel(event);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
