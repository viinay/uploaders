import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvuploaderComponent } from './csvuploader.component';

describe('CsvuploaderComponent', () => {
  let component: CsvuploaderComponent;
  let fixture: ComponentFixture<CsvuploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvuploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvuploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
