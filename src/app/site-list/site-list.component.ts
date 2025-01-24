import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SiteService } from '../site.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  siteSelectionForm: FormGroup;
  sites: any[] = [];

  constructor(private fb: FormBuilder, private siteService: SiteService) {
    this.siteSelectionForm = this.fb.group({
      origin: [''],
      destination: ['']
    });
  }

  ngOnInit() {
    this.sites = this.siteService.getSites();
  }
}
