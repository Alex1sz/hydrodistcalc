export interface ScenarioResult {
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
  pricePerMile?: number;
  monthlyRate?: number;
  pressure?: number;
} 