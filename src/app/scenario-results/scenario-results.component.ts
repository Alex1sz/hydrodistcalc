import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ScenarioResult {
  origin: string;
  destination: string;
  distance: number;
  productionRate: number;
  pressureCapacity: number;
  daysToTransport: number;
  consumptionRate: number;
  offloadTime: number;
  haulerPrice: number;
  oneWayPrice: number;
  roundTripPrice: number;
  trailerModel: string;
  monthlyPrice: number;
  designCapacity: number;
  designPressure: number;
  designVolume: number;
  trailerPricePerKg: number;
  haulerPricePerKg: number;
  totalPricePerKg: number;
}

@Component({
  selector: 'app-scenario-results',
  templateUrl: './scenario-results.component.html',
  styleUrls: ['./scenario-results.component.scss']
})
export class ScenarioResultsComponent {
  @Input() scenario!: ScenarioResult;
  @Output() close = new EventEmitter<ScenarioResult>();

  onClose() {
    this.close.emit();
  }
} 