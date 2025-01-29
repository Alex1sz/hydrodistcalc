export interface ScenarioResult {
  origin: string;
  destination: string;
  distance: number;
  supplierProductionRate: number;
  supplierProductionStoragePressureCapacity: number;
  offTakerConsumptionRate: number;
  daysToTransport: number;
  offloadTime: number;
  haulerPricePerMile: number;
  oneWayPrice: number;
  roundTripPrice: number;
  trailerModel: string;
  trailerMonthlyRate: number;
  trailerDesignCapacity: number;
  trailerDesignPressure: number;
  trailerDesignVolume: number;
  trailerPricePerKg: number;
  haulerPricePerKg: number;
  totalPricePerKg: number;
  // Additional properties needed for charts
  timeNeededForSupplierToFill: number;
  amountOfH2SupplierCanFillInAMonth: number;
} 