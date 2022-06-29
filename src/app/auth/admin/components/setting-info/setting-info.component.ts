import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Company } from '../../interfaces/company.interface';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styles: [],
})
export class SettingInfoComponent implements OnInit {
  @Input() editCompany!: Company;
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {}
  oneMegaByte: number = 1048576;
  editImage!: string | null;
  imageFile!: File | null;
  deleteImage = false;
  newCompany: boolean = false;
  alterableCompany: Company = {
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

  company: FormGroup = this.formBuilder.group({
    idCompany: [],
    name: ['', [Validators.required]],
    nitCode: ['', Validators.required],
    region: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    managerName: [, [Validators.required]],
    phone: [, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    urlImage: [],
    status: ['ACTIVE', [Validators.required]],
  });

  ngOnInit(): void {
    this.companyService.getCompanyInfo().subscribe((response) => {
      if (response.data.company.length > 0) {
        this.company.patchValue(response.data.company![0]);
        this.editImage = this.company.value['urlImage'];
      } else {
        this.newCompany = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCompany'].currentValue != null) {
      this.company.patchValue(this.editCompany!);
      this.editImage = this.editCompany.urlImage!;
    }
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (event: any) => {
      this.editImage = event.target.result;
    };
    fr.readAsDataURL(this.imageFile!);
    this.imageFile?.name;
  }

  removeImage() {
    this.deleteImage = true;
    this.imageFile = null;
    this.editImage = null;
  }

  phoneText = 'Este campo es obligatorio';
  validate(variable: string) {
    if (this.company.controls['phone'].errors != null) {
      if (this.company.controls['phone'].errors!['pattern'] != null) {
        this.phoneText = 'El formato del número es incorrecto';
      }
    }
    return (
      this.company.controls[variable].errors &&
      this.company.controls[variable].touched
    );
  }

  updateCompany() {
    Swal.fire({
      title: '¿Estás seguro de modificar?',
      text: 'Podras modificar la información luego',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService
          .updateCompanyInfo(this.setDataCompany(), this.imageFile)
          .subscribe((response) => {
            if (response.statusCode == 200) {
              Swal.fire(
                '¡Perfecto!',
                'La información fue modificada',
                'success'
              );
            }
          });
      }
    });
  }
  createCompany() {
    this.companyService
      .createCompanyInfo(this.setDataCompany(), this.imageFile)
      .subscribe((response) => {
        if (response.statusCode == 200) {
          Swal.fire('¡Perfecto!', 'Empresa creada', 'success');
        }
      });
  }

  setDataCompany() {
    this.alterableCompany.idCompany = this.company.value['idCompany'];
    this.alterableCompany.name = this.company.value['name'];
    this.alterableCompany.address = this.company.value['address'];
    this.alterableCompany.city = this.company.value['city'];
    this.alterableCompany.managerName = this.company.value['managerName'];
    this.alterableCompany.nitCode = this.company.value['nitCode'];
    this.alterableCompany.phone = this.company.value['phone'];
    this.alterableCompany.region = this.company.value['region'];
    this.alterableCompany.status = this.company.value['status'];
    if (this.deleteImage) {
      this.alterableCompany.urlImage = null;
    } else {
      this.alterableCompany.urlImage = this.company.value['urlImage'];
    }
    return this.alterableCompany;
  }
}
