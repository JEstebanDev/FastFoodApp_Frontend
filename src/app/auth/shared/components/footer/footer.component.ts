import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NewsLetterService } from '../../services/news-letter.service';
import { ValidatorEmailService } from '../../services/validator-email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private validatorEmail: ValidatorEmailService,
    private newsLetter: NewsLetterService
  ) {}
  newsletter: FormGroup = this.formBuilder.group({
    email: [
      ,
      [
        Validators.required,
        Validators.pattern(this.validatorEmail.emailPattern),
      ],
    ],
    message: [, Validators.required],
  });

  emailText = 'Este campo es obligatorio';

  saveEmail() {
    this.newsLetter
      .getProductsHighlight(this.newsletter.value['email'])
      .subscribe((response: any) => {
        if (response != null) {
          if (response.statusCode == 200) {
            this.newsletter.reset();
            Swal.fire(
              '¡Perfecto!',
              'Pronto te enviaremos descuentos y promociones',
              'success'
            );
          }
        }
      });
  }

  validate(variable: string) {
    if (this.newsletter.controls['email'].errors != null) {
      if (this.newsletter.controls['email'].errors!['pattern'] != null) {
        this.emailText = 'El formato del email debe ser ejemplo@gmail.com';
      }
      if (this.newsletter.controls['email'].errors!['required'] != null) {
        this.emailText = 'Este campo es obligatorio';
      }
    }
    return (
      this.newsletter.controls[variable].errors &&
      this.newsletter.controls[variable].touched
    );
  }
}
