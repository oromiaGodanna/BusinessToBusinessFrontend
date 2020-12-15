import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(private paymentService: PaymentService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      creditCardId: ['', [Validators.required], [this.creditCardAsyncValidator]]
    });
  }

  ngOnInit(): void {
  }
  creditCardAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      const val = control.value;
      if (val.replace(/\s/g, '').length !== 16) {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({ error: true});
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  })
  onSubmit(value: { creditCardId: string}): void{
   const paymentObj = this.paymentService.addPayment();
   console.log(paymentObj);
   console.log(value);

  }
}
