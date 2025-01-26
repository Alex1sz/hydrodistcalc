import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioResult } from '../models/scenario-result.interface';

@Component({
  selector: 'app-scenario-results',
  templateUrl: './scenario-results.component.html',
  styleUrls: ['./scenario-results.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ScenarioResultsComponent {
  @Input() scenario!: ScenarioResult;
  @Output() close = new EventEmitter<ScenarioResult>();

  onClose() {
    this.close.emit();
  }
} 