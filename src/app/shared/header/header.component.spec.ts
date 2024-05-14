import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.title'));
    expect(titleElement.nativeElement.textContent).toBe('Test Title');
  });

  it('should navigate to home on title click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const titleElement = fixture.debugElement.query(By.css('.toolbar-title'));
    titleElement.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
