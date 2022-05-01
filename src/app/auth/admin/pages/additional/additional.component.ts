import { Component, OnInit } from '@angular/core';
import { Additional } from '../../interfaces/additional.interface';
import { AdditionalService } from '../../services/additional.service';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styles: [],
})
export class AdditionalComponent implements OnInit {
  constructor(private additionalService: AdditionalService) {}
  listAdditionals!: any;
  editAdditional!: Additional;
  ngOnInit(): void {
    this.additionalService.getListAdditionals().subscribe((listAdditionals) => {
      this.listAdditionals = listAdditionals.data.additional;
    });
  }

  showDetailAdditional(additional: any) {
    this.editAdditional = additional;
  }
}
