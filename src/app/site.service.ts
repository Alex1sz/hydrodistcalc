import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor() { }

  getSites() {
    return [
      {
        name: 'N Virginia Facility #1',
        coordinates: { latitude: 38.8951, longitude: -77.0364 },
        productionRate: 1000, // kg/day
        productionStoragePressure: 5, // bar[g]
        consumptionRate: 250 // kg/week
      },
      {
        name: 'Shell Kentucky Site',
        coordinates: { latitude: 34.0522, longitude: -118.2437 },
        productionRate: 800, // kg/day
        productionStoragePressure: 4, // bar[g]
        consumptionRate: 250 // kg/week
      }
    ];
  }
}
