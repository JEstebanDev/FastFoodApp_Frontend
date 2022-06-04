import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BillInterface,
  Bill,
  Additional,
  OrdersDTO,
  BillUserDTO,
} from 'src/app/auth/admin/interfaces/bill.interface';
import { Company, CompanyElement } from '../../interfaces/company.interface';
import { TokenUser, UserInfo } from '../../interfaces/tokenUser.interface';
import { CheckoutService } from '../../services/checkout.service';
import { CompanyService } from '../../services/company.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styles: [],
})
export class BillInfoComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private companyService: CompanyService,
    private checkoutService: CheckoutService
  ) {}
  user!: UserInfo;
  billInformation!: BillUserDTO;
  billOrder!: OrdersDTO[];
  companyInfo!: CompanyElement;

  totalValueTaxes: number = 0;
  taxes: number = 0;
  payMode: string = '';
  ngOnInit(): void {
    this.checkoutService.getTaxes().subscribe((resp) => {
      resp.data.tax.forEach((element) => {
        this.taxes = element.value;
      });
    });
    if (localStorage.getItem('token') != null) {
      this.loginService.getUser().subscribe((resp) => {
        this.user = resp.data?.user.user!;
      });
    }
    if (localStorage.getItem('bill') != null) {
      this.checkoutService.getBill().subscribe((resp) => {
        this.billInformation = resp.data.bill.billUserDTO;
        this.payMode = resp.data.bill.billUserDTO.payMode.name;
        this.billOrder = resp.data.bill.ordersDTO;
        this.totalValueTaxes = this.billInformation.totalPrice * this.taxes;
      });
      this.companyService.getCompany().subscribe((companyInfo) => {
        companyInfo.data.company.forEach((element) => {
          this.companyInfo = element;
        });
      });
    }
  }
}
