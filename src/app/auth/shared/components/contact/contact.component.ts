import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  contact: FormGroup = this.formBuilder.group({
    name: [, Validators.required],
    subject: [, Validators.required],
    phone: [, Validators.required],
    email: [, Validators.required],
    message: [, Validators.required],
  });
}
