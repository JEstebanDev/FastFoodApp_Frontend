import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidationRequest } from '../interfaces/valid-email.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidatorEmailService implements AsyncValidator {
  private _urlBackendApi: string = environment.urlBackendApi;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  phone: string = '^(d{7}|d{10})';
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http
      .get<ValidationRequest>(
        `${this._urlBackendApi}/user/is-valid-email/${email}`
      )
      .pipe(
        delay(3000),
        map((resp) => {
          return resp.statusCode !== 200 ? null : { notAvailable: true };
        })
      );
  }

  validateEmail(email: string) {
    return this.http
      .get<ValidationRequest>(
        `${this._urlBackendApi}/user/is-valid-email/${email}`
      )
      .pipe(
        delay(3000),
        map((resp) => {
          return resp.statusCode !== 200 ? null : { notAvailable: true };
        })
      );
  }

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }
      formGroup.get(campo2)?.setErrors(null);

      return null;
    };
  }
}
