import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidationUsernameRequest } from '../interfaces/valid-username.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidatorUsernameService implements AsyncValidator {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    return this.http
      .get<ValidationUsernameRequest>(
        `${this._urlBackendApi}/user/is-valid-username/${username}`
      )
      .pipe(
        delay(3000),
        map((resp) => {
          return resp.statusCode !== 200 ? null : { notAvailable: true };
        })
      );
  }

  validateUsername(username: string) {
    return this.http
      .get<ValidationUsernameRequest>(
        `${this._urlBackendApi}/user/is-valid-username/${username}`
      )
      .pipe(
        delay(3000),
        map((resp) => {
          return resp.statusCode !== 200 ? null : { notAvailable: true };
        })
      );
  }
}
