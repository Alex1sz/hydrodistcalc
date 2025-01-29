import { Injectable } from '@angular/core';

interface TrailerSpecs {
  pricePerMonth: number;
  designCapacity: number;
  designPressure: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrailerModelService {
  private trailerSpecs: Record<string, TrailerSpecs> = {
    'GTL 1500': { pricePerMonth: 5900.00, designCapacity: 146, designPressure: 450 },
    'GTL 1500 X2': { pricePerMonth: 11800.00, designCapacity: 146, designPressure: 450 },
    'GTL Tandem': { pricePerMonth: 19500.00, designCapacity: 500, designPressure: 450 }
  };

  getTrailerModels() {
    return Object.keys(this.trailerSpecs).map(name => ({ name }));
  }

  getTrailerDetails(trailerModel: string): TrailerSpecs {
    return this.trailerSpecs[trailerModel] || {};
  }
} 