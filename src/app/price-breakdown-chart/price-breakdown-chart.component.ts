import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

let Chart: any;
import('chart.js/auto').then(module => {
  Chart = module.default;
});

interface PriceBreakdown {
  trailerPricePerKg: number;
  haulerPricePerKg: number;
  trailerMonthlyRate: number;
  amountOfH2SupplierCanFillInAMonth: number;
  timeNeededForSupplierToFill: number;
  daysNeededToTransportH2ToOffTaker: number;
  daysNeededForOfftakerToOffloadHydrogen: number;
  roundTripPrice: number;
}

@Component({
  selector: 'app-price-breakdown-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="charts-container">
      <div class="chart-wrapper">
        <h3>Total Price Breakdown ($/kg H₂)</h3>
        <canvas #totalChart></canvas>
      </div>
      <div class="chart-wrapper">
        <h3>Time Components of Delivery Cycle (Days)</h3>
        <canvas #timeChart></canvas>
      </div>
      <div class="chart-wrapper">
        <h3>Cost Factors</h3>
        <canvas #costChart></canvas>
      </div>
    </div>
  `,
  styles: [`
    .price-breakdown-chart {
      width: 100%;
      height: 300px;
      margin: 20px 0;
    }
  `]
})
export class PriceBreakdownChartComponent implements AfterViewInit {
  @ViewChild('totalChart') private totalChart!: ElementRef;
  @ViewChild('timeChart') private timeChart!: ElementRef;
  @ViewChild('costChart') private costChart!: ElementRef;
  @Input() breakdown!: PriceBreakdown;

  private charts: any[] = [];

  chartData = {
    labels: ['Trailer Cost', 'Hauler Cost'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4CAF50', '#2196F3']
    }]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  ngAfterViewInit() {
    this.createCharts();
  }

  private createCharts() {
    // Total Price Chart - Keep as stacked bar but with different colors
    new Chart(this.totalChart.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Price Components'],
        datasets: [{
          label: 'Trailer Cost',
          data: [this.breakdown.trailerPricePerKg],
          backgroundColor: '#4f46e5' // Indigo
        }, {
          label: 'Hauler Cost',
          data: [this.breakdown.haulerPricePerKg],
          backgroundColor: '#7c3aed' // Purple
        }]
      },
      options: {
        ...this.chartOptions,
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            title: { text: '$/kg H₂', display: true }
          }
        }
      }
    });

    // Time Components Chart - Use a horizontal bar for better readability
    new Chart(this.timeChart.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Delivery Cycle'],
        datasets: [{
          label: 'Fill Time',
          data: [this.breakdown.timeNeededForSupplierToFill],
          backgroundColor: '#0ea5e9' // Sky blue
        }, {
          label: 'Transport Time',
          data: [this.breakdown.daysNeededToTransportH2ToOffTaker * 2],
          backgroundColor: '#0284c7' // Lighter blue
        }, {
          label: 'Offload Time',
          data: [this.breakdown.daysNeededForOfftakerToOffloadHydrogen],
          backgroundColor: '#0c4a6e' // Dark blue
        }]
      },
      options: {
        ...this.chartOptions,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            title: { text: 'Days', display: true }
          },
          y: { stacked: true }
        }
      }
    });

    // Cost Factors Chart - Use a doughnut chart for comparison
    new Chart(this.costChart.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Monthly Trailer Rate', 'Round Trip Cost'],
        datasets: [{
          data: [
            this.breakdown.trailerMonthlyRate,
            this.breakdown.roundTripPrice
          ],
          backgroundColor: [
            '#f97316', // Orange
            '#ea580c'  // Dark orange
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Cost Distribution ($)'
          }
        }
      }
    });
  }
}