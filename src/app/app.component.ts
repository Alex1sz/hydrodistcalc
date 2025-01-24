import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { TrailerModelListComponent } from './trailer-model-list/trailer-model-list.component';
import { ScenarioFormComponent } from './scenario-form/scenario-form.component';
import { ScenarioResultsComponent } from './scenario-results/scenario-results.component';
import { ScenarioService } from './scenario.service';
import { SiteService } from './site.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

interface ScenarioResult {
  distance: number;
  productionRate: number;
  haulerCost: number;
  price: number;
  capacity: number;
  pressure: number;
  volume: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SiteListComponent,
    ScenarioFormComponent,
    ScenarioResultsComponent
  ]
})
export class AppComponent implements OnInit {
  scenarios$: Observable<ScenarioResult[]>;
  formVisible$: Observable<boolean>;
  siteSelectionForm: FormGroup;
  sites: any[] = [];

  constructor(
    private fb: FormBuilder,
    private scenarioService: ScenarioService,
    private siteService: SiteService,
    private dialog: MatDialog
  ) {
    this.scenarios$ = this.scenarioService.scenarios$;
    this.formVisible$ = this.scenarioService.formVisible$;
    this.siteSelectionForm = this.fb.group({
      origin: [''],
      destination: ['']
    });
  }

  ngOnInit() {
    this.sites = this.siteService.getSites();
  }

  addScenario() {
    this.dialog.open(ScenarioFormComponent, {
      width: '600px',
      data: {
        origin: this.siteSelectionForm.value.origin,
        destination: this.siteSelectionForm.value.destination
      }
    });
  }

  removeScenario(scenario: ScenarioResult) {
    this.scenarioService.removeScenario(scenario);
  }
}
