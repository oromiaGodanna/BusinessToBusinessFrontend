import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzSelectSizeType, NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-new-dispute',
  templateUrl: './new-dispute.component.html',
  styleUrls: ['./new-dispute.component.css']
})
export class NewDisputeComponent implements OnInit {
  addressForm: any;
  radioValue = '';
  size: NzSelectSizeType = 'default';
  listOfOption = ["reason 1", "reason 2", "reason 1", "reason 2", "reason 1", "reason 2"];
  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
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

  }

  ngOnInit(): void {
  }
  onSubmit(): void{}
  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}
