import { TestBed } from '@angular/core/testing';

import { ImportDomainStoryService } from 'src/app/tools/import/services/import-domain-story.service';
import { ElementRegistryService } from '../../../domain/services/element-registry.service';
import { IconDictionaryService } from '../../icon-set-config/services/icon-dictionary.service';
import { DirtyFlagService } from '../../../domain/services/dirty-flag.service';
import { ImportRepairService } from './import-repair.service';
import { TitleService } from '../../header/services/title.service';
import { RendererService } from '../../modeler/services/renderer.service';
import { MockService } from 'ng-mocks';
import { DialogService } from '../../../domain/services/dialog.service';
import { IconSetConfiguration } from '../../../domain/entities/iconSetConfiguration';
import { INITIAL_ICON_SET_NAME } from '../../../domain/entities/common/constants';
import { Dictionary } from '../../../domain/entities/common/dictionary';
import { ElementTypes } from '../../../domain/entities/common/elementTypes';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ImportDomainStoryService', () => {
  let service: ImportDomainStoryService;

  let iconDictionarySpy: jasmine.SpyObj<IconDictionaryService>;

  beforeEach(() => {
    const iconDictionaryMock = jasmine.createSpyObj('iconDictionaryService', [
      'getTypeDictionaryKeys',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRegistryService,
          useValue: MockService(ElementRegistryService),
        },
        {
          provide: IconDictionaryService,
          useValue: iconDictionaryMock,
        },
        {
          provide: DirtyFlagService,
        },
        {
          provide: ImportRepairService,
          useValue: MockService(ImportRepairService),
        },
        {
          provide: TitleService,
        },
        {
          provide: RendererService,
          useValue: MockService(RendererService),
        },
        {
          provide: DialogService,
          useValue: MockService(DialogService),
        },
        {
          provide: MatSnackBar,
          useValue: MockService(MatSnackBar),
        },
      ],
    });
    iconDictionarySpy = TestBed.inject(
      IconDictionaryService,
    ) as jasmine.SpyObj<IconDictionaryService>;
    service = TestBed.inject(ImportDomainStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkConfigForChanges', () => {
    const actorsDict = new Dictionary();
    const workObjectsDict = new Dictionary();

    actorsDict.add('', 'actor');
    workObjectsDict.add('', 'workObject');

    const testDomainCofiguration: IconSetConfiguration = {
      name: INITIAL_ICON_SET_NAME,
      actors: actorsDict,
      workObjects: workObjectsDict,
    };

    it('should find changes, more actors', () => {
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.ACTOR)
        .and.returnValue(['test']);
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.WORKOBJECT)
        .and.returnValue(['workObject']);

      expect(
        service.checkConfigForChanges(testDomainCofiguration),
      ).toBeTruthy();
    });

    it('should find changes, different actors', () => {
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.ACTOR)
        .and.returnValue(['actor', 'test']);
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.WORKOBJECT)
        .and.returnValue(['workObject']);

      expect(
        service.checkConfigForChanges(testDomainCofiguration),
      ).toBeTruthy();
    });

    it('should find changes, different workobjects', () => {
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.ACTOR)
        .and.returnValue(['actor']);
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.WORKOBJECT)
        .and.returnValue(['workObject', 'test']);

      expect(
        service.checkConfigForChanges(testDomainCofiguration),
      ).toBeTruthy();
    });

    it('should find changes, different workobjects', () => {
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.ACTOR)
        .and.returnValue(['actor']);
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.WORKOBJECT)
        .and.returnValue(['test']);

      expect(
        service.checkConfigForChanges(testDomainCofiguration),
      ).toBeTruthy();
    });

    it('should not find changes', () => {
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.ACTOR)
        .and.returnValue(['actor']);
      iconDictionarySpy.getTypeDictionaryKeys
        .withArgs(ElementTypes.WORKOBJECT)
        .and.returnValue(['workObject']);

      expect(service.checkConfigForChanges(testDomainCofiguration)).toBeFalsy();
    });
  });
});
