import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSetDetailsComponent } from './icon-set-details.component';
import { MockModule, MockProviders } from 'ng-mocks';
import { IconSetCustomizationService } from '../../service/icon-set-customization.service';
import { MaterialModule } from 'src/app/workbench/material.module';

describe(IconSetDetailsComponent.name, () => {
  let component: IconSetDetailsComponent;
  let fixture: ComponentFixture<IconSetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(MaterialModule)],
      declarations: [IconSetDetailsComponent],
      providers: [MockProviders(IconSetCustomizationService)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
