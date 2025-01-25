import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrailerModelService } from '../trailer-model.service';
import { ScenarioService } from '../scenario.service';
import { SiteService } from '../site.service';

interface ScenarioResult {
  distance: number;
  productionRate: number;
  pressure: number;
  daysToTransport: number;
  offloadTime: number;
  consumptionRate: number;
  haulerPrice: number;
  onewayPrice: number;
  roundTripPrice: number;
  trailerModel: string;
  monthlyRate: number;
  designCapacity: number;
  designPressure: number;
  designVolume: number;
  trailerPricePerKg: number;
  haulerPricePerKg: number;
  totalPricePerKg: number;
}

// Add type for trailer models
type TrailerModel = 'GTL 1500' | 'GTL Tandem';

// Add type for trailer specs
interface TrailerSpecs {
  price: number;
  capacity: number;
  pressure: number;
  volume: number;
  pressureCapacity?: number;
}

@Component({
  selector: 'app-scenario-form',
  standalone: true,
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ScenarioFormComponent implements OnInit {
  scenarioForm: FormGroup;
  scenarios: ScenarioResult[] = [];
  showResults = false;
  trailerModels: any[] = [];
  sites: any[] = [];
  calculatedResult: any;

  constructor(
    private fb: FormBuilder,
    private trailerModelService: TrailerModelService,
    private scenarioService: ScenarioService,
    private siteService: SiteService,
    private dialogRef: MatDialogRef<ScenarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { origin: string, destination: string }
  ) {
    this.scenarioForm = this.fb.group({
      fillTime: [2.0],
      offloadTime: [2.5],
      numberOfVehicles: [1],
      haulerPrice: [5.00],
      trailerModel: ['GTL 1500'],
      trailerPrice: [5.00]
    });
  }

  ngOnInit() {
    this.trailerModels = this.trailerModelService.getTrailerModels();
    this.sites = this.siteService.getSites();
  }

  onSubmit() {
    if (this.scenarioForm.valid) {
      const formValues = this.scenarioForm.value;
      const scenario = this.calculateScenario(formValues, this.data);
      this.scenarioService.addScenario(scenario);
      this.dialogRef.close();
    }
  }

  calculateScenario(values: any, locations: any) {
    const originSite = this.sites.find(site => site.name === locations.origin);
    const destinationSite = this.sites.find(site => site.name === locations.destination);

    const distance = this.calculateDistance(originSite, destinationSite);
    const productionRate = this.calculateProductionRate(originSite);
    const trailerDetails = this.trailerModelService.getTrailerDetails(values.trailerModel);

    const daysToTransport = this.calculateDaysToTransport(productionRate, trailerDetails.capacity);
    const oneWayPrice = this.calculateOneWayPrice(distance, values.haulerPrice);
    const roundTripPrice = this.calculateRoundTripPrice(oneWayPrice);

    // Ensure all trailer details are included in the result
    return {
      origin: locations.origin,
      destination: locations.destination,
      distance,
      productionRate,
      daysToTransport,
      oneWayPrice,
      roundTripPrice,
      trailerModel: values.trailerModel,
      monthlyRate: trailerDetails.price, // Assuming monthlyRate is the price from trailerDetails
      designCapacity: trailerDetails.capacity,
      designPressure: trailerDetails.pressureCapacity,
      designVolume: trailerDetails.volume,
      trailerPricePerKg: this.calculateTrailerPricePerKg(trailerDetails.price, trailerDetails.capacity),
      haulerPricePerKg: this.calculateHaulerPricePerKg(values.haulerPrice, trailerDetails.capacity),
      totalPricePerKg: this.calculateTotalPricePerKg(trailerDetails.price, values.haulerPrice, trailerDetails.capacity)
    };
  }

  calculateDistance(originSite: any, destinationSite: any): number {
    if (!originSite || !destinationSite) return 0;
    // Implement logic to calculate distance based on origin and destination coordinates
    return 100; // Placeholder value
  }

  calculateProductionRate(originSite: any): number {
    if (!originSite || !originSite.productionRate) return 0;
    return originSite.productionRate;
  }

  calculateDaysToTransport(productionRate: number, capacity: number): number {
    // Calculate the number of days required to transport the monthly production
    return Math.ceil(productionRate / capacity);
  }

  calculateOneWayPrice(distance: number, haulerPrice: number): number {
    // Calculate cost for a one-way trip
    return distance * haulerPrice + 500;
  }

  calculateRoundTripPrice(oneWayPrice: number): number {
    // Calculate cost for a round trip
    return oneWayPrice * 2;
  }

  onCancel() {
    this.showResults = false;
    this.scenarioForm.reset({
      fillTime: 2.0,
      offloadTime: 2.5,
      numberOfVehicles: 1,
      haulerPrice: 5.00,
      trailerModel: 'GTL 1500',
      trailerPrice: 5.00
    });
  }

  removeScenario(index: number) {
    this.scenarios.splice(index, 1);
  }

  // Add methods to calculate price per kg
  calculateTrailerPricePerKg(price: number, capacity: number): number {
    return price / capacity;
  }

  calculateHaulerPricePerKg(haulerPrice: number, capacity: number): number {
    return haulerPrice / capacity;
  }

  calculateTotalPricePerKg(trailerPrice: number, haulerPrice: number, capacity: number): number {
    return (trailerPrice + haulerPrice) / capacity;
  }
}
