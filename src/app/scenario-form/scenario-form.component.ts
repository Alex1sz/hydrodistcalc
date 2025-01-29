import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrailerModelService } from '../trailer-model.service';
import { ScenarioService } from '../scenario.service';
import { SiteService } from '../site.service';
import { ScenarioResultsComponent } from '../scenario-results/scenario-results.component';
import { ScenarioResult } from '../models/scenario-result.interface';

@Component({
  selector: 'app-scenario-form',
  standalone: true,
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ScenarioResultsComponent]
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
      haulerPrice: [5.00], // hauler price per mile
      trailerModel: ['GTL 1500'],
      trailerPrice: [5.00] // this is the price per month
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
    const trailerDetails = this.trailerModelService.getTrailerDetails(values.trailerModel);
    const trailerDesignVolume = this.calculateTrailerDesignVolumeFromDetails(trailerDetails);
    // this is a constant according to the spreadsheet
    const daysToTransport = 0.25;

    const supplierSingleTrailerCapacity = this.calculateSupplierSingleTrailerCapacity(originSite.supplierProductionStoragePressureCapacity,
      trailerDesignVolume);

    const timeNeededForSupplierToFill = this.calculateTimeNeededForSupplierToFill(supplierSingleTrailerCapacity,
      originSite.supplierProductionRate);

    const daysNeededToTransportH2ToOffTaker = 0.25;
    const daysNeededForOfftakerToOffloadHydrogen = this.calculateDaysNeededForOfftakerToOffloadyHydrogen(supplierSingleTrailerCapacity, destinationSite.offTakerConsumptionRate);

    const amountOfH2SupplierCanFillInAMonth = this.calculateAmountOfH2SupplierCanFillInAMonth(timeNeededForSupplierToFill,
      daysNeededToTransportH2ToOffTaker,
      supplierSingleTrailerCapacity,
      daysNeededForOfftakerToOffloadHydrogen);

    const numberOfTripsPerMonth = this.calculateNumberOfTripsPerMonth(
      timeNeededForSupplierToFill,
      daysNeededToTransportH2ToOffTaker,
      daysNeededForOfftakerToOffloadHydrogen);

    const trailerPricePerKg = this.calculateTrailerPricePerKg(trailerDetails.pricePerMonth,
      amountOfH2SupplierCanFillInAMonth);


    const oneWayPrice = this.calculateOneWayPrice(distance, values.trailerPrice);
    const roundTripPrice = this.calculateRoundTripPrice(oneWayPrice);

    const haulerPricePerKgOfH2 = this.calculateHaulerPricePerKg(
      timeNeededForSupplierToFill,
      daysNeededToTransportH2ToOffTaker,
      daysNeededForOfftakerToOffloadHydrogen,
      roundTripPrice,
      amountOfH2SupplierCanFillInAMonth);


    const totalPricePerKgOfH2 = this.calculateTotalPricePerKg(trailerPricePerKg, haulerPricePerKgOfH2);

    // Ensure all trailer details are included in the result
    const result = {
      origin: locations.origin,
      destination: locations.destination,
      distance,
      supplierProductionRate: originSite.supplierProductionRate,
      supplierProductionStoragePressureCapacity: originSite.supplierProductionStoragePressureCapacity,
      offTakerConsumptionRate: destinationSite.offTakerConsumptionRate,
      daysToTransport: daysToTransport, // site constant of 0.25
      offloadTime: values.offloadTime, // From form values
      haulerPricePerMile: values.haulerPrice, // Hauler price per mile from the form... Price/mi under Hauler section
      oneWayPrice: oneWayPrice,
      roundTripPrice: roundTripPrice,
      trailerModel: values.trailerModel, // selected from form
      trailerMonthlyRate: trailerDetails.pricePerMonth, // Assuming monthlyRate is the price from trailerDetails
      trailerDesignCapacity: trailerDetails.designCapacity,
      trailerDesignPressure: trailerDetails.designPressure,
      trailerDesignVolume: trailerDesignVolume,
      trailerPricePerKg: trailerPricePerKg,
      haulerPricePerKg: haulerPricePerKgOfH2,
      totalPricePerKg: totalPricePerKgOfH2,
    };
    console.log('Scenario Result:', result);
    return result;
  }

  calculateAmountOfH2SupplierCanFillInAMonth(timeNeededForSupplierToFill: number,
    daysNeededToTransportH2ToOffTaker: number,
    supplerSingleTrailerCapacity: number,
    daysNeededToOffloadHydrogen: number): number {
    return 30 / (timeNeededForSupplierToFill + (daysNeededToTransportH2ToOffTaker * 2) + daysNeededToOffloadHydrogen) * supplerSingleTrailerCapacity;
  }

  calculateDaysNeededForOfftakerToOffloadyHydrogen(amountOfH2SupplierAbleToFillinASingleTrailer: number, offtakerConsumptionRate: number): number {
    return amountOfH2SupplierAbleToFillinASingleTrailer / (offtakerConsumptionRate / 5);
  }

  calculateDistance(originSite: any, destinationSite: any): number {
    if (!originSite || !destinationSite) return 0;
    // Implement logic to calculate distance based on origin and destination coordinates
    return 100; // Placeholder value
  }

  calculateTrailerDesignVolumeFromDetails(trailerDetails: any): number {
    return trailerDetails.designCapacity / 2 * 8.314 * 273.15 / (trailerDetails.designPressure + 1);
  }

  // this is kg/trailer
  calculateSupplierSingleTrailerCapacity(supplierPressureCapacity: number, trailerDesignVolume: number): number {
    return (supplierPressureCapacity + 1) * trailerDesignVolume / 8.314 / 273.15 * 2;
  }

  calculateTimeNeededForSupplierToFill(supplierSingleTrailerCapacity: number,
    supplierProductionRate: number): number {
    return supplierSingleTrailerCapacity / supplierProductionRate;
  }

  calculateNumberOfTripsPerMonth(timeNeededForSupplierToFill: number,
    daysNeededToTransportH2ToOffTaker: number,
    daysNeededToOffloadHydrogen: number): number {

    return 30 / (timeNeededForSupplierToFill + (daysNeededToTransportH2ToOffTaker * 2) + daysNeededToOffloadHydrogen);
  }

  calculateTrailerPricePerKg(trailerPricePerMonth: number, amountOfH2SupplierCanFillInAMonth: number): number {
    return trailerPricePerMonth / amountOfH2SupplierCanFillInAMonth;
  }

  calculateHaulerPricePerKg(timeNeededForSupplierToFill: number,
    daysNeededToTransportH2ToOffTaker: number,
    daysNeededToOffloadHydrogen: number,
    roundTripPrice: number,
    amountOfH2SupplierCanFillInAMonth: number): number {
    return (30 / (timeNeededForSupplierToFill + (daysNeededToTransportH2ToOffTaker * 2) + daysNeededToOffloadHydrogen) * roundTripPrice) / amountOfH2SupplierCanFillInAMonth;
  }

  calculateTotalPricePerKg(trailerPricePerKg: number, haulerPricePerKg: number): number {
    return trailerPricePerKg + haulerPricePerKg;
  }

  calculateProductionRate(originSite: any): number {
    if (!originSite || !originSite.supplierProductionRate) return 0;
    return originSite.supplierProductionRate; // Assuming supplierProductionRate is the production rate
  }

  calculateDaysToTransport(productionRate: number, capacity: number): number {
    // Calculate the number of days required to transport the monthly production
    return Math.ceil(productionRate / capacity);
  }

  calculateOneWayPrice(gtlPricePerMile: number, distance: number): number {
    // Calculate cost for a one-way trip
    return gtlPricePerMile * distance;
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

    this.dialogRef.close();
  }

  removeScenario(index: number) {
    this.scenarios.splice(index, 1);
  }

  addScenario(scenario: ScenarioResult) {
    this.scenarios.unshift(scenario); // Use unshift instead of push to add to beginning
  }
}
