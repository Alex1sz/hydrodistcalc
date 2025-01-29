import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceBreakdownChartComponent } from '../price-breakdown-chart/price-breakdown-chart.component';
import { ScenarioResult } from '../models/scenario-result.interface';

@Component({
  selector: 'app-scenario-results',
  templateUrl: './scenario-results.component.html',
  styleUrls: ['./scenario-results.component.scss'],
  standalone: true,
  imports: [CommonModule, PriceBreakdownChartComponent]
})
export class ScenarioResultsComponent {
  @Input() scenario!: ScenarioResult;
  @Output() close = new EventEmitter<ScenarioResult>();

  showCharts = true;

  toggleCharts() {
    this.showCharts = !this.showCharts;
  }

  onClose() {
    this.close.emit();
  }
} 