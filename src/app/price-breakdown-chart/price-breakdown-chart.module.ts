import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceBreakdownChartComponent } from './price-breakdown-chart.component';

@NgModule({
  imports: [CommonModule, PriceBreakdownChartComponent],
  exports: [PriceBreakdownChartComponent]
})
export class PriceBreakdownChartModule { } 