import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { val } from 'objection';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  addressForm: FormGroup;
  agreementForm: FormGroup;
  loading = false;
  next = true;
  data = [
    {
      title: 'Ant Design Title 1',
      description: "description for this title and ant design list",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      price: 55.25

    },
    {
      title: 'Ant Design Title 2',
      description: "description for this title and ant design list",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      price: 55.25

    },
    {
      title: 'Ant Design Title 3',
      description: "description for this title and ant design list",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      price: 55.25

    },
    {
      title: 'Ant Design Title 4',
      description: "description for this title and ant design list",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      price: 55.25

    }
  ];
  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress1: ['', [Validators.required]],
      companyAddress2: [''],
      city: ['', [Validators.required]],
      poBox: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phoneNumber1: ['', [Validators.required, Validators.pattern('^((\\+251?)|0)?[0-9]{10}$')] ],
      phoneNumber2: ['', Validators.pattern('^((\\+251?)|0)?[0-9]{10}$')],
    });
    this.agreementForm = this.fb.group({
      agree: [false, [Validators.required]]
    });

  }

  onSubmit(value: any): void{
    console.log(value);
    this.next = true;

  }

  ngOnInit(): void {
  }

}
