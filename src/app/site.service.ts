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
        supplierProductionRate: 40, // kg/day
        supplierProductionStoragePressureCapacity: 250, // bar[g]
        offTakerConsumptionRate: 250 // kg/week
      },
      {
        name: 'Shell Kentucky Site',
        coordinates: { latitude: 34.0522, longitude: -118.2437 },
        supplierProductionRate: 40, // kg/day
        supplierProductionStoragePressureCapacity: 250, // bar[g]
        offTakerConsumptionRate: 250 // kg/week
      }
    ];
  }
}
