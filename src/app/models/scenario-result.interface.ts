export interface ScenarioResult {
  origin: string;
  destination: string;
  distance: number;
  supplierProductionRate: number;
  supplierProductionStoragePressureCapacity: number;
  offTakerConsumptionRate: number;
  daysToTransport: number;
  offloadTime: number;
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
  haulerPricePerMile?: number; // Price/mi under Hauler section form input
} 