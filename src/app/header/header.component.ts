import { Component, OnInit } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

const options = [
  {
    value: 'product',
    label: 'Product',
  },
  {
    value: 'company',
    label: 'Company',
  }
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
 

  nzOptions: NzCascaderOption[] = options;

  values: string[] = ['product', 'company'];
  
  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
