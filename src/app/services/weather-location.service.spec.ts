import { TestBed } from '@angular/core/testing';

import { WeatherLocationService } from './weather-location.service';

describe('WeatherLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherLocationService = TestBed.get(WeatherLocationService);
    expect(service).toBeTruthy();
  });
});
