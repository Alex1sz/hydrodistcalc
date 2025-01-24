import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  private scenariosSubject = new BehaviorSubject<any[]>([]);
  scenarios$ = this.scenariosSubject.asObservable();

  private formVisibleSubject = new BehaviorSubject<boolean>(false);
  formVisible$ = this.formVisibleSubject.asObservable();

  addScenario(scenario: any) {
    const scenarios = this.scenariosSubject.getValue();
    this.scenariosSubject.next([...scenarios, scenario]);
  }

  removeScenario(scenario: any) {
    const scenarios = this.scenariosSubject.getValue().filter(s => s !== scenario);
    this.scenariosSubject.next(scenarios);
  }

  openForm() {
    this.formVisibleSubject.next(true);
  }

  closeForm() {
    this.formVisibleSubject.next(false);
  }
} 