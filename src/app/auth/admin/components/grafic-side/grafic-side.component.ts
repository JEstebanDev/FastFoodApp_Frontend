import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoClient } from '../../interfaces/reportClient.interface';
import { Report } from '../../interfaces/reportProduct.interface';
import { GraficsComponent } from '../../pages/grafics/grafics.component';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-grafic-side',
  templateUrl: './grafic-side.component.html',
  styles: [],
})
export class GraficSideComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private graficPage: GraficsComponent
  ) {}

  username!: string;
  startDateClient!: Date | null;
  endDateClient!: Date | null;

  idProduct!: string | null;
  limit!: string | null;
  startDateProduct!: Date | null;
  endDateProduct!: Date | null;

  @Output() reportProduct = new EventEmitter<Report[]>();
  @Output() reportClient = new EventEmitter<InfoClient[]>();
  ngOnInit(): void {}

  getClient(params: string, e: any) {
    if (params === 'username') {
      this.username = e;
    }
    if (params === 'startDateClient') {
      this.startDateClient = e;
    }
    if (params === 'endDateClient') {
      this.endDateClient = e;
    }
    this.reportService
      .getClient(this.username, this.startDateClient, this.endDateClient)
      .subscribe((listUser) => {
        this.reportClient.emit(listUser.data.report);
      });
  }

  getProduct(params: string, e: any) {
    if (params === 'idProduct') {
      this.idProduct = e;
    }
    if (params === 'limit') {
      this.limit = e;
    }
    if (params === 'startDateProduct') {
      this.startDateProduct = e;
    }
    if (params === 'endDateProduct') {
      this.endDateProduct = e;
    }
    this.reportService
      .getRankProducts(
        this.idProduct,
        this.limit,
        this.startDateProduct,
        this.endDateProduct
      )
      .subscribe((listProducts) => {
        this.reportProduct.emit(listProducts.data!.report);
      });
  }

  clean() {
    this.graficPage.ngOnInit();
    this.username = '';
    this.startDateClient = null;
    this.endDateClient = null;

    this.idProduct = null;
    this.limit = null;
    this.startDateProduct = null;
    this.endDateProduct = null;
  }
}
