import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  OrdersDTO,
  BillUserDTO,
} from 'src/app/auth/admin/interfaces/bill.interface';
import { imageLogo } from 'src/assets/logo';
import Swal from 'sweetalert2';
import { CompanyElement } from '../../interfaces/company.interface';
import { UserInfo } from '../../interfaces/tokenUser.interface';
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
  statusBill: boolean = false;
  billInformation!: BillUserDTO;
  billOrder!: OrdersDTO[];
  companyInfo: CompanyElement = {
    idCompany: 0,
    name: '',
    urlImage: null,
    nitCode: '',
    region: '',
    city: '',
    address: '',
    managerName: '',
    phone: 0,
    status: '',
  };

  totalValueTaxes: number = 0;
  taxes: number = 0;
  payMode: string = '';

  image: string = imageLogo.image;

  print() {
    html2canvas(document.querySelector('#capture')!).then((canvas) => {
      const imageData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      const imageProps = pdf.getImageProperties(imageData);
      const pdfw = pdf.internal.pageSize.getWidth() / 2;
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      pdf.addImage(imageData, 'PNG', 0, 0, pdfw, pdfh);
      pdf.save('factura' + this.billInformation.idBill + '.pdf');
    });
  }

  ngOnInit() {
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
        if (resp.data.bill.billUserDTO.statusBill == 'PAID') {
          this.statusBill = true;
          this.billInformation = resp.data.bill.billUserDTO;
          this.payMode = resp.data.bill.billUserDTO.payMode.name;
          this.billOrder = resp.data.bill.ordersDTO;
          this.totalValueTaxes = this.billInformation.totalPrice * this.taxes;
          this.message();
        }
      });
      this.companyService.getCompany().subscribe((companyInfo) => {
        companyInfo.data.company.forEach((element) => {
          this.companyInfo = element;
        });
      });
    }
  }

  async message() {
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    Swal.fire({
      title: '¿Deseas descargar tu factura?',
      text: 'Tambien la puedes pedir impresa en nuestro local',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, descarga la factura',
      cancelButtonText: 'No, solo deseo verla',
    }).then((result) => {
      if (result.isConfirmed) {
        this.print();
        Swal.fire(
          '¡Todo Listo!',
          'Busca tu factura en tu carpeta de descargas',
          'success'
        );
      }
    });
  }
}
