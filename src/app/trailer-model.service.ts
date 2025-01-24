import { Injectable } from '@angular/core';

interface TrailerSpecs {
  price: number;
  capacity: number;
  pressureCapacity: number;
  volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrailerModelService {
  private trailerSpecs: Record<string, TrailerSpecs> = {
    'GTL 1500': { price: 5900, capacity: 146, pressureCapacity: 250, volume: 450 },
    'GTL 1500 X2': { price: 11800, capacity: 292, pressureCapacity: 250, volume: 450 },
    'GTL Tandem': { price: 19500, capacity: 500, pressureCapacity: 250, volume: 450 }
  };

  getTrailerModels() {
    return Object.keys(this.trailerSpecs).map(name => ({ name }));
  }

  getTrailerDetails(trailerModel: string): TrailerSpecs {
    return this.trailerSpecs[trailerModel] || {};
  }
} 