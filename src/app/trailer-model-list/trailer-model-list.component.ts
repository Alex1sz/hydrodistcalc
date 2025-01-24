import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailerModelService } from '../trailer-model.service';

@Component({
  selector: 'app-trailer-model-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trailer-model-list.component.html',
  styleUrls: ['./trailer-model-list.component.scss']
})
export class TrailerModelListComponent implements OnInit {
  trailerModels: any[] = [];

  constructor(private trailerModelService: TrailerModelService) { }

  ngOnInit() {
    this.trailerModels = this.trailerModelService.getTrailerModels();
  }
}
