import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'BANCO'`, () => {
    expect(component.title).toEqual('BANCO');
  });

  it('should render title in the header', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    expect(compiled.query(By.css('app-header')).componentInstance.title).toBe('BANCO');
  });

  it('should have a router outlet', () => {
    const compiled = fixture.debugElement;
    expect(compiled.query(By.directive(RouterOutlet))).toBeTruthy();
  });
});
